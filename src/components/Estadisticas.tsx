import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { validarAcceso } from "@/lib/acceso.functions";
import { clave, etiquetaCorta, resumenVisitas, type Dia } from "@/lib/estadisticas";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/xuumiel-logo-3x-transparent-shadow.png";

const STORAGE_KEY = "xuumiel-stats-ok";

type Estado = "cerrado" | "codigo" | "abierto";

export function Estadisticas() {
  const [estado, setEstado] = useState<Estado>("cerrado");
  const [valor, setValor] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [visitas, setVisitas] = useState<number | null>(null);
  const [dias, setDias] = useState<Dia[]>([]);
  const validar = useServerFn(validarAcceso);

  const cargar = async () => {
    const { data } = await supabase.from("site_counter").select("visits").eq("id", 1).maybeSingle();
    if (data) setVisitas(Number(data.visits));
    const { data: filas } = await supabase
      .from("site_visits")
      .select("dia, visitas")
      .order("dia", { ascending: false })
      .limit(120);
    setDias((filas ?? []).map((f) => ({ dia: f.dia, visitas: Number(f.visitas) })));
  };

  const abrir = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setEstado("abierto");
    cargar();
  };

  const alClickBoton = () => {
    let guardado = false;
    try {
      guardado = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      guardado = false;
    }
    if (guardado) abrir();
    else {
      setValor("");
      setError(null);
      setEstado("codigo");
    }
  };

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await validar({ data: { codigo: valor } });
      if (res.ok) abrir();
      else setError("Código incorrecto. Intenta de nuevo.");
    } catch {
      setError("No se pudo validar el código. Intenta de nuevo.");
    }
  };

  useEffect(() => {
    if (estado !== "abierto") return;
    const alEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEstado("cerrado");
    };
    window.addEventListener("keydown", alEscape);
    return () => window.removeEventListener("keydown", alEscape);
  }, [estado]);

  const resumen = useMemo(() => resumenVisitas(dias), [dias]);

  return (
    <>
      <button
        type="button"
        onClick={alClickBoton}
        aria-label="Ver estadísticas de la página"
        className="fixed bottom-20 left-5 z-40 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground shadow-sm transition-colors hover:text-foreground"
      >
        Estadísticas
      </button>

      {estado !== "cerrado" && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label="Estadísticas de la página"
          onClick={() => setEstado("cerrado")}
        >
          <div
            className="w-full max-w-md rounded-sm border border-border bg-card p-6 text-center shadow-sm sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={logo} alt="XUUMIEL" className="mx-auto h-16 w-auto object-contain" />

            {estado === "codigo" ? (
              <form onSubmit={enviar}>
                <p className="mt-5 text-sm uppercase tracking-[0.18em] text-terracotta">
                  Vista privada
                </p>
                <h2 className="mt-2 text-xl font-semibold">Estadísticas</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Escribe el código para ver las estadísticas de la página.
                </p>
                <input
                  type="text"
                  inputMode="text"
                  autoFocus
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  placeholder="Código"
                  aria-label="Código de acceso a estadísticas"
                  className="mt-6 w-full rounded-sm border border-border bg-background px-4 py-2 text-center text-lg uppercase tracking-widest"
                />
                {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
                <button
                  type="submit"
                  className="mt-6 w-full rounded-sm bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Entrar
                </button>
              </form>
            ) : (
              <>
                <p className="mt-5 text-sm uppercase tracking-[0.18em] text-terracotta">
                  Vista privada
                </p>
                <h2 className="mt-2 text-xl font-semibold">Estadísticas de la página</h2>

                <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-sm border border-border bg-background p-3">
                    <p className="text-2xl font-semibold text-foreground">
                      {visitas === null ? "…" : visitas.toLocaleString("es-MX")}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                      total
                    </p>
                  </div>
                  <div className="rounded-sm border border-border bg-background p-3">
                    <p className="text-2xl font-semibold text-foreground">
                      {resumen.estaSemana.toLocaleString("es-MX")}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                      esta semana
                    </p>
                  </div>
                  <div className="rounded-sm border border-border bg-background p-3">
                    <p className="text-2xl font-semibold text-foreground">
                      {resumen.ultimos7.toLocaleString("es-MX")}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                      últimos 7 días
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-sm border border-border bg-background p-4 text-left">
                  <p className="text-xs uppercase tracking-[0.16em] text-terracotta">Por semana</p>
                  <ul className="mt-3 space-y-2">
                    {resumen.semanas.map((s) => (
                      <li key={clave(s.lunes)} className="flex items-baseline gap-3 text-sm">
                        <span className="w-36 shrink-0 whitespace-nowrap text-muted-foreground">
                          {`Semana del ${etiquetaCorta(s.lunes)}`}
                        </span>
                        <span className="ml-auto font-medium tabular-nums text-foreground">
                          {s.visitas.toLocaleString("es-MX")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 rounded-sm border border-border bg-background p-4 text-left">
                  <p className="text-xs uppercase tracking-[0.16em] text-terracotta">Por día</p>
                  <ul className="mt-3 space-y-1.5">
                    {resumen.dias.map((d) => (
                      <li key={clave(d.fecha)} className="flex items-center gap-3 text-sm">
                        <span className="w-24 shrink-0 text-muted-foreground">
                          {etiquetaCorta(d.fecha)}
                        </span>
                        <span className="h-2 flex-1 overflow-hidden rounded-full bg-border/60">
                          <span
                            className="block h-full rounded-full bg-terracotta/70"
                            style={{ width: `${Math.round((d.visitas / resumen.maxDia) * 100)}%` }}
                          />
                        </span>
                        <span className="w-8 shrink-0 text-right font-medium tabular-nums text-foreground">
                          {d.visitas}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Se cuenta una visita por sesión de navegación. El desglose por día y por semana
                  empezó a guardarse hoy; los días anteriores provienen del registro de visitas de
                  la página.
                </p>
                <button
                  type="button"
                  onClick={() => setEstado("cerrado")}
                  className="mt-6 w-full rounded-sm border border-border px-4 py-2 font-medium transition-colors hover:bg-background"
                >
                  Cerrar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
