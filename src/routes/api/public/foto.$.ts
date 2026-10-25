import { createFileRoute } from "@tanstack/react-router";

// Sirve las fotos subidas desde el panel (el almacenamiento es privado). Solo lectura.
// Usa el cliente privilegiado del servidor: no hay política pública de lectura en el bucket.
export const Route = createFileRoute("/api/public/foto/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = params._splat ?? "";
        if (!/^[\w-]+\/[\w.-]+$/.test(path)) return new Response("Not found", { status: 404 });
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("product-images").download(path);
        if (error || !data) return new Response("Not found", { status: 404 });
        return new Response(data, {
          headers: {
            "content-type": data.type || "image/jpeg",
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
