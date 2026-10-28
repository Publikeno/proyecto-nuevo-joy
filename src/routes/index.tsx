import { createFileRoute } from "@tanstack/react-router";
import { ContadorVisitas } from "@/components/ContadorVisitas";
import { useEffect, useMemo, useRef, useState } from "react";
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
  type Categoria,
  type Producto,
} from "@/data/catalogo";
import { productosEn } from "@/data/catalogo-en";
import { fotosCatalogo } from "@/data/catalogo-fotos";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { aplicarAjustes, type AjusteProducto } from "@/lib/ajustes";
import { textos, type Idioma } from "@/data/ui-copy";
import { HeroRuta } from "@/components/HeroRuta";
import { FranjaGeo } from "@/components/FranjaGeo";
import { BotonCarrito, PanelCarrito, type ItemCarrito } from "@/components/Carrito";
import { Estadisticas } from "@/components/Estadisticas";
import { Button } from "@/components/ui/button";

import { ArrowLeft, ChevronLeft, ChevronRight, Images, MessageCircle, Store } from "lucide-react";
import caribbeanLikes from "@/assets/caribbean-likes.jpeg.asset.json";
import cremaBambu from "@/assets/crema-bambu.jpg.asset.json";
import cremaMaderas from "@/assets/crema-maderas.jpg.asset.json";
import elixirCacaoNueva from "@/assets/elixir-cacao-nueva.jpg.asset.json";
import elixirOriginalNueva from "@/assets/elixir-original-nueva.jpg.asset.json";
import propoleoEucalipto from "@/assets/propoleo-eucalipto-cuadro.jpg";
import cremaRchAzul from "@/assets/crema-rch-etiqueta-azul.jpeg.asset.json";
import jabonAvenaActual from "@/assets/jabon-avena-70g-actual.jpeg.asset.json";
import jabonNeem from "@/assets/jabon-neem-cuadro.jpg.asset.json";
import jabonSabilaMentaActual from "@/assets/jabon-sabila-menta-80g-actual.jpeg.asset.json";
import jabonTepezcohuiteActual from "@/assets/jabon-tepezcohuite-100g-actual.jpeg.asset.json";
import shampooMiel from "@/assets/shampoo-miel-romero-canela-actual.jpeg.asset.json";
import shampooPreventivo from "@/assets/shampoo-preventivo-miel-romero-neem-sin-fondo.png.asset.json";
import gotero50ml from "@/assets/gotero-50ml-original.png";
import jabonAzul from "@/assets/jabon-melipona-madera-cuadro.jpg";
import kitCarteraYute from "@/assets/kit-cartera-yute.png.asset.json";
import kitCarteraNueva from "@/assets/kit-cartera-nueva.png.asset.json";
import repelenteLiquido from "@/assets/repelente-liquido-sin-fondo.png";
import multivitaminicoFrasco from "@/assets/multivitaminico-nueva.jpg.asset.json";
import jabonCurcumaFoto from "@/assets/jabon-curcuma-coco-melipona-nueva.jpg.asset.json";
import jabonFresaChampagneNueva from "@/assets/jabon-fresa-champagne-nueva.jpg.asset.json";
import albumEstantes from "@/assets/album/tienda-estantes.jpg.asset.json";
import albumProductos from "@/assets/album/tienda-productos.jpeg.asset.json";
import albumLeonaVicario from "@/assets/album/tienda-leona-vicario.jpg.asset.json";
import albumAbejas from "@/assets/album/abejas-meliponas.jpg.asset.json";
import albumHechoEnQr from "@/assets/album/hecho-en-quintana-roo.jpg.asset.json";
import albumEventoStand1 from "@/assets/album/evento-stand-1.jpg.asset.json";
import albumEventoStand2 from "@/assets/album/evento-stand-2.jpg.asset.json";
import logo from "@/assets/xuumiel-logo-3x-transparent-shadow.png";
import logoHechoQr from "@/assets/logo-hecho-en-quintana-roo.jpeg.asset.json";
import logoXuujaab from "@/assets/xuujaab-logo.jpeg";
import culturaImg from "@/assets/ruta/cultura.jpg";
import educacionImg from "@/assets/ruta/educacion.jpg";
import meliponarioImg from "@/assets/ruta/meliponario.jpg";
import xuumiel1 from "@/assets/ruta/xuumiel-1.jpg";
import xuumiel2 from "@/assets/ruta/xuumiel-2.jpg";
import productosColmena from "@/assets/xuumiel-productos-colmena.jpg.asset.json";
import elixirSeccion from "@/assets/xuumiel-elixir-seccion.jpg.asset.json";
import xuujaab1 from "@/assets/ruta/xuujaab-1.jpg";
import xuujaabComposicionNueva from "@/assets/xuujaab-composicion-nueva.jpg.asset.json";
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

