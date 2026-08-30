export type Categoria = "Jabones" | "Cremas" | "Mieles y elixires" | "Kits";

export type Variante = {
  tamano: string;
  precio: number;
};

export type Producto = {
  id: string;
  nombre: string;
  categoria: Categoria;
  ingrediente: string;
  descripcion: string;
  ritual: string;
  variantes: Variante[];
};

export const categorias: Categoria[] = ["Jabones", "Cremas", "Mieles y elixires", "Kits"];

export const productos: Producto[] = [
  {
    id: "jabon-arroz-coco",
    nombre: "Jabón de arroz base coco",
    categoria: "Jabones",
    ingrediente: "Arroz y aceite de coco",
    descripcion: "Barra artesanal de arroz sobre base de aceite de coco, elaborada a mano en el taller.",
    ritual: "Frota entre las manos húmedas y masajea la piel en círculos suaves.",
    variantes: [{ tamano: "70 g", precio: 70 }],
  },
  {
    id: "jabon-avena",
    nombre: "Jabón de avena",
    categoria: "Jabones",
    ingrediente: "Avena",
    descripcion: "Jabón de avena de espuma suave, pensado para la limpieza diaria de la piel.",
    ritual: "Úsalo en el baño de la mañana, con agua tibia.",
    variantes: [{ tamano: "70 g", precio: 50 }],
  },
  {
    id: "jabon-tepezcohuite-melipona",
    nombre: "Jabón de tepezcohuite con miel de abejas meliponas",
    categoria: "Jabones",
    ingrediente: "Tepezcohuite y miel melipona",
    descripcion: "Corteza de tepezcohuite molida y miel de abejas meliponas en una barra de 100 g.",
    ritual: "Masajea el rostro con espuma y enjuaga con agua fresca.",
    variantes: [{ tamano: "100 g", precio: 120 }],
  },
  {
    id: "jabon-miel-melipona-madera",
    nombre: "Jabón de miel de abejas meliponas, aroma a madera",
    categoria: "Jabones",
    ingrediente: "Miel melipona",
    descripcion: "Jabón con miel de abejas meliponas y un aroma cálido a madera.",
    ritual: "Para el baño de la tarde, cuando el día pide despedirse.",
    variantes: [{ tamano: "100 g", precio: 60 }],
  },
  {
    id: "jabon-neem-coco",
    nombre: "Jabón de neem base coco",
    categoria: "Jabones",
    ingrediente: "Neem y aceite de coco",
    descripcion: "Hojas de neem sobre base de aceite de coco, en barra artesanal de 70 g.",
    ritual: "Enjabona, deja actuar unos segundos y enjuaga.",
    variantes: [{ tamano: "70 g", precio: 70 }],
  },
  {
    id: "jabon-curcuma-coco-melipona",
    nombre: "Jabón cúrcuma coco con miel de abejas meliponas",
    categoria: "Jabones",
    ingrediente: "Cúrcuma, coco y miel melipona",
    descripcion: "Cúrcuma y coco combinados con miel de abejas meliponas en una barra de 90 g.",
    ritual: "Espuma densa sobre la piel húmeda, mañana o noche.",
    variantes: [{ tamano: "90 g", precio: 90 }],
  },
  {
    id: "jabon-fresa-champagne",
    nombre: "Jabón fresa champagne, base leche de cabra",
    categoria: "Jabones",
    ingrediente: "Leche de cabra y fresa",
    descripcion: "Barra cremosa con base de leche de cabra y aroma a fresa champagne, en tres tamaños.",
    ritual: "Un regalo pequeño para el lavabo o el neceser de viaje.",
    variantes: [
      { tamano: "20 g", precio: 20 },
      { tamano: "70 g", precio: 60 },
      { tamano: "90 g", precio: 90 },
    ],
  },
  {
    id: "jabon-sabila-menta",
    nombre: "Jabón de sábila menta",
    categoria: "Jabones",
    ingrediente: "Sábila y menta",
    descripcion: "Jabón fresco de sábila y menta en barra de 80 g.",
    ritual: "Ideal después del sol o del ejercicio.",
    variantes: [{ tamano: "80 g", precio: 30 }],
  },
  {
    id: "kit-cartera",
    nombre: "Kit cartera",
    categoria: "Kits",
    ingrediente: "Selección de viaje",
    descripcion: "Kit compacto pensado para llevar en la cartera o el bolso.",
    ritual: "Para tener el ritual a la mano fuera de casa.",
    variantes: [{ tamano: "Kit", precio: 210 }],
  },
  {
    id: "kit-flor",
    nombre: "Kit flor",
    categoria: "Kits",
    ingrediente: "Selección floral",
    descripcion: "Kit flor, una selección pequeña lista para regalar.",
    ritual: "El detalle breve: alcanza para empezar el ritual.",
    variantes: [{ tamano: "Kit", precio: 90 }],
  },
  {
    id: "crema-rch",
    nombre: "Crema regeneradora celular hidratante RCH",
    categoria: "Cremas",
    ingrediente: "Cera y miel melipona",
    descripcion: "Crema hidratante de uso diario, disponible en cuatro tamaños.",
    ritual: "Una nuez sobre la piel apenas húmeda, mañana y noche.",
    variantes: [
      { tamano: "30 g", precio: 170 },
      { tamano: "60 g", precio: 320 },
      { tamano: "120 g", precio: 590 },
      { tamano: "250 g", precio: 1100 },
    ],
  },
  {
    id: "crema-rf",
    nombre: "Crema reafirmante RF",
    categoria: "Cremas",
    ingrediente: "Cera de abeja",
    descripcion: "Crema reafirmante en presentación de 50 g.",
    ritual: "Aplica con masaje ascendente sobre la piel limpia.",
    variantes: [{ tamano: "50 g", precio: 280 }],
  },
  {
    id: "miel-abejas-meliponas",
    nombre: "Miel de abejas meliponas",
    categoria: "Mieles y elixires",
    ingrediente: "Miel melipona pura",
    descripcion: "Miel pura de abejas meliponas de Quintana Roo, en seis presentaciones.",
    ritual: "Una cucharadita lenta, sin prisa, al empezar la mañana.",
    variantes: [
      { tamano: "5 ml", precio: 60 },
      { tamano: "10 ml", precio: 120 },
      { tamano: "15 ml", precio: 180 },
      { tamano: "20 ml", precio: 220 },
      { tamano: "30 ml", precio: 290 },
      { tamano: "50 ml", precio: 440 },
    ],
  },
  {
    id: "elixir-miel-melipona-cacao",
    nombre: "Elixir de miel de abejas meliponas y cacao",
    categoria: "Mieles y elixires",
    ingrediente: "Miel melipona y cacao",
    descripcion: "Elixir de miel de abejas meliponas con cacao, en dos presentaciones.",
    ritual: "Unas gotas bajo la lengua o disueltas en agua tibia.",
    variantes: [
      { tamano: "30 ml", precio: 260 },
      { tamano: "50 ml", precio: 340 },
    ],
  },
];
