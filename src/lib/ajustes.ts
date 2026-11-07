import type { Categoria, Producto, Variante } from "@/data/catalogo";

// Cambios guardados desde el panel /admin, encima del catálogo base.
export type AjusteProducto = {
  id: string;
  nombre: string | null;
  descripcion: string | null;
  imagen_path: string | null;
  oculto: boolean;
  variantes: Variante[] | null;
  es_nuevo?: boolean;
  categoria?: string | null;
  marca?: string | null;
};

const CATEGORIAS: Categoria[] = ["Jabones", "Cremas", "Mieles y elixires", "Kits", "Cuidado personal"];

/** Producto creado desde el panel (no existe en el catálogo base). */
function productoNuevo(a: AjusteProducto): Producto | null {
  const variantes = variantesValidas(a.variantes);
  const nombre = a.nombre?.trim();
  if (!variantes || !nombre || a.oculto) return null;
  const categoria = CATEGORIAS.includes(a.categoria as Categoria) ? (a.categoria as Categoria) : "Jabones";
  return {
    id: a.id,
    nombre,
    categoria,
    marca: a.marca === "XUUMIEL" ? "XUUMIEL" : "XUUJÁAB",
    ingrediente: "",
    ingredientes: [],
    descripcion: a.descripcion ?? "",
    ritual: "",
    destaca: "",
    variantes,
    imagen: a.imagen_path ? fotoAjusteUrl(a.imagen_path) : undefined,
  };
}

export const fotoAjusteUrl = (path: string) => `/api/public/foto/${path}`;

function variantesValidas(v: unknown): Variante[] | null {
  if (!Array.isArray(v) || v.length === 0) return null;
  const ok = v.every(
    (x) => x && typeof x.tamano === "string" && x.tamano.trim() && Number.isFinite(x.precio) && x.precio > 0,
  );
  return ok ? (v as Variante[]) : null;
}

/**
 * Aplica los ajustes. Precio, foto y "oculto" valen en ambos idiomas;
 * nombre y descripción editados solo reemplazan la versión en español.
 * Las presentaciones de inglés conservan su texto y toman el precio por posición.
 */
export function aplicarAjustes(
  lista: Producto[],
  ajustes: AjusteProducto[] | undefined,
  idioma: "es" | "en",
): Producto[] {
  if (!ajustes?.length) return lista;
  const porId = new Map(ajustes.map((a) => [a.id, a]));
  const out: Producto[] = [];
  for (const p of lista) {
    const a = porId.get(p.id);
    if (!a) {
      out.push(p);
      continue;
    }
    if (a.oculto) continue;
    const vs = variantesValidas(a.variantes);
    let variantes = p.variantes;
    if (vs) {
      variantes =
        idioma === "es" || vs.length !== p.variantes.length
          ? vs
          : p.variantes.map((v, i) => ({ ...v, precio: vs[i]!.precio }));
    }
    out.push({
      ...p,
      nombre: idioma === "es" && a.nombre?.trim() ? a.nombre.trim() : p.nombre,
      descripcion: idioma === "es" && a.descripcion != null && a.descripcion.trim() ? a.descripcion : p.descripcion,
      imagen: a.imagen_path ? fotoAjusteUrl(a.imagen_path) : p.imagen,
      variantes,
    });
  }
  const base = new Set(lista.map((p) => p.id));
  for (const a of ajustes) {
    if (!a.es_nuevo || base.has(a.id)) continue;
    const n = productoNuevo(a);
    if (n) out.push(n);
  }
  return out;
}
