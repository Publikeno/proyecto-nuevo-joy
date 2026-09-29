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
  },
  "jabon-avena": {
    nombre: "Oat soap",
    ingrediente: "Oats",
    ingredientes: ["Oats"],
    descripcion: "" ,
    destaca:
      "" ,
  },
  "jabon-tepezcohuite-melipona": {
    nombre: "Tepezcohuite soap with melipona bee honey",
    ingrediente: "Tepezcohuite and melipona honey",
    ingredientes: ["Tepezcohuite", "Melipona bee honey"],
    descripcion: "" ,
    destaca:
      "" ,
  },
  "jabon-miel-melipona-madera": {
    nombre: "Melipona bee honey soap with a wood aroma",
    ingrediente: "Melipona bee honey",
    ingredientes: ["Melipona bee honey", "Wood aroma"],
    descripcion: "" ,
    destaca: "" ,
  },
  "jabon-neem-coco": {
    nombre: "Coconut-base neem soap",
    ingrediente: "Neem and coconut base",
    ingredientes: ["Neem", "Coconut base"],
    descripcion: "" ,
    destaca:
      "" ,
  },
  "jabon-curcuma-coco-melipona": {
    nombre: "Turmeric, coconut and melipona bee honey soap",
    ingrediente: "Turmeric, coconut and melipona honey",
    ingredientes: ["Turmeric", "Coconut", "Melipona bee honey"],
    descripcion: "" ,
    destaca:
      "" ,
  },
  "jabon-fresa-champagne": {
    nombre: "Strawberry champagne soap with a goat milk base",
    ingrediente: "Goat milk, strawberry champagne and melipona honey",
    ingredientes: ["Goat milk", "Melipona bee honey", "Strawberry champagne"],
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
  },
  "kit-cartera": {
    nombre: "Purse kit",
    ingrediente: "Travel selection",
    ingredientes: ["Pocket honey"],
    descripcion: "" ,
    destaca: "" ,
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
  },
  "miel-abejas-meliponas": {
    nombre: "Beecheii melipona bee honey",
    ingrediente: "Melipona beecheii honey",
    ingredientes: ["Melipona beecheii honey"],
    descripcion:
      "" ,
    destaca:
      "" ,
  },
  "elixir-miel-melipona-cacao": {
    nombre: "Melipona bee honey and cacao elixir",
    ingrediente: "Melipona bee honey and pure cacao",
    ingredientes: ["Melipona bee honey", "100% defatted, sugar-free pure cacao"],
    descripcion: "" ,
    destaca:
      "" ,
  },
  "multivitaminico-polen-propoleo-miel": {
    nombre: "Pollen, propolis and apidea bee honey multivitamin",
    ingrediente: "Pollen, propolis and apidea bee honey",
    ingredientes: ["Pollen", "Propolis", "Apidea bee honey"],
    descripcion: "" ,
    variantes: [{ tamano: "200 g · dark glass container", precio: 180 }],
    destaca:
      "" ,
  },
  "propoleo-eucalipto": {
    nombre: "Propolis with eucalyptus",
    ingrediente: "Propolis with eucalyptus",
    ingredientes: ["Propolis", "Eucalyptus"],
    descripcion: "" ,
    destaca: "" ,
  },
  "shampoo-mascarilla-miel-romero-canela": {
    nombre: "Honey, rosemary and cinnamon hair mask shampoo",
    ingrediente: "Honey, rosemary and cinnamon",
    ingredientes: ["Honey", "Rosemary", "Cinnamon"],
    descripcion: "" ,
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
    destaca: "" ,
  },
  "repelente-liquido-hidroalcoholico": {
    nombre: "Hydroalcoholic liquid insect repellent",
    ingrediente: "Hydroalcoholic liquid formula",
    ingredientes: ["Not specified in the catalog sheet"],
    descripcion: "" ,
    destaca: "" ,
  },
};

export const NOTA_CATALOGO_EN =
  "Product features, traditional uses and benefits transcribed from the PowerPoint catalog. They do not replace medical guidance; for irritation or health conditions, consult a professional.";

export const productosEn: Producto[] = productos.map((producto) => ({
  ...producto,
  ...traducciones[producto.id],
}));
