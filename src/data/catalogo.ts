export type Categoria = "Jabones" | "Cremas" | "Mieles y elixires" | "Kits";

export type Variante = {
  tamano: string;
  precio: number;
};

export type Producto = {
  id: string;
  nombre: string;
  categoria: Categoria;
  marca: "XUUMIEL" | "XUUJÁAB";
  ingrediente: string;
  ingredientes: string[];
  descripcion: string;
  ritual: string;
  destaca: string;
  componentes?: string[];
  variantes: Variante[];
};

export const NOTA_CATALOGO =
  "Información de producto y uso tradicional tomada del catálogo. No sustituye orientación médica; para irritaciones o afecciones de salud, consulta a un profesional.";

export const categorias: Categoria[] = ["Jabones", "Cremas", "Mieles y elixires", "Kits"];

export const productos: Producto[] = [
  {
    id: "jabon-arroz-coco",
    nombre: "Jabón de arroz base coco",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Arroz y aceite de coco",
    ingredientes: ["Arroz", "Aceite de coco", "Base de jabón artesanal"],
    descripcion: "Barra artesanal de arroz sobre base de aceite de coco, elaborada a mano en el taller.",
    ritual: "Frota entre las manos húmedas y masajea la piel en círculos suaves.",
    destaca: "El catálogo lo presenta como exfoliante y suavizante, con una limpieza de textura suave.",
    variantes: [{ tamano: "70 g", precio: 70 }],
  },
  {
    id: "jabon-avena",
    nombre: "Jabón de avena",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Avena",
    ingredientes: ["Avena", "Base de jabón artesanal"],
    descripcion: "Jabón de avena de espuma suave, pensado para la limpieza diaria de la piel.",
    ritual: "Úsalo en el baño de la mañana, con agua tibia.",
    destaca: "El catálogo lo describe como un ritual de limpieza para piel normal o grasa.",
    variantes: [{ tamano: "70 g", precio: 50 }],
  },
  {
    id: "jabon-tepezcohuite-melipona",
    nombre: "Jabón de tepezcohuite con miel de abejas meliponas",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Tepezcohuite y miel melipona",
    ingredientes: ["Corteza de tepezcohuite molida", "Miel de abejas meliponas", "Base de jabón artesanal"],
    descripcion: "Corteza de tepezcohuite molida y miel de abejas meliponas en una barra de 100 g.",
    ritual: "Masajea el rostro con espuma y enjuaga con agua fresca.",
    destaca: "El catálogo destaca la combinación de tepezcohuite con miel de abejas meliponas para la limpieza del rostro.",
    variantes: [{ tamano: "100 g", precio: 120 }],
  },
  {
    id: "jabon-miel-melipona-madera",
    nombre: "Jabón de miel de abejas meliponas, aroma a madera",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Miel melipona",
    ingredientes: ["Miel de abejas meliponas", "Aroma de madera", "Base de jabón artesanal"],
    descripcion: "Jabón con miel de abejas meliponas y un aroma cálido a madera.",
    ritual: "Para el baño de la tarde, cuando el día pide despedirse.",
    destaca: "El catálogo destaca la miel de abejas meliponas y su aroma cálido a madera.",
    variantes: [{ tamano: "100 g", precio: 60 }],
  },
  {
    id: "jabon-neem-coco",
    nombre: "Jabón de neem base coco",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Neem y aceite de coco",
    ingredientes: ["Hojas de neem", "Aceite de coco", "Base de jabón artesanal"],
    descripcion: "Hojas de neem sobre base de aceite de coco, en barra artesanal de 70 g.",
    ritual: "Enjabona, deja actuar unos segundos y enjuaga.",
    destaca: "El catálogo destaca su suavidad para piel seca.",
    variantes: [{ tamano: "70 g", precio: 70 }],
  },
  {
    id: "jabon-curcuma-coco-melipona",
    nombre: "Jabón cúrcuma coco con miel de abejas meliponas",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Cúrcuma, coco y miel melipona",
    ingredientes: ["Cúrcuma", "Aceite de coco", "Miel de abejas meliponas"],
    descripcion: "Cúrcuma y coco combinados con miel de abejas meliponas en una barra de 90 g.",
    ritual: "Espuma densa sobre la piel húmeda, mañana o noche.",
    destaca: "El catálogo lo asocia con una apariencia más luminosa y uniforme de la piel.",
    variantes: [{ tamano: "90 g", precio: 90 }],
  },
  {
    id: "jabon-fresa-champagne",
    nombre: "Jabón fresa champagne, base leche de cabra",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Leche de cabra y fresa",
    ingredientes: ["Leche de cabra", "Aroma de fresa champagne", "Base de jabón artesanal"],
    descripcion: "Barra cremosa con base de leche de cabra y aroma a fresa champagne, en tres tamaños.",
    ritual: "Un regalo pequeño para el lavabo o el neceser de viaje.",
    destaca: "El catálogo lo relaciona con textura y vitalidad de la piel.",
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
    marca: "XUUJÁAB",
    ingrediente: "Sábila y menta",
    ingredientes: ["Sábila", "Menta", "Base de jabón artesanal"],
    descripcion: "Jabón fresco de sábila y menta en barra de 80 g.",
    ritual: "Ideal después del sol o del ejercicio.",
    destaca: "El catálogo destaca su sensación fresca.",
    variantes: [{ tamano: "80 g", precio: 30 }],
  },
  {
    id: "kit-cartera",
    nombre: "Kit cartera",
    categoria: "Kits",
    marca: "XUUJÁAB",
    ingrediente: "Selección de viaje",
    ingredientes: ["Piezas de tamaño de viaje del taller XUUJÁAB"],
    descripcion: "Kit compacto pensado para llevar en la cartera o el bolso.",
    ritual: "Para tener el ritual a la mano fuera de casa.",
    destaca: "El catálogo lo presenta como el kit compacto para llevar en la cartera o el bolso.",
    variantes: [{ tamano: "Kit", precio: 210 }],
  },
  {
    id: "kit-flor",
    nombre: "Kit flor",
    categoria: "Kits",
    marca: "XUUJÁAB",
    ingrediente: "Selección floral",
    ingredientes: ["Selección floral del taller XUUJÁAB"],
    descripcion: "Kit flor, una selección pequeña lista para regalar.",
    ritual: "El detalle breve: alcanza para empezar el ritual.",
    destaca: "El catálogo lo presenta como una selección pequeña lista para regalar.",
    variantes: [{ tamano: "Kit", precio: 90 }],
  },
  {
    id: "crema-rch",
    nombre: "Crema regeneradora celular hidratante RCH",
    categoria: "Cremas",
    marca: "XUUJÁAB",
    ingrediente: "Cera y miel melipona",
    ingredientes: ["Cera de abeja", "Miel de abejas meliponas", "Aceites vegetales"],
    descripcion: "Crema hidratante de uso diario, disponible en cuatro tamaños.",
    ritual: "Una nuez sobre la piel apenas húmeda, mañana y noche.",
    destaca: "El catálogo la describe como crema de hidratación y cuidado de la piel frente a factores cotidianos.",
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
    marca: "XUUJÁAB",
    ingrediente: "Cera de abeja",
    ingredientes: ["Cera de abeja", "Aceites vegetales"],
    descripcion: "Crema reafirmante en presentación de 50 g.",
    ritual: "Aplica con masaje ascendente sobre la piel limpia.",
    destaca: "El catálogo indica uso nocturno en rostro y cuello: aplicar antes de dormir.",
    variantes: [{ tamano: "50 g", precio: 280 }],
  },
  {
    id: "miel-abejas-meliponas",
    nombre: "Miel de abejas meliponas",
    categoria: "Mieles y elixires",
    marca: "XUUMIEL",
    ingrediente: "Miel melipona pura",
    ingredientes: ["Miel pura de abejas meliponas (Melipona beecheii)"],
    descripcion: "Miel pura de abejas meliponas de Quintana Roo, en seis presentaciones.",
    ritual: "Una cucharadita lenta, sin prisa, al empezar la mañana.",
    destaca: "El catálogo describe su origen en el monte de Quintana Roo, su producción estacional y hace referencia a sus compuestos bioactivos y actividad antioxidante.",
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
    marca: "XUUMIEL",
    ingrediente: "Miel melipona y cacao",
    ingredientes: ["Miel de abejas meliponas", "Cacao"],
    descripcion: "Elixir de miel de abejas meliponas con cacao, en dos presentaciones.",
    ritual: "Unas gotas bajo la lengua o disueltas en agua tibia.",
    destaca: "El catálogo describe su perfil de ingredientes y hace referencia a compuestos antioxidantes.",
    variantes: [
      { tamano: "30 ml", precio: 260 },
      { tamano: "50 ml", precio: 340 },
    ],
  },
];
