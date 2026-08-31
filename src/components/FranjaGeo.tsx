/**
 * Franja de georreferencia: capas y líneas de mapa dibujadas con SVG
 * (sin fotografías externas). El movimiento es sutil y se detiene con
 * prefers-reduced-motion mediante la clase motion-reduce de Tailwind.
 */
export function FranjaGeo() {
  return (
    <div className="relative isolate overflow-hidden border-y border-border bg-secondary/70">
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        className="absolute inset-0 -z-10 h-full w-full opacity-60 motion-safe:animate-[pulse_9s_ease-in-out_infinite]"
      >
        <g fill="none" stroke="currentColor" className="text-honey/45" strokeWidth="1">
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={i} d={`M0 ${18 + i * 24} C 300 ${4 + i * 26}, 900 ${44 + i * 22}, 1200 ${12 + i * 25}`} />
          ))}
        </g>
        <g className="text-botanical/40" stroke="currentColor" strokeWidth="1" fill="none">
          <path d="M120 0 L120 220 M480 0 L480 220 M840 0 L840 220" strokeDasharray="6 10" />
        </g>
        <g className="text-terracotta">
          <circle cx="480" cy="112" r="6" fill="currentColor" />
          <circle cx="480" cy="112" r="18" fill="none" stroke="currentColor" strokeWidth="1" className="motion-safe:animate-ping" />
        </g>
      </svg>

      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-12">
        <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Georreferencia</p>
        <h2 className="font-display text-3xl sm:text-4xl">Puerto Morelos, Quintana Roo</h2>
        <p className="max-w-xl leading-relaxed text-muted-foreground">
          Leona Vicario forma parte del municipio de Puerto Morelos.
        </p>
      </div>
    </div>
  );
}
