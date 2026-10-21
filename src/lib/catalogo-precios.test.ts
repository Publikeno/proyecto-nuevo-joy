import { describe, expect, it } from "vitest";
import { productos } from "../data/catalogo";
import { productosEn } from "../data/catalogo-en";

describe("presentaciones del Elixir confirmadas por la usuaria", () => {
  const presentaciones = [
    { tamano: "10 ml", precio: 130 },
    { tamano: "20 ml", precio: 230 },
    { tamano: "30 ml", precio: 320 },
    { tamano: "50 ml", precio: 440 },
    { tamano: "50 ml · con estuche de madera", precio: 590 },
  ];

  it.each(presentaciones)("$tamano cuesta $precio MXN en ambos idiomas", (presentacion) => {
    for (const catalogo of [productos, productosEn]) {
      const elixir = catalogo.find((p) => p.id === "elixir-miel-melipona-cacao");
      expect(elixir?.variantes.find((v) => v.tamano === presentacion.tamano)?.precio).toBe(presentacion.precio);
    }
  });

  it("contiene únicamente las cinco presentaciones de la captura", () => {
    expect(productos.find((p) => p.id === "elixir-miel-melipona-cacao")?.variantes).toEqual(presentaciones);
  });
});

describe("Elixir con Cacao agregado por la usuaria", () => {
  it.each([
    { tamano: "30 ml", precio: 180 },
  ])("$tamano cuesta $precio MXN en ambos idiomas", (presentacion) => {
    for (const catalogo of [productos, productosEn]) {
      const elixir = catalogo.find((p) => p.id === "elixir-miel-meliponas-y-cacao");
      expect(elixir?.variantes.find((v) => v.tamano === presentacion.tamano)?.precio).toBe(presentacion.precio);
    }
  });

  it("tiene únicamente la presentación solicitada y conserva el Elixir original aparte", () => {
    expect(productos.find((p) => p.id === "elixir-miel-meliponas-y-cacao")?.variantes).toEqual([
      { tamano: "30 ml", precio: 180 },
    ]);
    expect(productos.find((p) => p.id === "elixir-miel-melipona-cacao")?.variantes).toHaveLength(5);
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

describe("Multivitamínico de polen, propóleo y miel corregido por la usuaria", () => {
  it("se vende en 200 g a $150 MXN en ambos idiomas y nada más cambió", () => {
    const es = productos.find((p) => p.id === "multivitaminico-polen-propoleo-miel");
    expect(es?.variantes).toEqual([{ tamano: "200 g · envase de cristal oscuro", precio: 150 }]);
    expect(es?.nombre).toBe("Multivitamínico de polen, propóleo y miel de abejas apidea");
    const en = productosEn.find((p) => p.id === "multivitaminico-polen-propoleo-miel");
    expect(en?.variantes).toEqual([{ tamano: "200 g · dark glass container", precio: 150 }]);
  });
});



