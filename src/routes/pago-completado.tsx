import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { confirmarPedido } from "@/lib/pedido-emails.functions";
import { getStripeEnvironment } from "@/lib/stripe";

export const Route = createFileRoute("/pago-completado")({
  head: () => ({
    meta: [
      { title: "Pago recibido · XUUMIEL" },
      { name: "description", content: "Gracias por tu compra en XUUMIEL. Tu pedido fue recibido." },
      { property: "og:title", content: "Pago recibido · XUUMIEL" },
      { property: "og:description", content: "Gracias por tu compra en XUUMIEL." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PagoCompletado,
});

function PagoCompletado() {
  useEffect(() => {
    localStorage.removeItem("xuumiel-carrito");
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (sessionId) {
      confirmarPedido({
        data: { sessionId, environment: getStripeEnvironment() },
      }).catch(() => {
        // El correo de confirmación es informativo; no bloquea la página.
      });
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="font-display text-4xl">¡Gracias por tu compra!</h1>
      <p className="max-w-md text-muted-foreground">
        Recibimos tu pago. Te contactaremos para confirmar el envío a tu domicilio.
      </p>
      <Link to="/" className="rounded-sm bg-honey px-6 py-3 font-medium text-cacao">
        Volver a la tienda
      </Link>
    </main>
  );
}
