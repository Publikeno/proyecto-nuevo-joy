import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { validarAcceso } from "@/lib/acceso.functions";
import logo from "@/assets/xuumiel-logo-3x-transparent-shadow.png";

const STORAGE_KEY = "xuumiel-acceso-ok";

type Estado = "verificando" | "bloqueado" | "abierto";

export function PuertaAcceso({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<Estado>("verificando");
  const [valor, setValor] = useState("");
  const [error, setError] = useState<string | null>(null);
  const validar = useServerFn(validarAcceso);

  const abrir = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setEstado("abierto");
  };

  useEffect(() => {
    let activo = true;
    const revisar = async () => {
      let guardado = false;
      try {
        guardado = localStorage.getItem(STORAGE_KEY) === "1";
      } catch {
        guardado = false;
      }
      if (guardado) {
        if (activo) setEstado("abierto");
        return;
      }
      const params = new URLSearchParams(window.location.search);
      const codigo = params.get("acceso") ?? params.get("codigo");
      if (codigo) {
        try {
          const res = await validar({ data: { codigo } });
          if (res.ok) {
            params.delete("acceso");
            params.delete("codigo");
            const qs = params.toString();
            window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : ""));
            if (activo) abrir();
            return;
          }
        } catch {
          /* cae a bloqueado */
        }
      }
      if (activo) setEstado("bloqueado");
    };
    revisar();
    return () => {
      activo = false;
    };
  }, [validar]);

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

  if (estado === "abierto") return <>{children}</>;

  if (estado === "verificando") {
    return <div className="min-h-screen bg-background" aria-busy="true" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <form
        onSubmit={enviar}
        className="w-full max-w-sm rounded-sm border border-border bg-card p-8 text-center shadow-sm"
      >
        <img src={logo} alt="XUUMIEL" className="mx-auto h-24 w-auto object-contain" />
        <p className="mt-6 text-sm uppercase tracking-[0.18em] text-terracotta">Vista privada</p>
        <h1 className="mt-2 text-xl font-semibold">Código de acceso</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Escribe el código para entrar al catálogo.
        </p>
        <input
          type="text"
          inputMode="text"
          autoFocus
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Código"
          aria-label="Código de acceso"
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
    </div>
  );
}
