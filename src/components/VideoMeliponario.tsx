import { useEffect, useRef, useState } from "react";
import heroVideo from "@/assets/ruta/ruta-hero.mp4.asset.json";
import meliponarioImg from "@/assets/ruta/meliponario.jpg";

/**
 * Fondo documental del Meliponario con el video original de la usuaria:
 * silencioso, en bucle, con control accesible de pausa. Con
 * prefers-reduced-motion se muestra la fotografía del meliponario sin video.
 */
export function VideoMeliponario({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const toggle = () => {
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
    <div className="relative isolate overflow-hidden">
      {reducedMotion ? (
        <img
          src={meliponarioImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          src={heroVideo.url}
          poster={meliponarioImg}
          autoPlay
          muted
          loop
          playsInline
          aria-label="Video documental del meliponario de La Ruta de la Miel"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-cacao/75" aria-hidden="true" />
      {children}
      {!reducedMotion && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!reproduciendo}
          className="absolute right-4 top-4 z-10 rounded-full border border-primary-foreground/50 bg-cacao/70 px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-cacao focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey"
        >
          {reproduciendo ? "Pausar video" : "Reanudar video"}
        </button>
      )}
    </div>
  );
}
