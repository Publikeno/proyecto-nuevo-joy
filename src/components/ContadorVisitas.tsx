import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Cuenta una visita por sesión sin mostrar nada; el total se ve en el panel de Estadísticas.
export function ContadorVisitas() {
  useEffect(() => {
    const yaContada = sessionStorage.getItem("xuumiel-visita");
    if (yaContada) return;
    (async () => {
      const { data } = await supabase.rpc("increment_visits");
      if (typeof data === "number") {
        sessionStorage.setItem("xuumiel-visita", "1");
      }
    })();
  }, []);

  return null;
}
