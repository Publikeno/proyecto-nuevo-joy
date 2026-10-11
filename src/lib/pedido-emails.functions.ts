import { createServerFn } from "@tanstack/react-start";

const fmtMXN = (centavos: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(centavos / 100);

// Se llama desde /pago-completado con el session_id de Stripe. Verifica que el
// pago esté completado y envía el correo al cliente y el aviso a la tienda.
export const confirmarPedido = createServerFn({ method: "POST" })
  .inputValidator((data: { sessionId: string; environment: "sandbox" | "live" }) => {
    if (typeof data.sessionId !== "string" || !data.sessionId.startsWith("cs_")) {
      throw new Error("Sesión inválida");
    }
    if (data.environment !== "sandbox" && data.environment !== "live") {
      throw new Error("Entorno inválido");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const { createStripeClient } = await import("@/lib/stripe.server");
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");

    const stripe = createStripeClient(data.environment);
    const session = await stripe.checkout.sessions.retrieve(data.sessionId, {
      expand: ["line_items"],
    });
    if (session.payment_status !== "paid") {
      return { ok: false as const };
    }

    const lineas = session.line_items?.data ?? [];
    const productos = lineas
      .map((l) => `${l.description ?? "Producto"} × ${l.quantity ?? 1}`)
      .join("\n");
    const total = fmtMXN(session.amount_total ?? 0);
    const conEnvio = lineas.some((l) => l.description?.toLowerCase().includes("envío"));
    const correo = session.customer_details?.email ?? undefined;
    const cliente = session.customer_details?.name ?? undefined;
    const telefono = session.customer_details?.phone ?? undefined;
    const dir = session.customer_details?.address;
    const direccion = dir
      ? [dir.line1, dir.line2, dir.city, dir.state, dir.postal_code].filter(Boolean).join(", ")
      : undefined;

    const datos = { nombre: cliente, cliente, correo, telefono, direccion, productos, total, conEnvio };
    const envios: Promise<unknown>[] = [
      sendTemplateEmail("pedido-admin", "admin@xuumiel.com", {
        templateData: datos,
        idempotencyKey: `pedido-admin-${session.id}`,
      }),
    ];
    if (correo) {
      envios.push(
        sendTemplateEmail("pedido-cliente", correo, {
          templateData: datos,
          idempotencyKey: `pedido-cliente-${session.id}`,
          replyTo: "admin@xuumiel.com",
        }),
      );
    }
    // Un correo fallido no debe romper la página de agradecimiento.
    await Promise.allSettled(envios);
    return { ok: true as const };
  });
