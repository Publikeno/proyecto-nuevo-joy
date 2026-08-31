import panalImg from "@/assets/ruta/panal.jpg";

/**
 * Hero de La Ruta de la Miel: fotografía real de panal.
 * El video vertical aportado por la usuaria se conserva como fondo documental
 * de la sección Meliponario (ver VideoMeliponario), donde su formato funciona
 * sin recortes agresivos.
 */
export function HeroRuta() {
  return (
    <div className="relative">
      <img
        src={panalImg}
        alt="Panal de abejas meliponas fotografiado en el meliponario"
        width={1600}
        height={1000}
        className="h-[68vh] min-h-[340px] w-full object-cover"
      />
      <div className="absolute inset-0 bg-cacao/60" aria-hidden="true" />
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-6xl px-5 pb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/80">
            Quintana Roo, México
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] text-primary-foreground sm:text-5xl md:text-6xl">
            La Ruta de la Miel
          </h1>
          <p className="mt-4 max-w-xl text-base text-primary-foreground/85">
            De Leona Vicario, estación Tren Maya, a Cancún.
          </p>
        </div>
      </div>
    </div>
  );
}
