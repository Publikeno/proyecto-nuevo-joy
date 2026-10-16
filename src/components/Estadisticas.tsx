import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { validarAcceso } from "@/lib/acceso.functions";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/xuumiel-logo-3x-transparent-shadow.png";

const STORAGE_KEY = "xuumiel-stats-ok";

type Estado = "cerrado" | "codigo" | "abierto";

export function Estadisticas() {
  const [estado, setEstado] = useState<Estado>("cerrado");
  const [valor, setValor] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [visitas, setVisitas] = useState<number | null>(null);
  const validar = useServerFn(validarAcceso);

  const cargarVisitas = async () => {
    const { data } = await supabase.from("site_counter").select("visits").eq("id", 1).maybeSingle();
    if (data) setVisitas(Number(data.visits));
  };

  const abrir = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setEstado("abierto");
    cargarVisitas();
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

  return (
    <>
      <button
        type="button"
        onClick={alClickBoton}
        aria-label="Ver estadísticas de la página"
        className="fixed bottom-5 left-5 z-40 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground shadow-sm transition-colors hover:text-foreground"
      >
        Estadísticas
      </button>

      {estado !== "cerrado" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Estadísticas de la página"
          onClick={() => setEstado("cerrado")}
        >
          <div
            className="w-full max-w-sm rounded-sm border border-border bg-card p-8 text-center shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={logo} alt="XUUMIEL" className="mx-auto h-20 w-auto object-contain" />

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
                <div className="mt-6 rounded-sm border border-border bg-background p-6">
                  <p className="text-4xl font-semibold text-foreground">
                    {visitas === null ? "…" : visitas.toLocaleString("es-MX")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">visitas totales</p>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Se cuenta una visita por sesión de navegación.
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
