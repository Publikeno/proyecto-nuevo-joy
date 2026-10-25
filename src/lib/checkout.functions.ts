import { createServerFn } from "@tanstack/react-start";
import { productos } from "@/data/catalogo";
import { productosEn } from "@/data/catalogo-en";
import { ENVIO_NACIONAL_MXN, calcularTotales } from "@/lib/pedido";

type Linea = { id: string; tamano: string; cantidad: number };
type Resultado = { clientSecret: string } | { error: string };

// Busca el precio real en el catálogo + ajustes del panel (nunca confía en el precio del navegador).
function precioCatalogo(id: string, tamano: string, listas: Producto[][]) {
  for (const lista of listas) {
    const p = lista.find((x) => x.id === id);
    const v = p?.variantes.find((x) => x.tamano === tamano);
    if (p && v) return { nombre: listas[0]!.find((x) => x.id === id)?.nombre ?? p.nombre, precio: v.precio };
  }
  return null;
}

async function leerAjustes(): Promise<AjusteProducto[]> {
  const { createClient } = await import("@supabase/supabase-js");
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const sb = createClient(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
  const { data, error } = await sb.from("product_overrides").select("*");
  if (error) throw new Error("No se pudieron leer los precios");
  return (data ?? []) as unknown as AjusteProducto[];
}

export const crearPagoCarrito = createServerFn({ method: "POST" })
  .inputValidator((data: { lineas: Linea[]; envio: boolean; returnUrl: string; environment: "sandbox" | "live" }) => {
    if (!Array.isArray(data.lineas) || data.lineas.length === 0 || data.lineas.length > 50) {
      throw new Error("Carrito vacío o inválido");
    }
    for (const l of data.lineas) {
      if (typeof l.id !== "string" || typeof l.tamano !== "string") throw new Error("Producto inválido");
      if (!Number.isInteger(l.cantidad) || l.cantidad < 1 || l.cantidad > 99) throw new Error("Cantidad inválida");
    }
    if (typeof data.envio !== "boolean") throw new Error("Envío inválido");
    if (data.environment !== "sandbox" && data.environment !== "live") throw new Error("Entorno inválido");
    return data;
  })
  .handler(async ({ data }): Promise<Resultado> => {
    const { createStripeClient, getStripeErrorMessage } = await import("@/lib/stripe.server");
    try {
      const items = data.lineas.map((l) => {
        const info = precioCatalogo(l.id, l.tamano);
        if (!info) throw new Error(`Producto no encontrado: ${l.id} ${l.tamano}`);
        return { ...info, tamano: l.tamano, cantidad: l.cantidad };
      });
      const { subtotal, total } = calcularTotales(items, data.envio);
      const stripe = createStripeClient(data.environment);

      type ItemPrecio = {
        price_data: {
          currency: "mxn";
          product_data: { name: string; tax_code: string };
          unit_amount: number;
          tax_behavior: "inclusive";
        };
        quantity: number;
      };
      type ItemEnvio = { price: string; quantity: number };
      const lineItems: Array<ItemPrecio | ItemEnvio> = items.map((i) => ({
        price_data: {
          currency: "mxn",
          product_data: { name: `${i.nombre} · ${i.tamano}`, tax_code: "txcd_99999999" },
          unit_amount: i.precio * 100,
          tax_behavior: "inclusive" as const,
        },
        quantity: i.cantidad,
      }));

      if (data.envio) {
        const envio = await stripe.prices.list({ lookup_keys: ["envio_nacional_150"] });
        if (!envio.data.length) throw new Error("Precio de envío no encontrado");
        lineItems.push({ price: envio.data[0]!.id, quantity: 1 });
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        ui_mode: "embedded_page",
        return_url: data.returnUrl,
        locale: "es-419",
        line_items: lineItems,
        ...(data.envio && { shipping_address_collection: { allowed_countries: ["MX"] } }),
        phone_number_collection: { enabled: true },
        payment_intent_data: { description: `Pedido XUUMIEL (${items.length} productos)` },
        metadata: { subtotal: String(subtotal), envio: String(data.envio ? ENVIO_NACIONAL_MXN : 0), total: String(total) },
      });
      return { clientSecret: session.client_secret ?? "" };
    } catch (error) {
      return { error: getStripeErrorMessage(error) };
    }
  });