const WHATSAPP_URL =
  "https://wa.me/529984070222?text=Hola%20XUUMIEL%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20productos.";

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
  "jabon-avena": jabonAvenaActual.url,
  "jabon-tepezcohuite-melipona": jabonTepezcohuiteActual.url,
  "jabon-miel-melipona-madera": jabonAzul,
  "jabon-neem-coco": jabonNeem.url,
  "jabon-curcuma-coco-melipona": jabonCurcumaFoto.url,
  "jabon-fresa-champagne": jabonFresaChampagneNueva.url,
  "jabon-sabila-menta": jabonSabilaMentaActual.url,
  "kit-cartera": kitCarteraYute.url,
  "kit-flor": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/unzopUKhjvxvgdNU.png",
  "crema-rch": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/XgBmlNTBkuUxDfPC.png",
  "crema-bambu": cremaBambu.url,
  "crema-maderas": cremaMaderas.url,
  "crema-rf": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/lVStLKQNIEkBTXKZ.png",
  "elixir-miel-melipona-cacao": elixirOriginalNueva.url,
  "elixir-miel-meliponas-y-cacao": elixirCacaoNueva.url,
  "multivitaminico-polen-propoleo-miel": multivitaminicoFrasco.url,
  "propoleo-eucalipto": propoleoEucalipto,
  "shampoo-mascarilla-miel-romero-canela": shampooMiel.url,
  "shampoo-preventivo-miel-romero-neem": shampooPreventivo.url,
  "repelente-crema": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/FCcSMVSoBoukJMSV.png",
  "repelente-liquido-hidroalcoholico": repelenteLiquido,
};

const GALERIA_PRODUCTOS: Record<string, { src: string; label: string }[]> = {};

const galleryImageUrl = (file: string) =>
  `https://files.manuscdn.com/user_upload_by_module/session_file/310419663032049309/${file}`;

