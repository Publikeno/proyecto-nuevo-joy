import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  categorias,
  productos,
  NOTA_CATALOGO,
  type Categoria,
  type Producto,
} from "@/data/catalogo";
import { HeroRuta } from "@/components/HeroRuta";
import { FranjaGeo } from "@/components/FranjaGeo";

import { MessageCircle, Store } from "lucide-react";
import caribbeanLikes from "@/assets/caribbean-likes.jpeg.asset.json";
import logo from "@/assets/xuumiel-logo.jpeg";
import logoXuujaab from "@/assets/xuujaab-logo.jpeg";
import culturaImg from "@/assets/ruta/cultura.jpg";
import educacionImg from "@/assets/ruta/educacion.jpg";
import meliponarioImg from "@/assets/ruta/meliponario.jpg";
import xuumiel1 from "@/assets/ruta/xuumiel-1.jpg";
import xuumiel2 from "@/assets/ruta/xuumiel-2.jpg";
import xuujaab1 from "@/assets/ruta/xuujaab-1.jpg";
import xuujaab2 from "@/assets/ruta/xuujaab-2.jpg";
import xuujaab3 from "@/assets/ruta/xuujaab-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XUUMIEL · Catálogo 2026 — Miel melipona de Quintana Roo" },
      {
        name: "description",
        content:
          "Catálogo 2026 de XUUMIEL: miel melipona, jabones, cremas y elixires artesanales hechos en Quintana Roo.",
      },
      { property: "og:title", content: "XUUMIEL · Catálogo 2026 — Miel melipona de Quintana Roo" },
      {
        property: "og:description",
        content:
          "Catálogo 2026 de XUUMIEL: miel melipona, jabones, cremas y elixires artesanales hechos en Quintana Roo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const precio = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);

type Filtro = Categoria | "Todo";

const NAV = [
  { href: "#ruta", label: "La Ruta de la Miel" },
  { href: "#cultura", label: "Cultura" },
  { href: "#educacion", label: "Educación ambiental" },
  { href: "#historia", label: "Historia" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#meliponario", label: "Meliponario" },
  { href: "#tienda", label: "Compra en línea" },
  { href: "#contacto", label: "Contacto" },
];

const CAT_XUUMIEL: Categoria[] = ["Mieles y elixires"];

function Index() {
  const [filtro, setFiltro] = useState<Filtro>("Todo");
  const [detalle, setDetalle] = useState<Producto | null>(null);

  const lista = useMemo(
    () => (filtro === "Todo" ? productos : productos.filter((p) => p.categoria === filtro)),
    [filtro],
  );

  const conteoXuumiel = productos.filter((p) => CAT_XUUMIEL.includes(p.categoria)).length;
  const conteoXuujaab = productos.length - conteoXuumiel;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#ruta"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logotipo de XUUMIEL: pirámides mayas y una abeja"
              width={120}
              height={164}
              className="h-16 w-auto object-contain"
            />
          </div>
          <nav aria-label="Principal" className="-mx-1 overflow-x-auto">
            <ul className="flex gap-1 whitespace-nowrap text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="inline-block rounded-full border border-border px-3 py-1.5 transition-colors hover:border-honey hover:text-foreground"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* 1 · La Ruta de la Miel */}
        <section id="ruta" className="border-b border-border">
          <HeroRuta />
          <FranjaGeo />

          <div className="mx-auto max-w-6xl px-5 py-14">
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Un recorrido de origen, cultura y educación ambiental alrededor de las abejas
              meliponas: el monte, el meliponario, el taller y las manos que sostienen el saber de
              la miel.
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <article className="rounded-sm border border-border bg-card p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">Marca</p>
                <div className="mt-3">
                  <img
                    src={logo}
                    alt=""
                    aria-hidden="true"
                    width={120}
                    height={164}
                    className="h-20 w-auto object-contain"
                  />
                </div>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Miel de abejas meliponas, elixires y productos de la colmena.
                </p>
              </article>
              <article className="rounded-sm border border-border bg-card p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">Marca</p>
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={logoXuujaab}
                    alt="Logotipo original de XUUJÁAB"
                    width={44}
                    height={65}
                    className="h-14 w-auto object-contain"
                  />
                  <h2 className="font-display text-2xl tracking-[0.12em]">XUUJÁAB</h2>
                </div>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Jabones, cremas, kits y productos de cuidado personal elaborados en el taller.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 2 · Cultura */}
        <section id="cultura" className="border-b border-border bg-secondary/60">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
            <div className="overflow-hidden rounded-sm border border-border">
              <img
                src={culturaImg}
                alt="Trabajo artesanal con materiales naturales en el taller de Mieles de Quintana Roo"
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-terracotta">02 · Cultura</p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl">
                Saberes artesanales y territorio
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Mieles de Quintana Roo trabaja con saberes artesanales heredados: procesos manuales,
                materiales naturales y una relación cercana con el territorio del que provienen la
                floración, la cera y la miel.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Cada pieza se elabora en lotes pequeños, con envases sencillos y materias primas del
                monte.
              </p>
            </div>
          </div>
        </section>

        {/* 3 · Educación ambiental */}
        <section id="educacion" className="border-b border-border">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
            <div className="md:order-2 overflow-hidden rounded-sm border border-border">
              <img
                src={educacionImg}
                alt="Plantas y árboles nativos que alimentan a las abejas meliponas"
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="md:order-1">
              <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
                03 · Educación ambiental
              </p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl">Respetar el ciclo</h2>
              <ul className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                <li className="border-l-2 border-honey pl-4">
                  Respetar los ciclos de producción de la colmena y cosechar solo cuando
                  corresponde.
                </li>
                <li className="border-l-2 border-honey pl-4">
                  Cuidar y sembrar plantas y árboles nativos que sostienen la floración.
                </li>
                <li className="border-l-2 border-honey pl-4">
                  Procurar una reproducción sana de las colmenas y su permanencia en el monte.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4 · Historia viva */}
        <section id="historia" className="border-b border-border bg-secondary/60">
          <div className="mx-auto max-w-3xl px-5 py-16">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">04 · Historia viva</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">
              Mujeres artesanas de Leona Vicario
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              La historia de esta ruta la sostienen mujeres artesanas de Leona Vicario. Su trabajo
              mantiene viva la continuidad del saber de la miel: aprender del monte, cuidar la
              colmena y transformar lo cosechado con las manos.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Es una historia que se sigue escribiendo día con día, en el taller y en el
              meliponario.
            </p>
          </div>
        </section>

        {/* 5 · Proyectos */}
        <section id="proyectos" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">05 · Proyectos</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">Lo que estamos construyendo</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                {
                  t: "Elaboración artesanal",
                  d: "Producción en lotes pequeños, con procesos manuales y materias primas del territorio.",
                },
                {
                  t: "Capacitación",
                  d: "Formación en procesos, higiene, seguridad y calidad para quienes elaboran cada pieza.",
                },
                {
                  t: "Apoyo local",
                  d: "Acompañamiento a productores y artesanos locales de la región.",
                },
              ].map((p) => (
                <article key={p.t} className="rounded-sm border border-border bg-card p-6">
                  <h3 className="font-display text-xl">{p.t}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{p.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6 · Meliponario */}
        <section id="meliponario" className="border-b border-border bg-secondary/60">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
            <div className="overflow-hidden rounded-sm border border-border">
              <img
                src={meliponarioImg}
                alt="Jobones de tronco con colmenas de abeja Melipona beecheii en el meliponario"
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-terracotta">06 · Meliponario</p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl">
                Melipona beecheii y jobones
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                La abeja <em>Melipona beecheii</em> es una abeja nativa sin aguijón. Se cría en
                jobones, troncos ahuecados que reproducen su nido natural y se manejan con cuidado
                durante todo el año.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                La producción es estacional: depende de la floración del monte, por lo que la
                cosecha se hace en pequeñas cantidades y solo en ciertos meses.
              </p>
            </div>
          </div>
        </section>

        {/* 7 · Compra en línea */}
        <section id="tienda" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
              07 · Compra en línea
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">Dos marcas, una misma ruta</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Al final del recorrido puedes llevarte una parte a casa. Consulta las fichas con
              tamaños y precios reales.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <article className="rounded-sm border border-border bg-card p-6">
                <div>
                  <img
                    src={logo}
                    alt=""
                    aria-hidden="true"
                    width={120}
                    height={164}
                    className="h-20 w-auto object-contain"
                  />
                </div>
                <p className="mt-2 text-muted-foreground">
                  Miel de abejas meliponas, elixires y productos de la colmena.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    { src: xuumiel1, alt: "Frascos de miel de abejas meliponas XUUMIEL" },
                    { src: xuumiel2, alt: "Elixir de miel de abejas meliponas XUUMIEL" },
                  ].map((i) => (
                    <img
                      key={i.alt}
                      src={i.src}
                      alt={i.alt}
                      width={800}
                      height={800}
                      loading="lazy"
                      className="aspect-square w-full rounded-sm border border-border object-cover"
                    />
                  ))}
                </div>
                <p className="mt-5 text-sm text-muted-foreground">
                  {conteoXuumiel} {conteoXuumiel === 1 ? "ficha" : "fichas"} en el catálogo
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFiltro("Mieles y elixires");
                    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-4 rounded-sm bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Ver productos XUUMIEL
                </button>
              </article>

              <article className="rounded-sm border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <img
                    src={logoXuujaab}
                    alt="Logotipo original de XUUJÁAB"
                    width={44}
                    height={65}
                    className="h-14 w-auto object-contain"
                  />
                  <h3 className="font-display text-2xl tracking-[0.12em]">XUUJÁAB</h3>
                </div>
                <p className="mt-2 text-muted-foreground">
                  Jabones, cremas, kits y cuidado personal: esta parte de la ruta pertenece a
                  XUUJÁAB.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { src: xuujaab1, alt: "Jabones artesanales XUUJÁAB" },
                    { src: xuujaab2, alt: "Crema artesanal XUUJÁAB" },
                    { src: xuujaab3, alt: "Kit de cuidado corporal XUUJÁAB" },
                  ].map((i) => (
                    <img
                      key={i.alt}
                      src={i.src}
                      alt={i.alt}
                      width={800}
                      height={800}
                      loading="lazy"
                      className="aspect-square w-full rounded-sm border border-border object-cover"
                    />
                  ))}
                </div>
                <p className="mt-5 text-sm text-muted-foreground">
                  {conteoXuujaab} fichas en el catálogo
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFiltro("Jabones");
                    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-4 rounded-sm bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Ver productos XUUJÁAB
                </button>
              </article>
            </div>

            {/* Subárea · Productos de la colmena XUUMIEL */}
            <div className="mt-12 rounded-sm border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt=""
                  aria-hidden="true"
                  width={120}
                  height={164}
                  className="h-20 w-auto object-contain"
                />
                <h3 className="font-display text-2xl">Productos de la colmena</h3>
              </div>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Miel de abejas meliponas y sus presentaciones, elixir, propóleo y multivitamínicos.
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {productos
                  .filter((p) => p.marca === "XUUMIEL")
                  .map((p) => (
                    <li
                      key={p.id}
                      className="flex flex-col rounded-sm border border-border bg-background p-5"
                    >
                      <h4 className="font-display text-lg leading-snug">{p.nombre}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {p.variantes.map((v) => v.tamano).join(" · ")}
                      </p>
                      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                        <span className="font-display text-lg">
                          {p.variantes.length > 1
                            ? `Desde ${precio(Math.min(...p.variantes.map((v) => v.precio)))}`
                            : precio(p.variantes[0]!.precio)}
                        </span>
                        <button
                          type="button"
                          onClick={() => setDetalle(p)}
                          className="rounded-sm border border-primary px-3 py-1.5 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                          Ver detalle
                          <span className="sr-only"> de {p.nombre}</span>
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Próximamente */}
            <div className="mt-12">
              <h3 className="font-display text-2xl">Próximamente</h3>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Piezas en desarrollo. Publicaremos su información cuando esté confirmada.
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {["Velas de cera", "Hidromiel", "Paletas de propóleo"].map((n) => (
                  <li
                    key={n}
                    className="rounded-sm border border-dashed border-border bg-card/60 p-6"
                  >
                    <span className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">
                      Próximamente
                    </span>
                    <h4 className="mt-3 font-display text-xl">{n}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Sin foto, tamaño ni precio confirmados todavía.
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Catálogo (ruta secundaria) */}
        <section id="catalogo" className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="font-display text-3xl sm:text-4xl">Catálogo 2026</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Filtra por familia de producto. Cada ficha incluye precio, tamaño e ingrediente
              principal.
            </p>

            <div
              className="mt-8 flex flex-wrap gap-2"
              role="group"
              aria-label="Filtrar catálogo por categoría"
            >
              {(["Todo", ...categorias] as Filtro[]).map((c) => {
                const activo = filtro === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFiltro(c)}
                    aria-pressed={activo}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      activo
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-honey"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
              {lista.length} {lista.length === 1 ? "pieza" : "piezas"}
            </p>

            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {lista.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-col rounded-sm border border-border bg-card p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">
                      {p.categoria}
                    </p>
                    {p.marca === "XUUJÁAB" ? (
                      <img
                        src={logoXuujaab}
                        alt="XUUJÁAB"
                        width={28}
                        height={41}
                        loading="lazy"
                        className="h-9 w-auto object-contain"
                      />
                    ) : (
                      <img
                        src={logo}
                        alt="XUUMIEL"
                        width={32}
                        height={32}
                        loading="lazy"
                        className="h-8 w-8 object-contain"
                      />
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-xl leading-snug">{p.nombre}</h3>
                  <dl className="mt-4 space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between gap-3">
                      <dt>{p.variantes.length > 1 ? "Tamaños" : "Tamaño"}</dt>
                      <dd className="text-right text-foreground">
                        {p.variantes.map((v) => v.tamano).join(" · ")}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>Ingrediente</dt>
                      <dd className="text-right text-foreground">{p.ingrediente}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <span className="font-display text-xl">
                      {p.variantes.length > 1
                        ? `Desde ${precio(Math.min(...p.variantes.map((v) => v.precio)))}`
                        : precio(p.variantes[0]!.precio)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDetalle(p)}
                      className="rounded-sm border border-primary px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      Ver detalle
                      <span className="sr-only"> de {p.nombre}</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Aliados */}
        <section id="aliados" className="border-b border-border bg-secondary/60">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Aliados</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">
              Dónde encontrarnos y con quién trabajamos
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <article className="flex flex-col items-start gap-4 rounded-sm border border-border bg-card p-6">
                <img
                  src={caribbeanLikes.url}
                  alt="Logotipo de Caribbean Like's"
                  width={320}
                  height={320}
                  loading="lazy"
                  className="h-28 w-auto rounded-sm border border-border object-contain"
                />
                <h3 className="font-display text-xl">Caribbean Like's</h3>
                <p className="text-sm text-muted-foreground">
                  Aliado de la ruta. Datos de contacto por confirmar.
                </p>
              </article>
              <article className="flex flex-col items-start gap-4 rounded-sm border border-border bg-card p-6">
                <Store className="h-10 w-10 text-terracotta" aria-hidden="true" />
                <h3 className="font-display text-xl">Tienda Estación Tren Maya</h3>
                <p className="text-sm text-muted-foreground">
                  Encuentra los productos en la tienda de la estación del Tren Maya de Leona
                  Vicario, municipio de Puerto Morelos.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 8 · Contacto */}
        <section id="contacto" className="bg-primary text-primary-foreground">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl">Contacto</h2>
              <p className="mt-3 text-primary-foreground/75">
                Escríbenos para conocer la ruta, coordinar una visita al meliponario o preguntar por
                el catálogo.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-primary-foreground/85">
                <li>Representante en Cancún: Karely · número por confirmar.</li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp: enlace listo; falta confirmar el número de celular para activarlo.
                </li>
                <li className="text-primary-foreground/60">
                  El buzón info@xuumiel.com quedará activo cuando se configure el correo del
                  dominio.
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@xuumiel.com"
                className="rounded-sm bg-honey px-6 py-3 text-center text-sm font-medium text-cacao transition-opacity hover:opacity-90"
              >
                info@xuumiel.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
          <div>
            <div>
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                width={120}
                height={164}
                loading="lazy"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              La Ruta de la Miel: de Leona Vicario, estación Tren Maya, a Cancún.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Secciones</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a className="hover:text-foreground" href={n.href}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Contacto</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a className="hover:text-foreground" href="mailto:info@xuumiel.com">
                  info@xuumiel.com
                </a>
              </li>
              <li>Taller en Leona Vicario, Quintana Roo</li>
            </ul>
          </div>
        </div>
        <p className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} XUUMIEL · XUUJÁAB. Precios en pesos mexicanos, sujetos a
          temporada de cosecha.
        </p>
      </footer>

      <Dialog open={detalle !== null} onOpenChange={(o) => !o && setDetalle(null)}>
        <DialogContent className="max-w-lg bg-card">
          {detalle && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  {detalle.marca === "XUUJÁAB" ? (
                    <img
                      src={logoXuujaab}
                      alt="XUUJÁAB"
                      width={60}
                      height={88}
                      className="h-12 w-auto object-contain"
                    />
                  ) : (
                    <img
                      src={logo}
                      alt="XUUMIEL"
                      width={88}
                      height={120}
                      className="h-12 w-auto object-contain"
                    />
                  )}
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">
                    {detalle.marca} · {detalle.categoria}
                  </p>
                </div>
                <DialogTitle className="font-display text-2xl">{detalle.nombre}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {detalle.descripcion}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2 border-y border-border py-4 text-sm">
                <table className="w-full">
                  <caption className="sr-only">Tamaños y precios de {detalle.nombre}</caption>
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th scope="col" className="pb-2 font-normal">
                        {detalle.variantes.length > 1 ? "Tamaño" : "Presentación"}
                      </th>
                      <th scope="col" className="pb-2 text-right font-normal">
                        Precio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detalle.variantes.map((v) => (
                      <tr key={v.tamano} className="border-t border-border/60">
                        <td className="py-2 font-display text-lg">{v.tamano}</td>
                        <td className="py-2 text-right font-display text-lg">{precio(v.precio)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3">
                  <span className="text-muted-foreground">Ingrediente principal: </span>
                  {detalle.ingrediente}
                </p>
              </div>
              <div className="max-h-[45vh] space-y-5 overflow-y-auto pr-1 text-sm">
                <section>
                  <h3 className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">
                    Ingredientes
                  </h3>
                  <ul className="mt-2 space-y-1 leading-relaxed text-muted-foreground">
                    {detalle.ingredientes.map((i) => (
                      <li key={i} className="border-l-2 border-honey pl-3">
                        {i}
                      </li>
                    ))}
                  </ul>
                </section>

                {detalle.componentes && detalle.componentes.length > 0 && (
                  <section>
                    <h3 className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">
                      Componentes del kit
                    </h3>
                    <ul className="mt-2 space-y-1 leading-relaxed text-muted-foreground">
                      {detalle.componentes.map((c) => (
                        <li key={c} className="border-l-2 border-honey pl-3">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <section>
                  <h3 className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">
                    Lo que destaca el catálogo
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{detalle.destaca}</p>
                </section>

                <p className="rounded-sm border border-border bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground">
                  {NOTA_CATALOGO}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
