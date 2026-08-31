import { useEffect, useRef, useState } from "react";
import heroVideo from "@/assets/ruta/ruta-hero.mp4.asset.json";
import panalImg from "@/assets/ruta/panal.jpg";

/**
 * Hero de La Ruta de la Miel.
 * Video autoplay/muted/loop/playsInline con superposición oscura, control de
 * pausa accesible y una transición sobria basada en scroll (el video amplio se
 * contiene conforme baja la página). Con prefers-reduced-motion se muestra una
 * imagen estática de panal, sin animación ni video.
 */
export function HeroRuta() {
  const [reducedMotion, setReducedMotion] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(true);
  const [progreso, setProgreso] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const limite = window.innerHeight * 0.7;
        setProgreso(Math.min(1, Math.max(0, window.scrollY / limite)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

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

  const padding = progreso * 28; // px laterales
  const radio = progreso * 14;
  const altura = 74 - progreso * 22; // vh

  if (reducedMotion) {
    return (
      <div className="relative">
        <img
          src={panalImg}
          alt="Panal de abejas meliponas fotografiado en el meliponario"
          width={1600}
          height={1000}
          className="h-[60vh] min-h-[320px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-cacao/60" aria-hidden="true" />
        <HeroTexto />
      </div>
    );
  }

  return (
    <div
      style={{ paddingLeft: padding, paddingRight: padding }}
      className="transition-[padding] duration-150 ease-out"
    >
      <div
        style={{ height: `${altura}vh`, borderRadius: radio }}
        className="relative min-h-[340px] overflow-hidden transition-[height,border-radius] duration-150 ease-out"
      >
        <video
          ref={videoRef}
          src={heroVideo.url}
          poster={panalImg}
          autoPlay
          muted
          loop
          playsInline
          aria-label="Video del recorrido de La Ruta de la Miel en el meliponario"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-cacao/60" aria-hidden="true" />
        <HeroTexto />
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!reproduciendo}
          className="absolute right-4 top-4 z-10 rounded-full border border-primary-foreground/50 bg-cacao/70 px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-cacao focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey"
        >
          {reproduciendo ? "Pausar video" : "Reanudar video"}
        </button>
      </div>
    </div>
  );
}

function HeroTexto() {
  return (
    <div className="absolute inset-0 flex items-end">
      <div className="mx-auto w-full max-w-6xl px-5 pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/80">Quintana Roo, México</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] text-primary-foreground sm:text-5xl md:text-6xl">
          La Ruta de la Miel
        </h1>
        <p className="mt-4 max-w-xl text-base text-primary-foreground/85">
          De Leona Vicario, estación Tren Maya, a Cancún.
        </p>
      </div>
    </div>
  );
}
