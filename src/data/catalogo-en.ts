import type { Producto } from "./catalogo";
import { productos } from "./catalogo";

type TraduccionProducto = Partial<
  Pick<
    Producto,
    | "nombre"
    | "ingrediente"
    | "ingredientes"
    | "descripcion"
    | "destaca"
    | "componentes"
    | "variantes"
  >
>;

const traducciones: Record<string, TraduccionProducto> = {
  "jabon-arroz-coco": {
    nombre: "Coconut-base rice soap",
    ingrediente: "Rice and coconut base",
    ingredientes: ["Rice", "Coconut"],
    descripcion: "" ,
    destaca:
      "" ,
    variantes: [
      { tamano: "20 g · travel size", precio: 20 },
      { tamano: "70 g", precio: 60 },
      { tamano: "90 g", precio: 90 },
    ],
  },
  "jabon-sabila-menta": {
    nombre: "Aloe vera and mint soap",
    ingrediente: "Aloe vera and mint",
    ingredientes: ["Aloe vera", "Mint"],
    descripcion: "" ,
    destaca:
      "" ,
    componentes: [
      "Tepezcohuite soap with melipona bee honey, 100 g",
      "Handmade natural jute purse",
      "Pocket honey in a 5 ml dropper",
    ],
    variantes: [{ tamano: "Purse kit", precio: 210 }],
  },
  "kit-flor": {
    nombre: "Flower kit",
    ingrediente: "Aloe vera, mint and pocket honey",
    ingredientes: ["Aloe vera", "Mint", "Pocket honey"],
    descripcion: "" ,
    destaca: "" ,
    componentes: [
      "Aloe vera soap, 80 g",
      "Pocket honey in a 5 ml dropper",
      "Cotton fabric wrapping",
    ],
    variantes: [{ tamano: "Flower kit", precio: 90 }],
  },
  "crema-rch": {
    nombre: "RCH regenerating cellular moisturizing cream for face and neck",
    ingrediente: "Sesame seed, melipona honey and collagen",
    ingredientes: ["Sesame seed", "Melipona honey", "Collagen"],
    descripcion:
      "" ,
    destaca:
      "" ,
    variantes: [
      { tamano: "30 g · format 1", precio: 170 },
      { tamano: "60 g", precio: 320 },
      { tamano: "120 g", precio: 590 },
      { tamano: "250 g", precio: 1100 },
      { tamano: "30 g · format 2", precio: 120 },
      { tamano: "50 g", precio: 220 },
      { tamano: "50 g · with dispenser", precio: 240 },
    ],
  },
  "crema-rf": {
    nombre: "RF firming cream for face and neck",
    ingrediente: "Melipona bee honey Beecheii, rosemary and vitamin E",
    ingredientes: ["Melipona bee honey Beecheii", "Rosemary", "Vitamin E"],
    descripcion: "" ,
    destaca:
      "" ,
    variantes: [{ tamano: "200 g · dark glass container", precio: 180 }],
    destaca:
      "" ,
    variantes: [
      { tamano: "125 ml", precio: 75 },
      { tamano: "250 ml", precio: 150 },
      { tamano: "500 ml", precio: 270 },
    ],
  },
  "repelente-crema": {
    nombre: "Cream insect repellent",
    ingrediente: "Cream repellent formula",
    ingredientes: ["Not specified in the catalog sheet"],
    descripcion: "" ,
    destaca: "Cream presentation.",
  },
  "repelente-liquido-hidroalcoholico": {
    nombre: "Hydroalcoholic liquid insect repellent",
    ingrediente: "Hydroalcoholic liquid formula",
    ingredientes: ["Not specified in the catalog sheet"],
    descripcion: "" ,
    destaca: "Hydroalcoholic liquid presentation.",
  },
};

export const NOTA_CATALOGO_EN =
  "Product features, traditional uses and benefits transcribed from the PowerPoint catalog. They do not replace medical guidance; for irritation or health conditions, consult a professional.";

export const productosEn: Producto[] = productos.map((producto) => ({
  ...producto,
  ...traducciones[producto.id],
}));
