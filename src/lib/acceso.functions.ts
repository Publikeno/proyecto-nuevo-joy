import { createServerFn } from "@tanstack/react-start";

export const validarAcceso = createServerFn({ method: "POST" })
  .inputValidator((data: { codigo: string }) => {
    if (typeof data !== "object" || data === null || typeof (data as { codigo?: unknown }).codigo !== "string") {
      throw new Error("Código inválido");
    }
    return data as { codigo: string };
  })
  .handler(async ({ data }) => {
    // El código vive solo en el servidor; nunca se envía al navegador.
    const CODIGO_ACCESO = "MIEL2026";
    const normalizado = data.codigo.trim().toUpperCase();
    if (normalizado !== CODIGO_ACCESO) return { ok: false as const };
    // Read private history only after server-side verification on every request.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [counter, history] = await Promise.all([
      supabaseAdmin.from("site_counter").select("visits").eq("id", 1).maybeSingle(),
      supabaseAdmin.from("site_visits").select("dia, visitas").order("dia", { ascending: false }).limit(120),
    ]);
    if (counter.error || history.error) throw new Error("No se pudieron cargar las estadísticas.");
    return {
      ok: true as const,
      visitas: counter.data ? Number(counter.data.visits) : null,
      dias: (history.data ?? []).map((f) => ({ dia: f.dia, visitas: Number(f.visitas) })),
    };
  });
