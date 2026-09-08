import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
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
import { NOTA_CATALOGO_EN, productosEn } from "@/data/catalogo-en";
import { textos, type Idioma } from "@/data/ui-copy";
import { HeroRuta } from "@/components/HeroRuta";
import { FranjaGeo } from "@/components/FranjaGeo";

import { MessageCircle, Store } from "lucide-react";
import caribbeanLikes from "@/assets/caribbean-likes.jpeg.asset.json";
import logo from "@/assets/xuumiel-logo-3x-transparent-shadow.png";
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

const precio = (n: number, idioma: Idioma) =>
  new Intl.NumberFormat(idioma === "en" ? "en-US" : "es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);

type Filtro = Categoria | "Todo";

const NAV_KEYS = [
  { href: "#ruta", key: "ruta" },
  { href: "#cultura", key: "cultura" },
  { href: "#educacion", key: "educacion" },
  { href: "#historia", key: "historia" },
  { href: "#proyectos", key: "proyectos" },
  { href: "#meliponario", key: "meliponario" },
  { href: "#tienda", key: "tienda" },
  { href: "#contacto", key: "contacto" },
] as const;

const CAT_XUUMIEL: Categoria[] = ["Mieles y elixires"];

const PRODUCT_IMAGE_URLS: Record<string, string> = {
  "jabon-arroz-coco": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/FVjiYoRnRUOswewl.png",
  "jabon-avena": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/cjXqhYGENXHnNSSq.png",
  "jabon-tepezcohuite-melipona": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/yHdJgNQqEyJbjCzN.png",
  "jabon-miel-melipona-madera": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/tdPQCvHhwktiTsvU.png",
  "jabon-neem-coco": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/tHPfKyyWZZqrrwZs.png",
  "jabon-curcuma-coco-melipona": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/nrlTawmSqzKJDjpK.png",
  "jabon-fresa-champagne": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/IbraseDUEzHLDVvZ.png",
  "jabon-sabila-menta": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/iaVAwyMqheEVuhrG.png",
  "kit-cartera": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/oQoFOOhWJEQeUlvP.png",
  "kit-flor": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/unzopUKhjvxvgdNU.png",
  "crema-rch": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/XgBmlNTBkuUxDfPC.png",
  "crema-rf": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/lVStLKQNIEkBTXKZ.png",
  "miel-abejas-meliponas": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/aKOGcxRygmNcGPRQ.png",
  "elixir-miel-melipona-cacao": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/eAfHqBTggGtYVuny.png",
  "multivitaminico-polen-propoleo-miel": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/CgeGQYnmuiRTHmeR.png",
  "propoleo-eucalipto": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/ECzpgLjrKCNVKmfR.png",
  "shampoo-mascarilla-miel-romero-canela": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/LiPgbsxrjpooUXfa.png",
  "repelente-crema": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/FCcSMVSoBoukJMSV.png",
  "repelente-liquido-hidroalcoholico": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/CmTOVoijXMjKgRRW.png",
};

const GALLERY_PHOTOS = [
  ["IMG_8090", "Jabón de arroz", "Jabones", "FVjiYoRnRUOswewl.png", "Producto identificado"],
  ["IMG_8092", "Jabón de panal y abeja", "Jabones", "cjXqhYGENXHnNSSq.png", "Diseño recibido"],
  ["IMG_8094", "Jabón artesanal rosa", "Jabones", "XncbeftxROyqSnSU.png", "Variante por confirmar"],
  ["IMG_8097", "Jabón fresa champagne", "Jabones", "IbraseDUEzHLDVvZ.png", "Producto identificado"],
  ["IMG_8103", "Jabón de tepezcohuite", "Jabones", "yHdJgNQqEyJbjCzN.png", "Producto identificado"],
  ["IMG_8105", "Tepezcohuite · vista alternativa", "Jabones", "SokZdvQlOIRrbxNA.png", "Vista complementaria"],
  ["IMG_8111", "Jabón azul", "Jabones", "iaVAwyMqheEVuhrG.png", "Fórmula por identificar"],
  ["IMG_8115", "Jabón de lavanda y miel", "Jabones", "JqqJWmQbuLLeDbPG.png", "Producto nuevo"],
  ["IMG_8116", "Kit caja flor", "Kits", "unzopUKhjvxvgdNU.png", "Contenido por confirmar"],
  ["IMG_8134", "Elixir de miel y cacao", "Mieles y elixires", "eAfHqBTggGtYVuny.png", "Producto identificado"],
  ["IMG_8136", "Repelente de neem", "Cuidado personal", "FCcSMVSoBoukJMSV.png", "Producto nuevo"],
  ["IMG_8139", "Crema RCH · vista lateral", "Cremas", "lVStLKQNIEkBTXKZ.png", "Vista complementaria"],
  ["IMG_8141", "Crema regeneradora RCH", "Cremas", "XgBmlNTBkuUxDfPC.png", "Producto identificado"],
  ["IMG_8149", "Dúo de jabones", "Kits", "oQoFOOhWJEQeUlvP.png", "Composición por confirmar"],
  ["IMG_8158", "Shampoo preventivo de miel, romero y neem", "Cuidado personal", "gOZwFMgbmADoRoVU.png", "Producto nuevo"],
  ["IMG_8159", "Shampoo mascarilla · presentación", "Cuidado personal", "LiPgbsxrjpooUXfa.png", "Producto identificado"],
  ["IMG_8160", "Shampoo mascarilla · reverso", "Cuidado personal", "hlWxpNDpheDinwEC.png", "Vista complementaria"],
  ["IMG_8161", "Shampoo mascarilla · frente", "Cuidado personal", "UoVzqQLvAohzabTi.png", "Vista complementaria"],
  ["IMG_8162", "Repelente de neem · vista", "Cuidado personal", "CmTOVoijXMjKgRRW.png", "Vista complementaria"],
  ["IMG_8163", "Propóleo con eucalipto", "Mieles y elixires", "ECzpgLjrKCNVKmfR.png", "Producto nuevo"],
  ["IMG_8167", "Mezcla apícola", "Mieles y elixires", "CgeGQYnmuiRTHmeR.png", "Producto por identificar"],
  ["IMG_8169", "Hidromiel de la Selva", "Mieles y elixires", "MCntVvPuNkpHMABQ.png", "Producto nuevo"],
  ["IMG_8173", "Miel de abejas meliponas", "Mieles y elixires", "aKOGcxRygmNcGPRQ.png", "Producto identificado"],
  ["abejajabon", "Jabón diseño abeja", "Jabones", "tdPQCvHhwktiTsvU.png", "Producto identificado"],
  ["curcuma", "Jabón de cúrcuma", "Jabones", "nrlTawmSqzKJDjpK.png", "Producto identificado"],
  ["jabondemiel", "Jabón de neem y miel", "Jabones", "tHPfKyyWZZqrrwZs.png", "Producto identificado"],
] as const;

const galleryImageUrl = (file: string) =>
  `https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/${file}`;
const GALLERY_FILTERS = ["Todas", "Jabones", "Cremas", "Cuidado personal", "Mieles y elixires", "Kits"] as const;
type GalleryFilter = (typeof GALLERY_FILTERS)[number];

const imagenProducto = (producto: Producto) => {
  if (PRODUCT_IMAGE_URLS[producto.id]) return PRODUCT_IMAGE_URLS[producto.id];
  if (producto.id === "miel-abejas-meliponas") return xuumiel2;
  if (producto.marca === "XUUMIEL") return xuumiel1;
  if (producto.categoria === "Cremas" || producto.categoria === "Cuidado personal") {
    return xuujaab3;
  }
  if (producto.categoria === "Kits") return xuujaab2;
  return xuujaab1;
};

function Index() {
  const [idioma, setIdioma] = useState<Idioma>("es");
  const [filtro, setFiltro] = useState<Filtro>("Todo");
  const [galleryFiltro, setGalleryFiltro] = useState<GalleryFilter>("Todas");
  const [detalle, setDetalle] = useState<Producto | null>(null);
  const copy = textos[idioma];
  const NAV = NAV_KEYS.map((n) => ({ ...n, label: copy.nav[n.key] }));
  const productosActivos = idioma === "en" ? productosEn : productos;

  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  const lista = useMemo(
    () =>
      filtro === "Todo" ? productosActivos : productosActivos.filter((p) => p.categoria === filtro),
    [filtro, productosActivos],
  );

  const fotosVisibles = useMemo(
    () => galleryFiltro === "Todas" ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter((photo) => photo[2] === galleryFiltro),
    [galleryFiltro],
  );

  const conteoXuumiel = productosActivos.filter((p) => CAT_XUUMIEL.includes(p.categoria)).length;
  const conteoXuujaab = productosActivos.length - conteoXuumiel;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#ruta"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {copy.skip}
      </a>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center">
            <img
              src={logo}
              alt={copy.alt.xuumielLogo}
              width={120}
              height={164}
              className="h-24 w-auto object-contain"
            />
          </div>
          <div className="flex items-center gap-3">
            <nav aria-label={copy.navAria} className="-mx-1 overflow-x-auto">
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
            <div
              role="group"
              aria-label={copy.languageLabel}
              className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-card p-1 text-xs"
            >
              <button
                type="button"
                onClick={() => setIdioma("es")}
                aria-pressed={idioma === "es"}
                title={copy.spanish}
                className={`rounded-full px-2 py-1 transition-colors ${
                  idioma === "es"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span aria-hidden="true">🇪🇸</span>
                <span className="sr-only">{copy.spanish}</span>
                <span aria-hidden="true"> ES</span>
              </button>
              <button
                type="button"
                onClick={() => setIdioma("en")}
                aria-pressed={idioma === "en"}
                title={copy.english}
                className={`rounded-full px-2 py-1 transition-colors ${
                  idioma === "en"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span aria-hidden="true">🇺🇸</span>
                <span className="sr-only">{copy.english}</span>
                <span aria-hidden="true"> EN</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* 1 · La Ruta de la Miel */}
        <section id="ruta" className="border-b border-border">
          <HeroRuta idioma={idioma} />
          <FranjaGeo idioma={idioma} />

          <div className="mx-auto max-w-6xl px-5 py-14">
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {copy.journeyIntro}
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <article className="rounded-sm border border-border bg-card p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">
                  {copy.brand}
                </p>
                <div className="mt-3">
                  <img
                    src={logo}
                    alt=""
                    aria-hidden="true"
                    width={120}
                    height={164}
                    className="h-24 w-auto object-contain"
                  />
                </div>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {copy.xuumielDescription}
                </p>
              </article>
              <article className="rounded-sm border border-border bg-card p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">
                  {copy.brand}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={logoXuujaab}
                    alt={copy.alt.xuujaabLogo}
                    width={44}
                    height={65}
                    className="h-14 w-auto object-contain"
                  />
                  <h2 className="font-display text-2xl tracking-[0.12em]">XUUJÁAB</h2>
                </div>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {copy.xuujaabDescription}
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
                alt={copy.alt.culture}
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
                {copy.cultureLabel}
              </p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl">{copy.cultureTitle}</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">{copy.cultureP1}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{copy.cultureP2}</p>
            </div>
          </div>
        </section>

        {/* 3 · Educación ambiental */}
        <section id="educacion" className="border-b border-border">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
            <div className="md:order-2 overflow-hidden rounded-sm border border-border">
              <img
                src={educacionImg}
                alt={copy.alt.education}
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="md:order-1">
              <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
                {copy.educationLabel}
              </p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl">{copy.educationTitle}</h2>
              <ul className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                <li className="border-l-2 border-honey pl-4">{copy.educationItems[0]}</li>
                <li className="border-l-2 border-honey pl-4">{copy.educationItems[1]}</li>
                <li className="border-l-2 border-honey pl-4">{copy.educationItems[2]}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4 · Historia viva */}
        <section id="historia" className="border-b border-border bg-secondary/60">
          <div className="mx-auto max-w-3xl px-5 py-16">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
              {copy.historyLabel}
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">{copy.historyTitle}</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{copy.historyP1}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{copy.historyP2}</p>
          </div>
        </section>

        {/* 5 · Proyectos */}
        <section id="proyectos" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
              {copy.projectsLabel}
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">{copy.projectsTitle}</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {copy.projects.map((p) => (
                <article key={p.title} className="rounded-sm border border-border bg-card p-6">
                  <h3 className="font-display text-xl">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
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
                alt={copy.alt.meliponary}
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
                {copy.meliponaryLabel}
              </p>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl">{copy.meliponaryTitle}</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">{copy.meliponaryP1}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{copy.meliponaryP2}</p>
            </div>
          </div>
        </section>

        {/* 7 · Compra en línea */}
        <section id="tienda" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{copy.shopLabel}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">{copy.shopTitle}</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">{copy.shopIntro}</p>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <article className="rounded-sm border border-border bg-card p-6">
                <div>
                  <img
                    src={logo}
                    alt=""
                    aria-hidden="true"
                    width={120}
                    height={164}
                    className="h-24 w-auto object-contain"
                  />
                </div>
                <p className="mt-2 text-muted-foreground">{copy.xuumielDescription}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    { src: xuumiel1, alt: copy.alt.honeyJars },
                    { src: xuumiel2, alt: copy.alt.elixir },
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
                  {conteoXuumiel}{" "}
                  {conteoXuumiel === 1 ? copy.catalogCountSingular : copy.catalogCountPlural}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFiltro("Mieles y elixires");
                    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-4 rounded-sm bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {copy.viewXuumiel}
                </button>
              </article>

              <article className="rounded-sm border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <img
                    src={logoXuujaab}
                    alt={copy.alt.xuujaabLogo}
                    width={44}
                    height={65}
                    className="h-14 w-auto object-contain"
                  />
                  <h3 className="font-display text-2xl tracking-[0.12em]">XUUJÁAB</h3>
                </div>
                <p className="mt-2 text-muted-foreground">{copy.xuujaabDescription}</p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { src: xuujaab1, alt: copy.alt.soaps },
                    { src: xuujaab2, alt: copy.alt.cream },
                    { src: xuujaab3, alt: copy.alt.kit },
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
                  {conteoXuujaab} {copy.catalogCountPlural}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFiltro("Jabones");
                    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-4 rounded-sm bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {copy.viewXuujaab}
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
                  className="h-24 w-auto object-contain"
                />
                <h3 className="font-display text-2xl">{copy.hiveProductsTitle}</h3>
              </div>
              <p className="mt-2 max-w-2xl text-muted-foreground">{copy.hiveProductsDescription}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {productosActivos
                  .filter((p) => p.marca === "XUUMIEL")
                  .map((p) => (
                    <li
                      key={p.id}
                       className="flex flex-col overflow-hidden rounded-sm border border-border bg-background"
                    >
                       <img
                         src={imagenProducto(p)}
                         alt={p.nombre}
                         width={800}
                         height={600}
                         loading="lazy"
                         className="aspect-[4/3] w-full border-b border-border object-cover"
                       />
                       <div className="flex flex-1 flex-col p-5">
                         <h4 className="font-display text-lg leading-snug">{p.nombre}</h4>
                         <p className="mt-2 text-sm text-muted-foreground">
                           {p.variantes.map((v) => v.tamano).join(" · ")}
                         </p>
                         <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                           <span className="font-display text-lg">
                             {p.variantes.length > 1
                               ? `${idioma === "es" ? "Desde" : "From"} ${precio(Math.min(...p.variantes.map((v) => v.precio)), idioma)}`
                               : precio(p.variantes[0]?.precio ?? 0, idioma)}
                           </span>
                           <button
                             type="button"
                             onClick={() => setDetalle(p)}
                             className="rounded-sm border border-primary px-3 py-1.5 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                           >
                             {copy.viewDetail}
                             <span className="sr-only">
                               {copy.detailOf}
                               {p.nombre}
                             </span>
                           </button>
                         </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Próximamente */}
            <div className="mt-12">
              <h3 className="font-display text-2xl">{copy.comingSoonTitle}</h3>
              <p className="mt-2 max-w-2xl text-muted-foreground">{copy.comingSoonIntro}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                {copy.comingSoonItems.map((n) => (
                  <li
                    key={n}
                    className="rounded-sm border border-dashed border-border bg-card/60 p-6"
                  >
                    <span className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">
                      {copy.comingSoon}
                    </span>
                    <h4 className="mt-3 font-display text-xl">{n}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{copy.noConfirmed}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Catálogo (ruta secundaria) */}
        <section id="catalogo" className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="font-display text-3xl sm:text-4xl">{copy.catalogTitle}</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">{copy.catalogIntro}</p>

            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label={copy.categoryAria}>
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
                    {c === "Todo" ? copy.all : copy.category[c]}
                  </button>
                );
              })}
            </div>

            <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
              {lista.length} {lista.length === 1 ? copy.pieceSingular : copy.piecePlural}
            </p>

            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {lista.map((p) => (
                <li
                  key={p.id}
                   className="flex flex-col overflow-hidden rounded-sm border border-border bg-card"
                >
                   <img
                     src={imagenProducto(p)}
                     alt={p.nombre}
                     width={800}
                     height={600}
                     loading="lazy"
                     className="aspect-[4/3] w-full border-b border-border object-cover"
                   />
                   <div className="flex flex-1 flex-col p-6">
                     <div className="flex items-center justify-between gap-3">
                       <p className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">
                         {copy.category[p.categoria]}
                       </p>
                       {p.marca === "XUUJÁAB" ? (
                         <img
                           src={logoXuujaab}
                           alt={copy.alt.xuujaabLogo}
                           width={28}
                           height={41}
                           loading="lazy"
                           className="h-9 w-auto object-contain"
                         />
                       ) : (
                         <img
                           src={logo}
                           alt={copy.alt.xuumielLogo}
                           width={44}
                           height={35}
                           loading="lazy"
                           className="h-9 w-auto object-contain"
                         />
                       )}
                     </div>
                     <h3 className="mt-3 font-display text-xl leading-snug">{p.nombre}</h3>
                     <dl className="mt-4 space-y-1 text-sm text-muted-foreground">
                    <div className="flex justify-between gap-3">
                      <dt>{p.variantes.length > 1 ? copy.sizes : copy.size}</dt>
                      <dd className="text-right text-foreground">
                        {p.variantes.map((v) => v.tamano).join(" · ")}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>{copy.ingredient}</dt>
                      <dd className="text-right text-foreground">{p.ingrediente}</dd>
                    </div>
                     </dl>
                     <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                    <span className="font-display text-xl">
                      {p.variantes.length > 1
                        ? `${idioma === "es" ? "Desde" : "From"} ${precio(Math.min(...p.variantes.map((v) => v.precio)), idioma)}`
                         : precio(p.variantes[0]?.precio ?? 0, idioma)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDetalle(p)}
                      className="rounded-sm border border-primary px-3 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {copy.viewDetail}
                      <span className="sr-only">
                        {copy.detailOf}
                        {p.nombre}
                      </span>
                    </button>
                     </div>
                   </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Galería completa de fotografías recibidas */}
        <section id="fotos-productos" className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Galería de productos</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">Todas las presentaciones.</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Aquí están las fotografías nuevas de XUUMIEL y XUUJÁAB, organizadas por tipo de producto. Las imágenes pendientes de identificar permanecen visibles para no perder ninguna.
            </p>

            <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filtrar fotografías por tipo">
              {GALLERY_FILTERS.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setGalleryFiltro(category)}
                  aria-pressed={galleryFiltro === category}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                    galleryFiltro === category
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-honey"
                  }`}
                >
                  {category}
                  <span className="ml-2 text-xs opacity-70">
                    {category === "Todas" ? GALLERY_PHOTOS.length : GALLERY_PHOTOS.filter((photo) => photo[2] === category).length}
                  </span>
                </button>
              ))}
            </div>

            <p aria-live="polite" className="mt-3 text-sm text-muted-foreground">
              {fotosVisibles.length} imágenes visibles
            </p>

            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {fotosVisibles.map((photo) => (
                <li key={photo[0]} className="overflow-hidden rounded-sm border border-border bg-card">
                  <div className="flex aspect-square items-center justify-center bg-secondary/40 p-3">
                    <img
                      src={galleryImageUrl(photo[3])}
                      alt={`${photo[1]} · ${photo[2]}`}
                      width={800}
                      height={800}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[0.64rem] uppercase tracking-[0.2em] text-terracotta">{photo[2]}</p>
                    <h3 className="mt-2 font-display text-lg leading-snug">{photo[1]}</h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">{photo[4]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Aliados */}
        <section id="aliados" className="border-b border-border bg-secondary/60">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{copy.alliesLabel}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">{copy.alliesTitle}</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <article className="flex flex-col items-start gap-4 rounded-sm border border-border bg-card p-6">
                <img
                  src={caribbeanLikes.url}
                  alt={copy.alt.caribbean}
                  width={320}
                  height={320}
                  loading="lazy"
                  className="h-28 w-auto rounded-sm border border-border object-contain"
                />
                <h3 className="font-display text-xl">Caribbean Like's</h3>
                <p className="text-sm text-muted-foreground">{copy.allyDescription}</p>
              </article>
              <article className="flex flex-col items-start gap-4 rounded-sm border border-border bg-card p-6">
                <Store className="h-10 w-10 text-terracotta" aria-hidden="true" />
                <h3 className="font-display text-xl">{copy.stationTitle}</h3>
                <p className="text-sm text-muted-foreground">{copy.stationDescription}</p>
              </article>
            </div>
          </div>
        </section>

        {/* 8 · Contacto */}
        <section id="contacto" className="bg-primary text-primary-foreground">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl">{copy.contactTitle}</h2>
              <p className="mt-3 text-primary-foreground/75">{copy.contactDescription}</p>
              <ul className="mt-5 space-y-2 text-sm text-primary-foreground/85">
                <li>{copy.representative}</li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {copy.whatsapp}
                </li>
                <li className="text-primary-foreground/60">{copy.inbox}</li>
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
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{copy.footerLine}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">{copy.sections}</h2>
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
            <h2 className="text-sm font-semibold">{copy.contactTitle}</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a className="hover:text-foreground" href="mailto:info@xuumiel.com">
                  info@xuumiel.com
                </a>
              </li>
              <li>{copy.workshop}</li>
            </ul>
          </div>
        </div>
        <p className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} XUUMIEL · XUUJÁAB. {copy.footerCopyright}
        </p>
      </footer>

      <Dialog open={detalle !== null} onOpenChange={(o) => !o && setDetalle(null)}>
        <DialogContent className="max-w-lg bg-card">
          {detalle && (
            <>
               <img
                 src={imagenProducto(detalle)}
                 alt={detalle.nombre}
                 width={900}
                 height={540}
                 className="aspect-[5/3] w-full rounded-sm border border-border object-cover"
               />
              <DialogHeader>
                <div className="flex items-center gap-3">
                  {detalle.marca === "XUUJÁAB" ? (
                    <img
                      src={logoXuujaab}
                      alt={copy.alt.xuujaabLogo}
                      width={60}
                      height={88}
                      className="h-16 w-auto object-contain"
                    />
                  ) : (
                    <img
                      src={logo}
                      alt={copy.alt.xuumielLogo}
                      width={88}
                      height={120}
                      className="h-16 w-auto object-contain"
                    />
                  )}
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">
                    {detalle.marca} · {copy.category[detalle.categoria]}
                  </p>
                </div>
                <DialogTitle className="font-display text-2xl">{detalle.nombre}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {detalle.descripcion}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2 border-y border-border py-4 text-sm">
                <table className="w-full">
                  <caption className="sr-only">
                    {idioma === "es"
                      ? `${copy.sizes} y ${copy.price.toLowerCase()} de ${detalle.nombre}`
                      : `${copy.sizes} and ${copy.price.toLowerCase()} of ${detalle.nombre}`}
                  </caption>
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th scope="col" className="pb-2 font-normal">
                        {detalle.variantes.length > 1 ? copy.size : copy.presentation}
                      </th>
                      <th scope="col" className="pb-2 text-right font-normal">
                        {copy.price}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detalle.variantes.map((v) => (
                      <tr key={v.tamano} className="border-t border-border/60">
                        <td className="py-2 font-display text-lg">{v.tamano}</td>
                        <td className="py-2 text-right font-display text-lg">
                          {precio(v.precio, idioma)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3">
                  <span className="text-muted-foreground">{copy.mainIngredient}: </span>
                  {detalle.ingrediente}
                </p>
              </div>
              <div className="max-h-[45vh] space-y-5 overflow-y-auto pr-1 text-sm">
                <section>
                  <h3 className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">
                    {copy.ingredients}
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
                      {copy.kitComponents}
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
                    {copy.catalogHighlights}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{detalle.destaca}</p>
                </section>

                <p className="rounded-sm border border-border bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground">
                  {idioma === "es" ? NOTA_CATALOGO : NOTA_CATALOGO_EN}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
