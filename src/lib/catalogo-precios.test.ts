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

describe("Crema HRCM Bambú agregada por la usuaria", () => {
  it("tiene una sola variante de 240 g a $1,100 MXN en ambos idiomas", () => {
    for (const catalogo of [productos, productosEn]) {
      const crema = catalogo.find((p) => p.id === "crema-bambu");
      expect(crema?.variantes).toEqual([{ tamano: "240 g", precio: 1100 }]);
    }
  });
});
