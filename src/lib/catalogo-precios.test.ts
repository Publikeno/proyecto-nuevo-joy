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
});

describe("RF crema reafirmante corregida por la usuaria", () => {
  it("se vende en 60 g a $290 MXN en ambos idiomas y nada más cambió", () => {
    for (const catalogo of [productos, productosEn]) {
      const rf = catalogo.find((p) => p.id === "crema-rf");
      expect(rf?.variantes).toEqual([{ tamano: "60 g", precio: 290 }]);
      expect(rf?.nombre).toBe("RF crema reafirmante para rostro y cuello");
      expect(rf?.ingredientes).toEqual(["Miel de abejas Meliponas Beecheii", "Romero", "Vitamina E"]);
    }
  });
});

