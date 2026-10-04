import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function ContadorVisitas() {
  const [visitas, setVisitas] = useState<number | null>(null);

  useEffect(() => {
    const yaContada = sessionStorage.getItem("xuumiel-visita");
    (async () => {
      if (!yaContada) {
        const { data } = await supabase.rpc("increment_visits");
        if (typeof data === "number") {
          sessionStorage.setItem("xuumiel-visita", "1");
          setVisitas(data);
          return;
        }
      }
      const { data } = await supabase.from("site_counter").select("visits").eq("id", 1).maybeSingle();
      if (data) setVisitas(Number(data.visits));
    })();
  }, []);

  if (visitas === null) return null;
  return (
    <span className="block pt-1">
      {visitas.toLocaleString("es-MX")} visitas
    </span>
  );
}
