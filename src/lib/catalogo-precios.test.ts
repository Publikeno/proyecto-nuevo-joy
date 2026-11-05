import { describe, expect, it } from "vitest";
import { productos } from "../data/catalogo";
import { productosEn } from "../data/catalogo-en";

describe("Fichas eliminadas por la usuaria", () => {
  it.each([
    "elixir-miel-meliponas-y-cacao",
    "miel-abejas-meliponas",
  ])("%s ya no existe en ningún idioma", (id) => {
    expect(productos.find((p) => p.id === id)).toBeUndefined();
    expect(productosEn.find((p) => p.id === id)).toBeUndefined();
  });
});

describe("Elixir de miel de abejas meliponas restaurado por la usuaria", () => {
  it("conserva sus 5 presentaciones y precios en ambos idiomas", () => {
    const es = productos.find((p) => p.id === "elixir-miel-melipona-cacao");
    expect(es?.nombre).toBe("Elixir de miel de abejas meliponas");
    expect(es?.variantes).toEqual([
      { tamano: "10 ml", precio: 130 },
      { tamano: "20 ml", precio: 230 },
      { tamano: "30 ml", precio: 320 },
      { tamano: "50 ml", precio: 440 },
      { tamano: "50 ml · con estuche de madera", precio: 590 },
    ]);
    const en = productosEn.find((p) => p.id === "elixir-miel-melipona-cacao");
    expect(en?.variantes).toEqual([
      { tamano: "10 ml", precio: 130 },
      { tamano: "20 ml", precio: 230 },
      { tamano: "30 ml", precio: 320 },
      { tamano: "50 ml", precio: 440 },
      { tamano: "50 ml · with wooden case", precio: 590 },
    ]);
  });
});

describe("Cremas HRCM agregadas por la usuaria", () => {
  it.each([
    ["crema-bambu", "Crema HRCM Bambú"],
    ["crema-maderas", "Crema HRCM Maderas"],
  ])("%s tiene una sola variante de 240 g a $1,100 MXN en ambos idiomas", (id, nombre) => {
    expect(productos.find((p) => p.id === id)?.nombre).toBe(nombre);
    for (const catalogo of [productos, productosEn]) {
      const crema = catalogo.find((p) => p.id === id);
      expect(crema?.variantes).toEqual([{ tamano: "240 g", precio: 1100 }]);
    }
  });

  it("la Crema HRCM Bambú se describe elaborada con semillas de sésamo, colágeno y miel Melipona Beecheii, fórmula ADRN", () => {
    const espa = productos.find((p) => p.id === "crema-bambu")!.descripcion;
    expect(espa).toBe(
      "Crema hidratante regeneradora celular elaborada con semillas de sésamo, colágeno y miel Melipona Beecheii, fórmula ADRN.",
    );
    const ing = productosEn.find((p) => p.id === "crema-bambu")!.descripcion;
    expect(ing).toBe(
      "Cellular regenerating moisturizing cream made with sesame seeds, collagen and Melipona Beecheii honey, ADRN formula.",
    );
  });

  it("la Crema HRCM Bambú lista sésamo, colágeno y miel Meliponas Beecheii, fórmula ADRN en su línea de ingrediente", () => {
    expect(productos.find((p) => p.id === "crema-bambu")!.ingrediente).toBe(
      "Sésamo, colágeno y miel Meliponas Beecheii, fórmula ADRN",
    );
    expect(productosEn.find((p) => p.id === "crema-bambu")!.ingrediente).toBe(
      "Sesame, collagen and Melipona Beecheii honey, ADRN formula",
    );
  });
});

describe("RF crema reafirmante corregida por la usuaria", () => {
  it("se vende en 60 g a $290 MXN en ambos idiomas", () => {
    for (const catalogo of [productos, productosEn]) {
      const rf = catalogo.find((p) => p.id === "crema-rf");
      expect(rf?.variantes).toEqual([{ tamano: "60 g", precio: 290 }]);
    }
  });

  it("conserva su título e ingredientes originales en español", () => {
    const rf = productos.find((p) => p.id === "crema-rf");
    expect(rf?.nombre).toBe("RF crema reafirmante para rostro y cuello");
    expect(rf?.ingredientes).toEqual(["Miel de abejas Meliponas Beecheii", "Romero", "Vitamina E"]);
  });
});

describe("Jabón de coco y arroz agregado por la usuaria", () => {
  it("se vende en 70 g a $77 MXN en ambos idiomas", () => {
    const es = productos.find((p) => p.id === "jabon-coco-arroz");
    expect(es?.nombre).toBe("Jabón de coco y arroz");
    expect(es?.variantes).toEqual([{ tamano: "70 g", precio: 77 }]);
    const en = productosEn.find((p) => p.id === "jabon-coco-arroz");
    expect(en?.nombre).toBe("Coconut and rice soap");
    expect(en?.variantes).toEqual([{ tamano: "70 g", precio: 77 }]);
  });
});

describe("Multivitamínico de polen, propóleo y miel corregido por la usuaria", () => {
  it("se vende en 200 g a $150 MXN en ambos idiomas y nada más cambió", () => {
    const es = productos.find((p) => p.id === "multivitaminico-polen-propoleo-miel");
    expect(es?.variantes).toEqual([{ tamano: "200 g · envase de cristal oscuro", precio: 150 }]);
    expect(es?.nombre).toBe("Multivitamínico de polen, propóleo y miel de abejas apidea");
    const en = productosEn.find((p) => p.id === "multivitaminico-polen-propoleo-miel");
    expect(en?.variantes).toEqual([{ tamano: "200 g · dark glass container", precio: 150 }]);
  });
});



