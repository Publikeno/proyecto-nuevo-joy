import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const ENVIO_FIJO = 150;

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
  const subtotal = items.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const envio = items.length > 0 ? ENVIO_FIJO : 0;
  const total = subtotal + envio;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col bg-card sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">{en ? "Your cart" : "Tu carrito"}</SheetTitle>
          <SheetDescription>
            {en ? "Fixed national shipping: $150 MXN." : "Envío fijo nacional: $150 MXN."}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
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

        {items.length > 0 && (
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{fmt(subtotal, en)}</span></div>
            <div className="flex justify-between"><span>{en ? "Shipping" : "Envío"}</span><span>{fmt(envio, en)}</span></div>
            <div className="flex justify-between font-display text-xl"><span>Total</span><span>{fmt(total, en)}</span></div>
            <button
              type="button"
              disabled
              className="mt-3 w-full cursor-not-allowed rounded-sm bg-honey px-6 py-3 text-sm font-medium text-cacao opacity-60"
            >
              {en ? "Pay with Mercado Pago (coming soon)" : "Pagar con Mercado Pago (próximamente)"}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