const imagenProducto = (producto: Producto) => {
  if (producto.imagen) return producto.imagen;
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
  const [detalle, setDetalle] = useState<Producto | null>(null);
  const [presentacionSeleccionada, setPresentacionSeleccionada] = useState<string | null>(null);
  const [galeria, setGaleria] = useState<{ titulo: string; fotos: { src: string; label: string }[] } | null>(null);
  const [galeriaIndice, setGaleriaIndice] = useState(0);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const copy = textos[idioma];
  const NAV = NAV_KEYS.map((n) => ({ ...n, label: copy.nav[n.key] }));
  const { data: ajustes } = useQuery({
    queryKey: ["product-overrides"],
    queryFn: async () => {
      const { data, error } = await supabase.from("product_overrides").select("*");
      if (error) throw error;
      return data as unknown as AjusteProducto[];
    },
    staleTime: 60_000,
  });
  const productosActivos = useMemo(
    () => aplicarAjustes(idioma === "en" ? productosEn : productos, ajustes, idioma),
    [idioma, ajustes],
  );

  const abrirDetalle = (producto: Producto) => {
    setPresentacionSeleccionada(null);
    setDetalle(producto);
  };

  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("xuumiel-carrito");
      if (raw) setCarrito(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("xuumiel-carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregar = (p: Producto, tamano: string, monto: number) => {
    const key = `${p.id}::${tamano}`;
    setCarrito((c) => {
      const existe = c.find((i) => i.key === key);
      if (existe) return c.map((i) => (i.key === key ? { ...i, cantidad: i.cantidad + 1 } : i));
      return [...c, { key, nombre: p.nombre, tamano, precio: monto, imagen: imagenProducto(p) ?? logo, cantidad: 1 }];
    });
    setCarritoAbierto(true);
  };

  const cambiarCantidad = (key: string, delta: number) =>
    setCarrito((c) =>
      c
        .map((i) => (i.key === key ? { ...i, cantidad: i.cantidad + delta } : i))
        .filter((i) => i.cantidad > 0),
    );

  const lista = useMemo(
    () =>
      filtro === "Todo" ? productosActivos : productosActivos.filter((p) => p.categoria === filtro),
    [filtro, productosActivos],
  );

  // Flechas de la ficha: pasan al producto anterior o siguiente de la lista que se está viendo,
  // sin cerrar la ventana ni regresar al catálogo completo.
  const detalleScrollRef = useRef<HTMLDivElement>(null);
  const indiceDetalle = detalle ? lista.findIndex((p) => p.id === detalle.id) : -1;

  const moverDetalle = (delta: number) => {
    if (!detalle) return;
    const base = indiceDetalle < 0 ? (delta > 0 ? -1 : 0) : indiceDetalle;
    const siguiente = lista[base + delta];
    if (!siguiente) return;
    setPresentacionSeleccionada(null);
    setDetalle(siguiente);
  };

  useEffect(() => {
    detalleScrollRef.current?.scrollTo({ top: 0 });
  }, [detalle?.id]);


  const fotosVisibles = useMemo(
    () => filtro === "Todo" ? fotosCatalogo : fotosCatalogo.filter((foto) => foto.categoria === filtro),
    [filtro],
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
          <div className="flex shrink-0 items-center justify-between gap-4 lg:justify-start">
            <img
              src={logo}
              alt={copy.alt.xuumielLogo}
              width={120}
              height={164}
              className="h-24 w-auto object-contain"
            />
            <img
              src={logoHechoQr.url}
              alt="Hecho en Quintana Roo"
              width={554}
              height={554}
              className="h-[3.6rem] w-auto object-contain lg:hidden"
            />
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <nav aria-label={copy.navAria} className="-mx-1 min-w-0 overflow-x-auto">
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
            <img
              src={logoHechoQr.url}
              alt="Hecho en Quintana Roo"
              width={554}
              height={554}
              className="hidden h-[3.6rem] w-auto shrink-0 object-contain lg:block"
            />
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
                <img
                  src={productosColmena.url}
                  alt={idioma === "es" ? "Productos de la colmena XUUMIEL con miel, elixir y polen" : "XUUMIEL hive products with honey, elixir and pollen"}
                  width={1376}
                  height={768}
                  loading="lazy"
                  className="mt-5 aspect-video w-full rounded-sm border border-border object-cover"
                />
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    { src: elixirSeccion.url, alt: copy.alt.honeyJars },
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
                <img
                  src={xuujaabComposicionNueva.url}
                  alt={`${copy.alt.soaps}, ${copy.alt.cream}, ${copy.alt.kit}`}
                  width={1376}
                  height={768}
                  loading="lazy"
                  className="mt-5 h-auto w-full rounded-sm border border-border"
                />
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
                         className={`aspect-[4/3] w-full border-b border-border object-cover`}
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
                             onClick={() => abrirDetalle(p)}
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

            {(filtro === "Todo" || filtro === "Jabones") && (
              <p className="mt-5 rounded-sm border border-honey/40 bg-honey/10 px-4 py-3 text-sm">
                <span className="font-semibold uppercase tracking-[0.18em] text-terracotta">
                  {copy.soapNoteLead}
                </span>{" "}
                <span className="text-muted-foreground">{copy.soapNoteBody}</span>
              </p>
            )}
            <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
              {lista.length + fotosVisibles.length} {lista.length + fotosVisibles.length === 1 ? copy.pieceSingular : copy.piecePlural}
            </p>

            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {lista.map((p) => (
                <li
                  key={p.id}
                   className="flex flex-col overflow-hidden rounded-sm border border-border bg-card"
                >
                  <div className="relative">
                   <img
                     src={imagenProducto(p)}
                     alt={p.nombre}
                     width={800}
                     height={600}
                     loading="lazy"
                     className={`aspect-[4/3] w-full border-b border-border ${["repelente-liquido-hidroalcoholico", "shampoo-mascarilla-miel-romero-canela", "shampoo-preventivo-miel-romero-neem", "crema-bambu", "crema-maderas"].includes(p.id) ? "bg-card object-contain" : "object-cover"}`}
                   />
                  {GALERIA_PRODUCTOS[p.id] && (
                    <button
                      type="button"
                      onClick={() => {
                        const fotos = GALERIA_PRODUCTOS[p.id];
                        if (!fotos) return;
                        setGaleria({ titulo: p.nombre, fotos });
                        setGaleriaIndice(0);
                      }}
                      aria-label={`${idioma === "es" ? "Ver galería de" : "View gallery of"} ${p.nombre}`}
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-sm border border-border bg-background/90 px-2.5 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Images size={14} />
                      {idioma === "es" ? "Galería" : "Gallery"}
                      <ChevronRight size={14} />
                    </button>
                  )}
                  </div>
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
                      onClick={() => abrirDetalle(p)}
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
              {fotosVisibles.map((foto) => (
                <li key={foto.id} className="flex flex-col overflow-hidden rounded-sm border border-border bg-card">
                  <img
                    src={foto.url ?? galleryImageUrl(foto.archivo)}
                    alt={foto.nombre}
                    width={800}
                    height={600}
                    loading="lazy"
                    className={`aspect-[4/3] w-full border-b border-border ${foto.url ? "object-cover" : "bg-card object-contain"}`}
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">
                      {copy.category[foto.categoria]}
                    </p>
                    <h3 className="mt-3 font-display text-xl leading-snug">{foto.nombre}</h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">{foto.estado}</p>
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
                <div className="mt-auto space-y-1.5 text-sm">
                  <a
                    href="https://wa.me/529985039554"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                    {copy.caribbeanWhatsApp}
                  </a>
                  <a
                    href="https://www.caribbeanlikes.com.mx"
                    target="_blank"
                    rel="noreferrer"
                    className="block underline-offset-4 hover:underline"
                  >
                    {copy.caribbeanWeb}
                  </a>
                </div>
              </article>
              <article className="flex flex-col items-start gap-4 rounded-sm border border-border bg-card p-6">
                <Store className="h-10 w-10 text-terracotta" aria-hidden="true" />
                <h3 className="font-display text-xl">{copy.stationTitle}</h3>
                <p className="text-sm text-muted-foreground">{copy.stationDescription}</p>
              </article>
            </div>
          </div>
        </section>

        {/* Álbum */}
        <section id="album" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">{copy.albumLabel}</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl">{copy.albumTitle}</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">{copy.albumIntro}</p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { src: albumEstantes.url, alt: copy.altAlbum.estantes },
                { src: albumProductos.url, alt: copy.altAlbum.productos },
                { src: albumLeonaVicario.url, alt: copy.altAlbum.leonaVicario },
                { src: albumAbejas.url, alt: copy.altAlbum.abejas },
                { src: albumHechoEnQr.url, alt: copy.altAlbum.hechoEnQr },
                { src: albumEventoStand1.url, alt: copy.altAlbum.eventoStand1 },
                { src: albumEventoStand2.url, alt: copy.altAlbum.eventoStand2 },
              ].map((foto) => (
                <figure
                  key={foto.src}
                  className="overflow-hidden rounded-sm border border-border bg-card"
                >
                  <img
                    src={foto.src}
                    alt={foto.alt}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 8 · Contacto */}
        <section id="contacto" className="bg-primary text-primary-foreground">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl">{copy.contactTitle}</h2>
              <p className="mt-3 text-primary-foreground/75">{copy.contactDescription}</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-honey underline-offset-4 hover:underline"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {copy.whatsapp}
              </a>
              <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-honey">
                {copy.contactZone}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-primary-foreground/85">

                {copy.contactPhones.map((f) => (
                  <li key={f.wa}>
                    <a
                      href={`https://wa.me/${f.wa}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>
                        <span className="font-semibold text-honey">{f.name}</span>
                        <span className="text-primary-foreground/60"> · </span>
                        {f.display}
                      </span>
                    </a>
                  </li>
                ))}
                <li className="text-primary-foreground/60">{copy.inbox}</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:atnclientes@xuumiel.com"
                className="rounded-sm bg-honey px-6 py-3 text-center text-sm font-medium text-cacao transition-opacity hover:opacity-90"
              >
                atnclientes@xuumiel.com
              </a>
              <a
                href="mailto:admin@xuumiel.com"
                className="rounded-sm border border-primary-foreground/30 px-6 py-3 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                admin@xuumiel.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir por WhatsApp al +52 1 998 407 0222"
        title="Escríbenos por WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      <BotonCarrito
        count={carrito.reduce((s, i) => s + i.cantidad, 0)}
        onClick={() => setCarritoAbierto(true)}
        en={idioma === "en"}
      />
      <PanelCarrito
        open={carritoAbierto}
        onOpenChange={setCarritoAbierto}
        items={carrito}
        onCantidad={cambiarCantidad}
        onQuitar={(k) => setCarrito((c) => c.filter((i) => i.key !== k))}
        en={idioma === "en"}
      />

      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                width={120}
                height={164}
                loading="lazy"
                className="h-24 w-auto object-contain"
              />
              <img
                src={logoXuujaab}
                alt={copy.alt.xuujaabLogo}
                width={396}
                height={503}
                loading="lazy"
                className="h-24 w-auto object-contain"
              />
              <img
                src={logoHechoQr.url}
                alt="Hecho en Quintana Roo"
                width={554}
                height={554}
                loading="lazy"
                className="h-[3.6rem] w-auto object-contain"
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
                <a className="hover:text-foreground" href="mailto:atnclientes@xuumiel.com">
                  atnclientes@xuumiel.com
                </a>
              </li>
              <li>
                <a className="hover:text-foreground" href="mailto:admin@xuumiel.com">
                  admin@xuumiel.com
                </a>
              </li>
              <li>{copy.workshop}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Caribbean Like's</h2>
            <img
              src={caribbeanLikes.url}
              alt={copy.alt.caribbean}
              width={160}
              height={160}
              loading="lazy"
              className="mt-3 h-16 w-auto object-contain"
            />
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  className="hover:text-foreground"
                  href="https://wa.me/529985039554"
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.caribbeanWhatsApp}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-foreground"
                  href="https://www.caribbeanlikes.com.mx"
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.caribbeanWeb}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} XUUMIEL · XUUJÁAB. {copy.footerCopyright}
        </p>
      </footer>

      <Dialog open={detalle !== null && !carritoAbierto && galeria === null} onOpenChange={(o) => !o && setDetalle(null)}>
        <DialogContent ref={detalleScrollRef} className="max-h-[90dvh] max-w-lg overflow-y-auto bg-card" onCloseAutoFocus={(e) => e.preventDefault()}>
          <div className="sticky -top-6 z-10 -mx-6 -mt-6 flex items-center justify-between gap-2 border-b border-border bg-card px-6 py-3">
            <Button type="button" variant="ghost" onClick={() => setDetalle(null)}>
              <ArrowLeft /> {idioma === "es" ? "Regresar" : "Go back"}
            </Button>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={indiceDetalle <= 0}
                onClick={() => moverDetalle(-1)}
                aria-label={idioma === "es" ? "Producto anterior" : "Previous product"}
              >
                <ChevronLeft />
              </Button>
              <span className="min-w-14 text-center text-xs tabular-nums text-muted-foreground">
                {detalle && indiceDetalle >= 0 ? `${indiceDetalle + 1} / ${lista.length}` : ""}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={indiceDetalle < 0 || indiceDetalle >= lista.length - 1}
                onClick={() => moverDetalle(1)}
                aria-label={idioma === "es" ? "Producto siguiente" : "Next product"}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
          {detalle && (
            <>
              <div className="relative">
               <img
                 src={detalle.id === "miel-abejas-meliponas" && presentacionSeleccionada === "50 ml" ? gotero50ml : detalle.id === "crema-rch" && presentacionSeleccionada === "50 g · con dispensador" ? cremaRchAzul.url : imagenProducto(detalle)}
                 alt={detalle.nombre}
                 width={900}
                 height={540}
                 className={`aspect-[5/3] w-full rounded-sm border border-border ${["repelente-liquido-hidroalcoholico", "shampoo-mascarilla-miel-romero-canela", "shampoo-preventivo-miel-romero-neem", "crema-bambu", "crema-maderas"].includes(detalle.id) || (detalle.id === "miel-abejas-meliponas" && presentacionSeleccionada === "50 ml") || (detalle.id === "crema-rch" && presentacionSeleccionada === "50 g · con dispensador") ? "bg-card object-contain" : "object-cover"}`}
               />
              {GALERIA_PRODUCTOS[detalle.id] && (
                <button
                  type="button"
                  onClick={() => {
                    const fotos = GALERIA_PRODUCTOS[detalle.id];
                    if (!fotos) return;
                    setGaleria({ titulo: detalle.nombre, fotos });
                    setGaleriaIndice(0);
                  }}
                  aria-label={`${idioma === "es" ? "Ver galería de" : "View gallery of"} ${detalle.nombre}`}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-sm border border-border bg-background/90 px-2.5 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Images size={14} />
                  {idioma === "es" ? "Galería" : "Gallery"}
                  <ChevronRight size={14} />
                </button>
              )}
              </div>
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
                {detalle.descripcion.trim() !== "" && (
                  <DialogDescription className="whitespace-pre-line text-muted-foreground">
                    {detalle.descripcion}
                  </DialogDescription>
                )}
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
                        <td className="py-2 font-display text-lg">
                           {detalle.id === "miel-abejas-meliponas" || (detalle.id === "crema-rch" && v.tamano === "50 g · con dispensador") ? (
                            <button
                              type="button"
                              onClick={() => setPresentacionSeleccionada(v.tamano)}
                              aria-pressed={presentacionSeleccionada === v.tamano}
                              className="inline-flex items-center gap-2 text-left underline-offset-4 hover:underline aria-pressed:underline"
                            >
                               {detalle.id === "miel-abejas-meliponas" && v.tamano === "50 ml" && <img src={gotero50ml} alt="" width={36} height={36} className="h-9 w-9 shrink-0 object-contain" />}
                               {detalle.id === "crema-rch" && <img src={cremaRchAzul.url} alt="" width={36} height={36} className="h-9 w-9 shrink-0 object-contain" />}
                              {v.tamano}
                            </button>
                          ) : v.tamano}
                        </td>
                        <td className="py-2 text-right font-display text-lg">
                          {precio(v.precio, idioma)}
                        </td>
                        <td className="py-2 pl-3 text-right">
                          <button
                            type="button"
                            onClick={() => agregar(detalle, v.tamano, v.precio)}
                            className="rounded-sm bg-cacao px-3 py-1.5 text-xs font-medium text-background hover:opacity-90"
                          >
                            {idioma === "es" ? "Agregar" : "Add"}
                          </button>
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

                {detalle.destaca.trim() !== "" && (
                  <section>
                    <h3 className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">
                      {copy.catalogHighlights}
                    </h3>
                    <p className="mt-2 whitespace-pre-line leading-relaxed text-muted-foreground">{detalle.destaca}</p>
                  </section>
                )}

                <p className="rounded-sm border border-border bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground">
                  {copy.productNote}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={galeria !== null} onOpenChange={(o) => !o && setGaleria(null)}>
        <DialogContent className="max-h-[90dvh] max-w-2xl overflow-y-auto bg-card" onCloseAutoFocus={(e) => e.preventDefault()}>
          <div className="sticky -top-6 z-10 -mx-6 -mt-6 border-b border-border bg-card px-6 py-3">
            <Button type="button" variant="ghost" onClick={() => setGaleria(null)}>
              <ArrowLeft /> {idioma === "es" ? "Regresar" : "Go back"}
            </Button>
          </div>
          {galeria && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl">{galeria.titulo}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {idioma === "es"
                    ? `Galería de fotografías de este producto`
                    : `Photo gallery of this product`}
                </DialogDescription>
              </DialogHeader>
              <div className="relative">
                <img
                  src={galeria.fotos[galeriaIndice]?.src}
                  alt={`${galeria.titulo} · ${galeria.fotos[galeriaIndice]?.label ?? ""}`}
                  className="aspect-[4/3] w-full rounded-sm border border-border bg-card object-cover"
                />
                {galeria.fotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setGaleriaIndice((i) => (i - 1 + galeria.fotos.length) % galeria.fotos.length)}
                      aria-label={idioma === "es" ? "Fotografía anterior" : "Previous photo"}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-background/90 p-2 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setGaleriaIndice((i) => (i + 1) % galeria.fotos.length)}
                      aria-label={idioma === "es" ? "Fotografía siguiente" : "Next photo"}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-background/90 p-2 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                <span>
                  {galeriaIndice + 1} / {galeria.fotos.length}
                </span>
                <p className="text-right">{galeria.fotos[galeriaIndice]?.label}</p>
              </div>
              {galeria.fotos.length > 1 && (
                <div className="flex gap-2">
                  {galeria.fotos.map((f, i) => (
                    <button
                      key={f.src}
                      type="button"
                      onClick={() => setGaleriaIndice(i)}
                      aria-label={f.label}
                      aria-current={i === galeriaIndice}
                      className={`overflow-hidden rounded-sm border ${i === galeriaIndice ? "border-primary" : "border-border"}`}
                    >
                      <img src={f.src} alt="" className="h-14 w-20 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <ContadorVisitas />
      <Estadisticas />
    </div>
  );
}
