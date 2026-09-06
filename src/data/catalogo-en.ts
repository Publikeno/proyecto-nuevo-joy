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
    descripcion: "Rice soap with a coconut base.",
    destaca:
      "Exfoliating and softening. The catalog says it helps stabilize the skin tone and describes it as an astringent for normal and oily skin.",
  },
  "jabon-avena": {
    nombre: "Oat soap",
    ingrediente: "Oats",
    ingredientes: ["Oats"],
    descripcion: "Oat soap in a 70 g bar.",
    destaca:
      "The catalog identifies the product and its presentation but does not add a separate benefits description.",
  },
  "jabon-tepezcohuite-melipona": {
    nombre: "Tepezcohuite soap with melipona bee honey",
    ingrediente: "Tepezcohuite and melipona honey",
    ingredientes: ["Tepezcohuite", "Melipona bee honey"],
    descripcion: "Tepezcohuite soap with melipona bee honey in an individual 100 g presentation.",
    destaca:
      "The catalog presents it as a healing soap that helps dry severe acne and accelerate cell regeneration.",
  },
  "jabon-miel-melipona-madera": {
    nombre: "Melipona bee honey soap with a wood aroma",
    ingrediente: "Melipona bee honey",
    ingredientes: ["Melipona bee honey", "Wood aroma"],
    descripcion: "Soap made with melipona bee honey and a wood aroma.",
    destaca: "The catalog highlights its refreshing wood aroma.",
  },
  "jabon-neem-coco": {
    nombre: "Coconut-base neem soap",
    ingrediente: "Neem and coconut base",
    ingredientes: ["Neem", "Coconut base"],
    descripcion: "Neem soap with a coconut base in a 70 g bar.",
    destaca:
      "The catalog presents it for dry skin. It also describes it as fungicidal and as support for relieving chechén and scabies.",
  },
  "jabon-curcuma-coco-melipona": {
    nombre: "Turmeric, coconut and melipona bee honey soap",
    ingrediente: "Turmeric, coconut and melipona honey",
    ingredientes: ["Turmeric", "Coconut", "Melipona bee honey"],
    descripcion: "Turmeric, coconut and melipona bee honey soap in a 90 g presentation.",
    destaca:
      "The catalog presents it as support for addressing hyperpigmentation, acne, dull skin and dark circles, while helping protect against environmental damage. It also mentions support in some cases of psoriasis and eczema and prevention of premature aging.",
  },
  "jabon-fresa-champagne": {
    nombre: "Strawberry champagne soap with a goat milk base",
    ingrediente: "Goat milk, strawberry champagne and melipona honey",
    ingredientes: ["Goat milk", "Melipona bee honey", "Strawberry champagne"],
    descripcion: "Soap with a goat milk base, melipona bee honey and strawberry champagne.",
    destaca:
      "The catalog positions it for mature or normal skin and presents it as revitalizing: it activates and lifts vital energy and helps restore the skin's vitality.",
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
    descripcion: "Aloe vera and mint soap in an 80 g presentation.",
    destaca:
      "The catalog describes it as an antioxidant that can help reduce the appearance of skin spots and soften the skin.",
  },
  "kit-cartera": {
    nombre: "Purse kit",
    ingrediente: "Travel selection",
    ingredientes: ["Pocket honey"],
    descripcion: "Travel kit with soap, a jute purse and pocket honey.",
    destaca: "The purse is handmade from natural jute.",
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
    descripcion: "Flower kit with aloe vera soap, pocket honey and a cotton fabric wrapping.",
    destaca: "The catalog highlights its gift-ready format and handcrafted components.",
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
      "Regenerating cellular moisturizing cream for the face and neck, made with sesame seed, melipona honey and collagen.",
    destaca:
      "Antioxidant. The catalog says it protects against free radicals, pollution, smoke, UV rays and cold; helps prevent and reduce wrinkles, expression lines and stretch marks; keeps skin hydrated and supports cell regeneration. It also mentions use as sunscreen, makeup base and makeup remover, and to relieve burns caused by sun, fire or hot oil.",
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
    descripcion: "Firming cream for the face and neck, enhanced with rosemary and vitamin E.",
    destaca:
      "The catalog presents it as a firming cream that supports accelerated regeneration of damaged cells and skin repair.",
  },
  "miel-abejas-meliponas": {
    nombre: "Beecheii melipona bee honey",
    ingrediente: "Melipona beecheii honey",
    ingredientes: ["Melipona beecheii honey"],
    descripcion:
      "Honey from the stingless bee species Melipona beecheii, native to the Yucatán Peninsula and Quintana Roo.",
    destaca:
      "The catalog mentions bioactive compounds such as proteins, flavonoids and polyphenols, with high antioxidant activity. It also describes traditional uses related to eye care, sore throat, cough, asthma, stomach ulcers, gastritis, wounds, burns and spots.",
  },
  "elixir-miel-melipona-cacao": {
    nombre: "Melipona bee honey and cacao elixir",
    ingrediente: "Melipona bee honey and pure cacao",
    ingredientes: ["Melipona bee honey", "100% defatted, sugar-free pure cacao"],
    descripcion: "Melipona bee honey and pure cacao elixir in dark glass containers.",
    destaca:
      "The catalog mentions antioxidants and polyphenols, as well as cacao minerals —magnesium, iron and zinc— and theobromine. It also describes benefits related to vascular elasticity, inflammation, mood and sustained energy.",
  },
  "multivitaminico-polen-propoleo-miel": {
    nombre: "Pollen, propolis and apidea bee honey multivitamin",
    ingrediente: "Pollen, propolis and apidea bee honey",
    ingredientes: ["Pollen", "Propolis", "Apidea bee honey"],
    descripcion: "Multivitamin in a 200 g dark glass container.",
    variantes: [{ tamano: "200 g · dark glass container", precio: 180 }],
    destaca:
      "The catalog describes propolis as encapsulating viruses and bacteria and presents the product as a source of quick energy with antiseptic, antibacterial and antioxidant properties. It also mentions traditional uses for cough, sore throat, digestion and wound healing.",
  },
  "propoleo-eucalipto": {
    nombre: "Propolis with eucalyptus",
    ingrediente: "Propolis with eucalyptus",
    ingredientes: ["Propolis", "Eucalyptus"],
    descripcion: "Propolis with eucalyptus in a spray bottle.",
    destaca: "Spray presentation for practical application.",
  },
  "shampoo-mascarilla-miel-romero-canela": {
    nombre: "Honey, rosemary and cinnamon hair mask shampoo",
    ingrediente: "Honey, rosemary and cinnamon",
    ingredientes: ["Honey", "Rosemary", "Cinnamon"],
    descripcion: "Hair mask shampoo made with honey, rosemary and cinnamon.",
    destaca:
      "The catalog says it stimulates hair growth and strengthens it; restores, repairs and provides natural softness and shine.",
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
    descripcion: "Cream repellent for mosquitoes, flies and horseflies.",
    destaca: "Cream presentation.",
  },
  "repelente-liquido-hidroalcoholico": {
    nombre: "Hydroalcoholic liquid insect repellent",
    ingrediente: "Hydroalcoholic liquid formula",
    ingredientes: ["Not specified in the catalog sheet"],
    descripcion: "Hydroalcoholic liquid repellent for mosquitoes, flies and horseflies.",
    destaca: "Hydroalcoholic liquid presentation.",
  },
};

export const NOTA_CATALOGO_EN =
  "Product features, traditional uses and benefits transcribed from the PowerPoint catalog. They do not replace medical guidance; for irritation or health conditions, consult a professional.";

export const productosEn: Producto[] = productos.map((producto) => ({
  ...producto,
  ...traducciones[producto.id],
}));
