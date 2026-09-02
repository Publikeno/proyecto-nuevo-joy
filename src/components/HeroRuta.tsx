import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import panalImg from "@/assets/ruta/panal.jpg";
import heroVideoAsset from "@/assets/ruta/ruta-hero.mp4.asset.json";

/**
 * Hero de La Ruta de la Miel.
 * - Fondo con la fotografía real de panal (aclara el tono, ya no se ve opaco).
 * - Video documental silenciado, en bucle, con control accesible de pausa.
 * - Efecto sobrio de scroll: el hero se reduce conforme baja la página.
 * - prefers-reduced-motion: solo imagen estática, sin animación ni video.
 */
export function HeroRuta() {
  const contenedorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reproduciendo, setReproduciendo] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const actualizar = () => setReduceMotion(media.matches);
    actualizar();
    media.addEventListener("change", actualizar);
    return () => media.removeEventListener("change", actualizar);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const el = contenedorRef.current;
    if (!el) return;
    let raf = 0;
    const alDesplazar = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const progreso = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
        const escala = 1 - progreso * 0.12;
        const radio = progreso * 28;
        el.style.transform = `scale(${escala})`;
        el.style.transformOrigin = "center top";
        el.style.borderRadius = `${radio}px`;
        el.style.opacity = String(1 - progreso * 0.15);
      });
    };
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", alDesplazar);
    };
  }, [reduceMotion]);

  const alternarReproduccion = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setReproduciendo(true);
    } else {
      v.pause();
      setReproduciendo(false);
    }
  };

  return (
    <div ref={contenedorRef} className="relative overflow-hidden">
      <img
        src={panalImg}
        alt="Panal de abejas meliponas fotografiado en el meliponario"
        width={1600}
        height={1000}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!reduceMotion && (
        <video
          ref={videoRef}
          src={heroVideoAsset.url}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700"
          onCanPlay={(e) => e.currentTarget.classList.remove("opacity-0")}
        />
      )}
      {/* Superposición ligera: suficiente contraste sin opacar la fotografía */}
      <div className="absolute inset-0 bg-gradient-to-t from-cacao/85 via-cacao/30 to-cacao/20" aria-hidden="true" />

      <div className="relative flex h-[68vh] min-h-[340px] items-end">
        <div className="mx-auto w-full max-w-6xl px-5 pb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/90">
            Quintana Roo, México
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] text-primary-foreground drop-shadow-sm sm:text-5xl md:text-6xl">
            La Ruta de la Miel
          </h1>
          <p className="mt-4 max-w-xl text-base text-primary-foreground/90">
            De Leona Vicario, estación Tren Maya, a Cancún.
          </p>
        </div>
      </div>

      {!reduceMotion && (
        <button
          type="button"
          onClick={alternarReproduccion}
          aria-label={reproduciendo ? "Pausar el video de fondo" : "Reanudar el video de fondo"}
          aria-pressed={!reproduciendo}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-primary-foreground/40 bg-cacao/60 px-3 py-2 text-xs text-primary-foreground backdrop-blur transition-colors hover:bg-cacao/80"
        >
          {reproduciendo ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
          {reproduciendo ? "Pausar" : "Reproducir"}
        </button>
      )}
    </div>
  );
}
