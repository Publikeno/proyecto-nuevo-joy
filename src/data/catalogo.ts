export type Categoria = "Jabones" | "Cremas" | "Mieles y elixires" | "Kits" | "Cuidado personal";

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
  "Características, usos tradicionales y beneficios transcritos del catálogo PowerPoint. No sustituyen orientación médica; para irritaciones o afecciones de salud, consulta a un profesional.";

export const categorias: Categoria[] = [
  "Jabones",
  "Cremas",
  "Mieles y elixires",
  "Kits",
  "Cuidado personal",
];

export const productos: Producto[] = [
  {
    id: "jabon-arroz-coco",
    nombre: "Jabón de arroz base coco",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Arroz y base de coco",
    ingredientes: ["Arroz", "Coco"],
    descripcion: "Jabón de arroz con base de coco.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "Exfoliante y suavizante. Ayuda a estabilizar el tono de la piel y se presenta como astringente para piel normal y grasa.",
    variantes: [{ tamano: "70 g", precio: 70 }],
  },
  {
    id: "jabon-avena",
    nombre: "Jabón de avena",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Avena",
    ingredientes: ["Avena"],
    descripcion: "Jabón de avena en barra de 70 g.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "La ficha del catálogo identifica el producto y su presentación; no añade una descripción de beneficios independiente.",
    variantes: [{ tamano: "70 g", precio: 50 }],
  },
  {
    id: "jabon-tepezcohuite-melipona",
    nombre: "Jabón de tepezcohuite con miel de abejas meliponas",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Tepezcohuite y miel melipona",
    ingredientes: ["Tepezcohuite", "Miel de abejas meliponas"],
    descripcion:
      "Jabón de tepezcohuite con miel de abejas meliponas, en presentación individual de 100 g.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "La ficha lo presenta como cicatrizante, útil para secar acné severo y para acelerar la regeneración celular.",
    variantes: [{ tamano: "100 g", precio: 120 }],
  },
  {
    id: "jabon-miel-melipona-madera",
    nombre: "Jabón de miel de abejas meliponas, aroma a madera",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Miel de abejas meliponas",
    ingredientes: ["Miel de abejas meliponas", "Aroma a madera"],
    descripcion: "Jabón elaborado con miel de abejas meliponas y aroma a madera.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca: "La ficha destaca su aroma refrescante a madera.",
    variantes: [{ tamano: "100 g", precio: 60 }],
  },
  {
    id: "jabon-neem-coco",
    nombre: "Jabón de neem base coco",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Neem y base de coco",
    ingredientes: ["Neem", "Base de coco"],
    descripcion: "Jabón de neem con base de coco, en barra de 70 g.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "La ficha lo presenta para piel seca. También lo describe como fungicida y como apoyo para aliviar chechén y sarna.",
    variantes: [{ tamano: "70 g", precio: 70 }],
  },
  {
    id: "jabon-curcuma-coco-melipona",
    nombre: "Jabón cúrcuma, coco y miel de abejas meliponas",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Cúrcuma, coco y miel melipona",
    ingredientes: ["Cúrcuma", "Coco", "Miel de abejas meliponas"],
    descripcion: "Jabón de cúrcuma, coco y miel de abejas meliponas en presentación de 90 g.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "La ficha lo presenta como apoyo para combatir la hiperpigmentación, ayudar a curar el acné, corregir la piel opaca, reducir ojeras y proteger frente a daños ambientales. También menciona apoyo en algunos casos de psoriasis y eccema y la prevención del envejecimiento prematuro.",
    variantes: [{ tamano: "90 g", precio: 90 }],
  },
  {
    id: "jabon-fresa-champagne",
    nombre: "Jabón fresa champagne, base de leche de cabra",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Leche de cabra, fresa champagne y miel melipona",
    ingredientes: ["Leche de cabra", "Miel de abejas meliponas", "Fresa champagne"],
    descripcion: "Jabón con base de leche de cabra, miel de abejas meliponas y fresa champagne.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "La ficha lo dirige a piel madura o normal, y lo presenta como revitalizante: activa y eleva la energía vital y ayuda a restaurar la vitalidad de la piel.",
    variantes: [
      { tamano: "20 g · tamaño viaje", precio: 20 },
      { tamano: "70 g", precio: 60 },
      { tamano: "90 g", precio: 90 },
    ],
  },
  {
    id: "jabon-sabila-menta",
    nombre: "Jabón de sábila y menta",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Sábila y menta",
    ingredientes: ["Sábila", "Menta"],
    descripcion: "Jabón de sábila y menta en presentación de 80 g.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "La ficha lo describe como antioxidante, útil para contribuir a eliminar manchas de la piel y suavizarla.",
    variantes: [{ tamano: "80 g", precio: 30 }],
  },
  {
    id: "kit-cartera",
    nombre: "Kit cartera",
    categoria: "Kits",
    marca: "XUUJÁAB",
    ingrediente: "Selección de viaje",
    ingredientes: ["Miel de bolsillo"],
    descripcion: "Kit de viaje con jabón, cartera de yute y miel de bolsillo.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca: "La cartera está hecha a mano en yute natural.",
    componentes: [
      "Jabón de tepezcohuite con miel de abejas meliponas, 100 g",
      "Cartera hecha a mano en yute natural",
      "Miel de bolsillo en gotero de 5 ml",
    ],
    variantes: [{ tamano: "Kit cartera", precio: 210 }],
  },
  {
    id: "kit-flor",
    nombre: "Kit flor",
    categoria: "Kits",
    marca: "XUUJÁAB",
    ingrediente: "Sábila, menta y miel de bolsillo",
    ingredientes: ["Sábila", "Menta", "Miel de bolsillo"],
    descripcion: "Kit flor con jabón de sábila, miel de bolsillo y envoltura de tela de algodón.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca: "La ficha destaca su formato de regalo y sus componentes artesanales.",
    componentes: [
      "Jabón de sábila, 80 g",
      "Miel de bolsillo en gotero de 5 ml",
      "Envoltura de tela de algodón",
    ],
    variantes: [{ tamano: "Kit flor", precio: 90 }],
  },
  {
    id: "crema-rch",
    nombre: "RCH crema regeneradora celular hidratante para rostro y cuello",
    categoria: "Cremas",
    marca: "XUUJÁAB",
    ingrediente: "Semilla de sésamo, miel melipona y colágeno",
    ingredientes: ["Semilla de sésamo", "Miel melipona", "Colágeno"],
    descripcion:
      "Crema regeneradora celular hidratante para rostro y cuello, elaborada con semilla de sésamo, miel melipona y colágeno.",
    ritual:
      "Aplicar en rostro y cuello. La ficha también menciona su uso después de afeitar para sellar poros y aliviar sangrado e irritación.",
    destaca:
      "Antioxidante. La ficha indica que protege contra radicales libres, polución, humo, rayos UV y frío; previene y disminuye arrugas, líneas de expresión y estrías; mantiene la piel hidratada y favorece la regeneración celular. También menciona su uso como protector solar, base y limpiador de maquillaje, y para aliviar quemaduras por sol, fuego o aceite caliente.",
    variantes: [
      { tamano: "30 g · presentación 1", precio: 170 },
      { tamano: "60 g", precio: 320 },
      { tamano: "120 g", precio: 590 },
      { tamano: "250 g", precio: 1100 },
      { tamano: "30 g · presentación 2", precio: 120 },
      { tamano: "50 g", precio: 220 },
      { tamano: "50 g · con dispensador", precio: 240 },
    ],
  },
  {
    id: "crema-rf",
    nombre: "RF crema reafirmante para rostro y cuello",
    categoria: "Cremas",
    marca: "XUUJÁAB",
    ingrediente: "Miel de abejas meliponas Beecheii, romero y vitamina E",
    ingredientes: ["Miel de abejas Meliponas Beecheii", "Romero", "Vitamina E"],
    descripcion: "Crema reafirmante para rostro y cuello, potenciada con romero y vitamina E.",
    ritual: "Aplicar por las noches 15 minutos antes de dormir.",
    destaca:
      "La ficha la presenta como reafirmante, con regeneración acelerada de células dañadas y reparación de la piel.",
    variantes: [{ tamano: "50 g", precio: 280 }],
  },
  {
    id: "miel-abejas-meliponas",
    nombre: "Miel de abejas meliponas Beecheii",
    categoria: "Mieles y elixires",
    marca: "XUUMIEL",
    ingrediente: "Miel de Melipona beecheii",
    ingredientes: ["Miel de Melipona beecheii"],
    descripcion:
      "Miel de la especie de abeja sin aguijón Melipona beecheii, originaria de la Península de Yucatán y de Quintana Roo.",
    ritual:
      "La ficha la presenta como alimento natural; el catálogo no especifica una dosis de uso.",
    destaca:
      "La ficha menciona compuestos bioactivos como proteínas, flavonoides y polifenoles, con alta actividad antioxidante. También describe usos tradicionales relacionados con cuidado ocular, garganta, tos, asma, úlceras gástricas, gastritis, heridas, quemaduras y manchas.",
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
    ingrediente: "Miel de abejas meliponas y cacao puro",
    ingredientes: ["Miel de abejas meliponas", "Cacao puro 100% desgrasado y sin azúcar"],
    descripcion: "Elixir de miel de abejas meliponas y cacao puro, en envases de cristal oscuro.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "La ficha menciona antioxidantes y polifenoles, así como minerales del cacao —magnesio, hierro y zinc— y teobromina. También describe aportes relacionados con elasticidad vascular, inflamación, estado de ánimo y energía sostenida.",
    variantes: [
      { tamano: "30 ml", precio: 260 },
      { tamano: "50 ml", precio: 340 },
    ],
  },
  {
    id: "multivitaminico-polen-propoleo-miel",
    nombre: "Multivitamínico de polen, propóleo y miel de abejas apidea",
    categoria: "Mieles y elixires",
    marca: "XUUMIEL",
    ingrediente: "Polen, propóleo y miel de abejas apidea",
    ingredientes: ["Polen", "Propóleo", "Miel de abejas apidea"],
    descripcion: "Multivitamínico en envase de cristal oscuro de 200 g.",
    ritual: "La ficha lo presenta como remedio tradicional; no especifica una dosis de uso.",
    destaca:
      "El catálogo describe el propóleo como encapsulador de virus y bacterias y al producto como fuente de energía rápida, con propiedades antisépticas, antibacterianas y antioxidantes. También menciona usos tradicionales para tos, dolor de garganta, digestión y cicatrización de heridas.",
    variantes: [{ tamano: "200 g · envase de cristal oscuro", precio: 180 }],
  },
  {
    id: "propoleo-eucalipto",
    nombre: "Propóleo con eucalipto",
    categoria: "Mieles y elixires",
    marca: "XUUMIEL",
    ingrediente: "Propóleo con eucalipto",
    ingredientes: ["Propóleo", "Eucalipto"],
    descripcion: "Propóleo con eucalipto en envase con atomizador.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca: "Presentación en atomizador para aplicación práctica.",
    variantes: [{ tamano: "25 ml", precio: 180 }],
  },
  {
    id: "shampoo-mascarilla-miel-romero-canela",
    nombre: "Shampoo mascarilla para cabello de miel, romero y canela",
    categoria: "Cuidado personal",
    marca: "XUUJÁAB",
    ingrediente: "Miel, romero y canela",
    ingredientes: ["Miel", "Romero", "Canela"],
    descripcion: "Shampoo mascarilla para cabello de miel, romero y canela.",
    ritual: "Usar como shampoo mascarilla. La ficha no especifica una frecuencia de aplicación.",
    destaca:
      "La ficha indica que estimula el crecimiento del cabello y lo fortalece; restaura, repara y aporta suavidad natural y brillo.",
    variantes: [
      { tamano: "125 ml", precio: 75 },
      { tamano: "250 ml", precio: 150 },
      { tamano: "500 ml", precio: 270 },
    ],
  },
  {
    id: "repelente-crema",
    nombre: "Repelente en crema",
    categoria: "Cuidado personal",
    marca: "XUUJÁAB",
    ingrediente: "Fórmula repelente en crema",
    ingredientes: ["No especificados en la ficha del catálogo"],
    descripcion: "Repelente en crema para zancudos, moscos y tábanos.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca: "Presentación en crema.",
    variantes: [{ tamano: "60 ml", precio: 90 }],
  },
  {
    id: "repelente-liquido-hidroalcoholico",
    nombre: "Repelente líquido hidroalcohólico",
    categoria: "Cuidado personal",
    marca: "XUUJÁAB",
    ingrediente: "Fórmula líquida hidroalcohólica",
    ingredientes: ["No especificados en la ficha del catálogo"],
    descripcion: "Repelente líquido hidroalcohólico para zancudos, moscos y tábanos.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca: "Presentación líquida hidroalcohólica.",
    variantes: [{ tamano: "60 ml", precio: 70 }],
  },
];
