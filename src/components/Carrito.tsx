import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { getStripe, getStripeEnvironment } from "@/lib/stripe";
import { crearPagoCarrito } from "@/lib/checkout.functions";
import { ENVIO_NACIONAL_MXN, calcularTotales } from "@/lib/pedido";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const ENVIO_FIJO = ENVIO_NACIONAL_MXN;

export type ItemCarrito = {
  key: string;
  nombre: string;
  tamano: string;
  precio: number;
  imagen: string;
  cantidad: number;
};

const fmt = (n: number, en: boolean) =>
  new Intl.NumberFormat(en ? "en-US" : "es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);

export function BotonCarrito({ count, onClick, en }: { count: number; onClick: () => void; en: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={en ? `Open cart, ${count} items` : `Abrir carrito, ${count} piezas`}
      className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-cacao px-4 py-3 text-sm font-semibold text-background shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-honey focus:ring-offset-2"
    >
      <ShoppingBag className="h-6 w-6" aria-hidden="true" />
      <span className="hidden sm:inline">{en ? "Cart" : "Carrito"}</span>
      {count > 0 && (
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-honey px-1.5 text-xs text-cacao">
          {count}
        </span>
      )}
    </button>
  );
}

export function PanelCarrito({
  open,
  onOpenChange,
  items,
  onCantidad,
  onQuitar,
  en,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  items: ItemCarrito[];
  onCantidad: (key: string, delta: number) => void;
  onQuitar: (key: string) => void;
  en: boolean;
}) {
  const [conEnvio, setConEnvio] = useState(true);
  const { subtotal, envio, total } = calcularTotales(items, conEnvio);
  const [pagando, setPagando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = async () => {
    const lineas = items.map((i) => {
      const [id, ...resto] = i.key.split("::");
      return { id: id ?? "", tamano: resto.join("::") || i.tamano, cantidad: i.cantidad };
    });
    const r = await crearPagoCarrito({
      data: {
        lineas,
        envio: conEnvio,
        returnUrl: `${window.location.origin}/pago-completado?session_id={CHECKOUT_SESSION_ID}`,
        environment: getStripeEnvironment(),
      },
    });
    if ("error" in r) {
      setError(r.error);
      throw new Error(r.error);
    }
    return r.clientSecret;
  };

  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) setPagando(false); onOpenChange(o); }}>
      <SheetContent className="flex w-full flex-col bg-card sm:max-w-md" onCloseAutoFocus={(e) => e.preventDefault()}>
        <Button
          type="button"
          variant="ghost"
          className="mb-3 mr-8 self-start"
          onClick={() => pagando ? setPagando(false) : onOpenChange(false)}
        >
          <ArrowLeft /> {pagando ? (en ? "Back to cart" : "Regresar al carrito") : (en ? "Go back" : "Regresar")}
        </Button>
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">{en ? "Your cart" : "Tu carrito"}</SheetTitle>
          <SheetDescription>
            {en ? "Shipping is optional: $150 MXN nationwide, or choose pickup." : "El envío es opcional: $150 MXN a toda la República, o recojo en tienda."}
          </SheetDescription>
        </SheetHeader>

        {pagando ? (
          <div className="mt-2 flex-1 overflow-y-auto">
            <p className="mb-3 text-sm">{en ? "Total to pay" : "Total a pagar"}: <strong>{fmt(total, en)}</strong></p>
            {error && <p className="mb-3 text-sm text-terracotta">{error}</p>}
            <div className="mb-4 space-y-2 rounded-sm border border-border bg-secondary/40 p-3 text-xs leading-relaxed">
              <p className="font-display text-sm">
                {en
                  ? "While we activate online card payments, you can also pay like this:"
                  : "Mientras activamos el pago con tarjeta en línea, también puedes pagar así:"}
              </p>
              <p className="font-semibold uppercase tracking-wide">{en ? "Deposits and payment methods" : "Depósitos y formas de pago"}</p>
              <p>
                <strong>Banco Azteca</strong> — Andrea Dinorah Ruiz Nuricumbo
                <br />
                {en ? "Card" : "Tarjeta"}: 5263 5401 4420 8408
              </p>
              <p>
                <strong>{en ? "Debit and credit cards (4%)" : "Con tarjetas de débito y crédito (4%)"}</strong> — Mercado Pago / {en ? "mobile terminal and link" : "terminal móvil y link"}
                <br />
                CLABE: 7229 6902 8581 561731
              </p>
              <p>
                <strong>{en ? "Invoiced" : "Facturado"} — Inbursa</strong> — Andrea Dinorah Ruiz Nuricumbo
                <br />
                {en ? "Acct" : "Cta"} 5007 7734 271 · CLABE 0366 9150 0777 3427 12
              </p>
              <p className="rounded-sm bg-card p-2">
                <strong>{en ? "Note:" : "Nota:"}</strong>{" "}
                {en
                  ? "Send your payment receipt by WhatsApp. If you need an invoice (over $100), deposit to the Inbursa account."
                  : "Envía tu comprobante de pago por WhatsApp; en caso de requerir facturación (mayor a $100), deposita a la cuenta Inbursa."}
              </p>
              <p>
                WhatsApp: 998 407 0222 (Andrea D.) · 998 419 0382 (Karely)
                <br />
                Facebook: Mieles de Quintana Roo
                <br />
                {en ? "Email" : "Correo"}: mielesq.roomexico@gmail.com
              </p>
            </div>
            <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        ) : items.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            {en ? "Your cart is empty." : "Tu carrito está vacío."}
          </p>
        ) : (
          <ul className="mt-4 flex-1 space-y-4 overflow-y-auto pr-1">
            {items.map((i) => (
              <li key={i.key} className="flex gap-3 border-b border-border pb-4">
                <img src={i.imagen} alt="" className="h-16 w-16 rounded-sm border border-border object-cover" />
                <div className="flex-1">
                  <p className="font-display text-base leading-tight">{i.nombre}</p>
                  <p className="text-xs text-muted-foreground">{i.tamano} · {fmt(i.precio, en)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={en ? "Decrease" : "Restar"}
                      onClick={() => onCantidad(i.key, -1)}
                      className="rounded-sm border border-border p-1 hover:bg-secondary"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm">{i.cantidad}</span>
                    <button
                      type="button"
                      aria-label={en ? "Increase" : "Sumar"}
                      onClick={() => onCantidad(i.key, 1)}
                      className="rounded-sm border border-border p-1 hover:bg-secondary"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label={en ? "Remove" : "Quitar"}
                      onClick={() => onQuitar(i.key)}
                      className="ml-auto p-1 text-muted-foreground hover:text-terracotta"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="font-display text-base">{fmt(i.precio * i.cantidad, en)}</p>
              </li>
            ))}
          </ul>
        )}

        {!pagando && items.length > 0 && (
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{fmt(subtotal, en)}</span></div>
            <label className="flex cursor-pointer items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={conEnvio}
                  onChange={(e) => setConEnvio(e.target.checked)}
                  className="h-4 w-4 accent-honey"
                />
                <span>
                  {en ? "Shipping nationwide" : "Envío a toda la República"}
                  <span className="block text-xs text-muted-foreground">
                    {en ? "Uncheck for pickup" : "Desmarca si recojes en tienda"}
                  </span>
                </span>
              </span>
              <span>{envio > 0 ? fmt(envio, en) : en ? "Free" : "Gratis"}</span>
            </label>
            <div className="flex justify-between font-display text-xl"><span>Total</span><span>{fmt(total, en)}</span></div>
            <button
              type="button"
              onClick={() => { setError(null); setPagando(true); }}
              className="mt-3 w-full rounded-sm bg-honey px-6 py-3 text-sm font-medium text-cacao hover:opacity-90"
            >
              {en ? `Pay ${fmt(total, en)} with card` : `Pagar ${fmt(total, en)} con tarjeta`}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
