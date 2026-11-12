import { describe, expect, it } from "vitest";
import { aplicarAjustes, type AjusteProducto } from "./ajustes";
import type { Producto } from "@/data/catalogo";

const base: Producto = {
  id: "jabon-avena",
  nombre: "Jabón de avena",
  categoria: "Jabones",
  marca: "XUUJÁAB",
  ingrediente: "Avena",
  ingredientes: ["Avena"],
  descripcion: "Original",
  ritual: "",
  destaca: "",
  variantes: [{ tamano: "70 g", precio: 37 }],
};
const ajuste = (x: Partial<AjusteProducto>): AjusteProducto => ({
  id: "jabon-avena", nombre: null, descripcion: null, imagen_path: null, oculto: false, variantes: null, ...x,
});

describe("ajustes del panel admin", () => {
  it("cambia el precio guardado por la administradora", () => {
    const [p] = aplicarAjustes([base], [ajuste({ variantes: [{ tamano: "70 g", precio: 45 }] })], "es");
    expect(p!.variantes[0]!.precio).toBe(45);
  });
  it("un producto oculto no aparece", () => {
    expect(aplicarAjustes([base], [ajuste({ oculto: true })], "es")).toHaveLength(0);
  });
  it("identifier-only tombstones hide static products in both catalog languages", () => {
    const tombstone = ajuste({ oculto: true });
    for (const idioma of ["es", "en"] as const) {
      expect(aplicarAjustes([base], [tombstone], idioma)).toEqual([]);
    }
  });
  it("ignora precios en cero para no vender gratis", () => {
    const [p] = aplicarAjustes([base], [ajuste({ variantes: [{ tamano: "70 g", precio: 0 }] })], "es");
    expect(p!.variantes[0]!.precio).toBe(37);
  });
  it("en inglés aplica el precio pero conserva el nombre traducido", () => {
    const en = { ...base, nombre: "Oat soap" };
    const [p] = aplicarAjustes([en], [ajuste({ nombre: "Nuevo", variantes: [{ tamano: "70 g", precio: 50 }] })], "en");
    expect(p!.nombre).toBe("Oat soap");
    expect(p!.variantes[0]!.precio).toBe(50);
  });
});

describe("productos nuevos del panel", () => {
  it("aparecen con su precio y se ocultan si se marcan", async () => {
    const { aplicarAjustes } = await import("./ajustes");
    const nuevo = { id: "nuevo-1", nombre: "Jabón de prueba", descripcion: "", imagen_path: null, oculto: false, variantes: [{ tamano: "70 g", precio: 55 }], es_nuevo: true, categoria: "Jabones", marca: "XUUJÁAB" };
    const r = aplicarAjustes([], [nuevo], "es");
    expect(r[0]?.variantes[0]?.precio).toBe(55);
    expect(aplicarAjustes([], [{ ...nuevo, oculto: true }], "es")).toHaveLength(0);
  });
});
