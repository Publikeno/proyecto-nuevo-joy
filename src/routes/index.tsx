import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { categorias, productos, type Categoria, type Producto } from "@/data/catalogo";
import logo from "@/assets/xuumiel-logo.png";
import heroImg from "@/assets/hero-xuumiel.jpg";
import origenImg from "@/assets/origen-quintanaroo.jpg";

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
    ],
  }),
  component: Index,
});

const precio = (n: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(n);

type Filtro = Categoria | "Todo";

function Index() {
  const [filtro, setFiltro] = useState<Filtro>("Todo");
  const [detalle, setDetalle] = useState<Producto | null>(null);

  const lista = useMemo(
    () => (filtro === "Todo" ? productos : productos.filter((p) => p.categoria === filtro)),
    [filtro],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#catalogo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Saltar al catálogo
      </a>

      <header className="border-b border-border/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logotipo de XUUMIEL: pirámides mayas y una abeja" width={48} height={48} className="h-11 w-11 object-contain" />
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold tracking-[0.18em]">XUUMIEL</p>
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">Catálogo 2026</p>
            </div>
          </div>
          <nav aria-label="Principal" className="hidden gap-7 text-sm sm:flex">
            <a className="hover:text-accent-foreground/80" href="#origen">Origen</a>
            <a className="hover:text-accent-foreground/80" href="#catalogo">Catálogo</a>
            <a className="hover:text-accent-foreground/80" href="#pdf">Catálogo PDF</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Quintana Roo, México</p>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              Del taller de la melipona a tu ritual diario
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Miel melipona, jabones curados en frío, cremas de cera y elixires elaborados en lotes pequeños,
              con floración de la selva maya.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#catalogo"
                className="rounded-sm bg-primary px-6 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
              >
                Ver el catálogo
              </a>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6 text-sm">
              <div>
                <dt className="text-muted-foreground">Elaboración</dt>
                <dd className="font-display text-lg">Lotes pequeños</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Cosecha</dt>
                <dd className="font-display text-lg">Por temporada</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Piezas</dt>
                <dd className="font-display text-lg">{productos.length}</dd>
              </div>
            </dl>
          </div>
          <div className="overflow-hidden rounded-sm border border-border">
            <img
              src={heroImg}
              alt="Miel melipona en olla de barro junto a jabones artesanales y hojas botánicas"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* Origen */}
        <section id="origen" className="border-y border-border bg-secondary/60">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
            <div className="overflow-hidden rounded-sm border border-border md:order-2">
              <img
                src={origenImg}
                alt="Jobón de tronco con colmena de abeja melipona en la selva de Quintana Roo"
                width={1200}
                height={912}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="md:order-1">
              <h2 className="font-display text-3xl sm:text-4xl">Origen en Quintana Roo</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Trabajamos con meliponarios familiares del centro del estado, donde la abeja
                <em> Melipona beecheii</em> se cría en jobones de tronco desde hace generaciones. La cosecha se
                hace gota a gota, respetando el ciclo de la colmena y la floración del monte.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                En el taller la miel, la cera y el propóleo se transforman a mano: saponificación en frío,
                maceraciones largas y envases de vidrio y cartón reutilizables.
              </p>
              <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
                {["Meliponarios familiares", "Cosecha por temporada", "Hecho a mano en taller"].map((t) => (
                  <li key={t} className="border-l-2 border-honey pl-3 text-foreground">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Catálogo */}
        <section id="catalogo" className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-3xl sm:text-4xl">Catálogo 2026</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Filtra por familia de producto. Cada ficha incluye precio, tamaño e ingrediente principal.
          </p>

          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar catálogo por categoría">
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
              <li key={p.id} className="flex flex-col rounded-sm border border-border bg-card p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">{p.categoria}</p>
                <h3 className="mt-3 font-display text-xl leading-snug">{p.nombre}</h3>
                <dl className="mt-4 space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between gap-3">
                    <dt>Tamaño</dt>
                    <dd className="text-foreground">{p.tamano}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Ingrediente</dt>
                    <dd className="text-right text-foreground">{p.ingrediente}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <span className="font-display text-xl">{precio(p.precio)}</span>
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
        </section>

        {/* PDF */}
        <section id="pdf" className="border-t border-border bg-primary text-primary-foreground">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-3xl">Catálogo completo en PDF</h2>
              <p className="mt-3 max-w-lg text-primary-foreground/75">
                Descarga la edición 2026 con fichas, tamaños y precios de mayoreo para tiendas y ferias.
              </p>
            </div>
            <a
              href="/catalogo-xuumiel-2026.pdf"
              className="rounded-sm bg-honey px-6 py-3 text-sm font-medium text-cacao transition-opacity hover:opacity-90"
            >
              Descargar PDF (2026)
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="" aria-hidden="true" width={40} height={40} loading="lazy" className="h-10 w-10 object-contain" />
              <p className="font-display text-base tracking-[0.18em]">XUUMIEL</p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Miel melipona y cosmética artesanal de Quintana Roo, México.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Secciones</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a className="hover:text-foreground" href="#origen">Origen</a></li>
              <li><a className="hover:text-foreground" href="#catalogo">Catálogo</a></li>
              <li><a className="hover:text-foreground" href="#pdf">Catálogo PDF</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold">Contacto</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a className="hover:text-foreground" href="mailto:hola@xuumiel.mx">hola@xuumiel.mx</a></li>
              <li>Taller en Quintana Roo</li>
              <li>Pedidos por correo</li>
            </ul>
          </div>
        </div>
        <p className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} XUUMIEL. Precios en pesos mexicanos, sujetos a temporada de cosecha.
        </p>
      </footer>

      <Dialog open={detalle !== null} onOpenChange={(o) => !o && setDetalle(null)}>
        <DialogContent className="max-w-lg bg-card">
          {detalle && (
            <>
              <DialogHeader>
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-terracotta">{detalle.categoria}</p>
                <DialogTitle className="font-display text-2xl">{detalle.nombre}</DialogTitle>
                <DialogDescription className="text-muted-foreground">{detalle.descripcion}</DialogDescription>
              </DialogHeader>
              <dl className="mt-2 grid grid-cols-2 gap-4 border-y border-border py-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Precio</dt>
                  <dd className="font-display text-xl">{precio(detalle.precio)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Tamaño</dt>
                  <dd className="font-display text-xl">{detalle.tamano}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-muted-foreground">Ingrediente principal</dt>
                  <dd className="mt-1">{detalle.ingrediente}</dd>
                </div>
              </dl>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="text-foreground">Modo de uso: </span>
                {detalle.ritual}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
