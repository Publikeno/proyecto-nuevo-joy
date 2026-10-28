import { describe, expect, it } from "vitest";
import { fotosCatalogo } from "../data/catalogo-fotos";
import { productos } from "../data/catalogo";

describe("catálogo único sin repetir las fichas existentes", () => {
  it("conserva únicamente las fotos de productos que no tenían ficha", () => {
    expect(fotosCatalogo.map((foto) => foto.id)).toEqual([
      "IMG_8092", "IMG_8094", "IMG_8115", "IMG_8167", "IMG_8169", "abejajabon", "jabondemiel",
      "multivitaminico-cacao",
    ]);
    expect(new Set(fotosCatalogo.map((foto) => foto.archivo)).size).toBe(7);
  });

  it("mantiene sin precio ni descripción las entradas que no los tenían", () => {
    for (const foto of fotosCatalogo) {
      expect(foto).not.toHaveProperty("precio");
      expect(foto).not.toHaveProperty("descripcion");
      expect(foto).not.toHaveProperty("variantes");
      expect(productos.some((producto) => producto.id === foto.id)).toBe(false);
    }
  });
});