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
    descripcion: "Exfoliante, suavizante y estabiliza el tono de piel\nAstringente para piel normal y grasa",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "" ,
    variantes: [{ tamano: "70 g", precio: 77 }],
  },
  {
    id: "jabon-avena",
    nombre: "Jabón de avena",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Avena",
    ingredientes: ["Avena"],
    descripcion: "Y más beneficios",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "" ,
    variantes: [{ tamano: "70 g", precio: 37 }],
  },
  {
    id: "jabon-tepezcohuite-melipona",
    nombre: "Jabón de tepezcohuite con miel de abejas meliponas",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Tepezcohuite y miel melipona",
    ingredientes: ["Tepezcohuite", "Miel de abejas meliponas"],
    descripcion:
      "Cicatriza y seca acné severo, acelera la regeneración  celular",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "" ,
    variantes: [{ tamano: "100 g", precio: 90 }],
  },
  {
    id: "jabon-miel-melipona-madera",
    nombre: "Jabón de miel de abejas meliponas, aroma a madera",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Miel de abejas meliponas",
    ingredientes: ["Miel de abejas meliponas", "Aroma a madera"],
    descripcion: "",
    ritual: "No especificado en la ficha del catálogo.",
    destaca: "" ,
    variantes: [{ tamano: "100 g", precio: 60 }],
  },
  {
    id: "jabon-neem-coco",
    nombre: "Jabón de neem base coco",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Neem y base de coco",
    ingredientes: ["Neem", "Base de coco"],
    descripcion: "Para piel seca, suaviza la piel\nFungicida, mata las bacterias que se presentan en granos en la piel. Para aliviar de chechén y sarna",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "" ,
    variantes: [{ tamano: "70 g", precio: 77 }],
  },
  {
    id: "jabon-curcuma-coco-melipona",
    nombre: "Jabón cúrcuma, coco y miel de abejas meliponas",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Cúrcuma, coco y miel melipona",
    ingredientes: ["Cúrcuma", "Coco", "Miel de abejas meliponas"],
    descripcion: "ayuda a curar el acné\nCorrige la piel opaca\nReduce las ojeras\nProtege contra los daños ambientales\nEn algunos casos ayuda a quitar psoriasis y al eccema\nEvita el envejecimiento prematuro\nEficaz para combatir la hiperpigmentación en la piel, ya que inhibe la producción de melanina, el pigmento responsable de la aparición de las temidas manchas marrones",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "" ,
    variantes: [{ tamano: "90 g", precio: 70 }],
  },
  {
    id: "jabon-fresa-champagne",
    nombre: "Jabón fresa champagne, base de leche de cabra",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Leche de cabra, fresa champagne y miel melipona",
    ingredientes: ["Leche de cabra", "Miel de abejas meliponas", "Fresa champagne"],
    descripcion: "piel madura a normal, restaura la vitalidad de la piel. Fresa champagne. Activa y eleva la energía vital\nActiva la energía dormida / revitaliza la textura de la piel",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "" ,
    variantes: [
      { tamano: "20 g · tamaño viaje", precio: 20 },
      { tamano: "70 g", precio: 60 },
      { tamano: "90 g", precio: 77 },
    ],
  },
  {
    id: "jabon-sabila-menta",
    nombre: "Jabón de sábila y menta",
    categoria: "Jabones",
    marca: "XUUJÁAB",
    ingrediente: "Sábila y menta",
    ingredientes: ["Sábila", "Menta"],
    descripcion: "Antioxidante, contribuye a eliminar manchas de la piel y suaviza",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "" ,
    variantes: [{ tamano: "80 g", precio: 50 }],
  },
  {
    id: "kit-cartera",
    nombre: "Kit cartera",
    categoria: "Kits",
    marca: "XUUJÁAB",
    ingrediente: "Jabón de tepezcohuite 100 g y miel Melipona Beecheii en gotero de 10 ml",
    ingredientes: ["Jabón de tepezcohuite 100 g", "Miel Melipona Beecheii 10 ml", "Cartera de yute"],
    descripcion:
      "Kit de cartera en yute. Contiene 1 jabón de 100 grs de tepezcohuite y 1 frasco gotero de miel Melipona Beecheii de 10 mls.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca: "" ,
    componentes: [
      "Jabón de tepezcohuite, 100 g",
      "Frasco gotero de miel Melipona Beecheii, 10 ml",
      "Cartera artesanal de yute",
    ],
    variantes: [{ tamano: "Kit cartera", precio: 210 }],
  },
  {
    id: "kit-flor",
    nombre: "Kit flor",
    categoria: "Kits",
    marca: "XUUJÁAB",
    ingrediente: "Estuche en madera de cedro grabada con jabón y miel Melipona Beecheii",
    ingredientes: ["Estuche en madera de cedro grabada", "Jabón artesanal", "Miel Melipona Beecheii"],
    descripcion: "Estuche en madera de cedro grabada con jabón y frasco gotero de Miel Meliponas 10 mls.",
    ritual: "No especificado en la ficha del catálogo.",
    destaca: "" ,
    componentes: [
      "Estuche en madera de cedro grabada",
      "Jabón artesanal",
      "Frasco gotero de Miel Meliponas, 10 ml",
    ],
    variantes: [{ tamano: "Kit flor", precio: 320 }],
  },
  {
    id: "crema-rch",
    nombre: "RCH crema regeneradora celular hidratante para rostro y cuello",
    categoria: "Cremas",
    marca: "XUUJÁAB",
    ingrediente: "Semilla de sésamo, miel melipona y colágeno",
    ingredientes: ["Semilla de sésamo", "Miel melipona", "Colágeno"],
    descripcion:
      "Los beneficios en tu piel son  protegerla de los radicales libres que pueden dañarla y causar envejecimiento prematuro al. exponerte en tu vida diaria en forma de polución del aire, humo de cigarrillos y daños provocados al exponerse por largo tiempo ante los rayos UV del sol, la contaminación o el frío. Previene, disminuye arrugas, líneas de expresión,  estrías, con el uso constante. Contribuye a que la piel se mantenga hidratada, y regenere células de manera rápida y eficaz con notables resultados. Es útil como protector solar, base de maquillaje, incluso para limpiar del maquillaje, en piel “quemada” de sol, incluso aliviar quemaduras con fuego y aceite caliente. Nota recomendale potenciar con el uso de jabón de arroz, para unificar el color de piel del rostro y cuello.\nLos beneficios en tu piel son  protegerla de los radicales libres que pueden dañarla y causar envejecimiento prematuro al. exponerte en tu vida diaria en forma de polución del aire, humo de cigarrillos y daños provocados al exponerse por largo tiempo ante los rayos UV del sol, la contaminación o el frío. Previene, disminuye arrugas, líneas de expresión,  estrías, con el uso constante. Contribuye a que la piel se mantenga hidratada, y regenere células de manera rápida y eficaz con notables resultados. Es útil para sellar los poros al rasurar, eliminando sangrado e irritación.\nAntioxidante, útil para después de afeitar, quemadas por exposición al sol",
    ritual:
      "Aplicar en rostro y cuello. La ficha también menciona su uso después de afeitar para sellar poros y aliviar sangrado e irritación.",
    destaca:
      "" ,
    variantes: [
      { tamano: "30 g · presentación 1", precio: 170 },
      { tamano: "60 g", precio: 320 },
      { tamano: "120 g", precio: 590 },
      { tamano: "240 g", precio: 1170 },
      { tamano: "30 g · presentación 2", precio: 120 },
      { tamano: "50 g", precio: 220 },
      { tamano: "50 g · con dispensador", precio: 240 },
    ],
  },
  {
    id: "crema-rch-caballero",
    nombre: "Crema Regeneradora Celular para Caballero – Aroma Madera (RCH)",
    categoria: "Cremas",
    marca: "XUUJÁAB",
    ingrediente: "Semilla de sésamo, miel melipona y colágeno",
    ingredientes: ["Semilla de sésamo", "Miel melipona", "Colágeno", "Aroma a madera fina"],
    descripcion:
      "Crema regeneradora masculina elaborada artesanalmente para las necesidades de la piel del hombre, con un delicioso aroma a madera fina.\nEspecial after-shave: sella los poros inmediatamente después del rasurado, eliminando la irritación y el sangrado.\nEscudo antioxidante: calma las quemaduras por exposición al sol y protege contra el desgaste del aire y la contaminación.\nNutrición sin grasa: textura ligera que hidrata a profundidad sin dejar sensación mantecosa.",
    ritual:
      "Aplicar como after-shave inmediatamente después del rasurado para sellar los poros; usar también en rostro y cuello tras la exposición al sol.",
    destaca:
      "Aroma a madera fina · especial after-shave para piel de caballero",
    variantes: [
      { tamano: "30 g · envase básico", precio: 196 },
      { tamano: "50 g · envase mediano", precio: 380 },
    ],
  },
  {
    id: "crema-rf",
    nombre: "RF crema reafirmante para rostro y cuello",
    categoria: "Cremas",
    marca: "XUUJÁAB",
    ingrediente: "Miel de abejas meliponas Beecheii, romero y vitamina E",
    ingredientes: ["Miel de abejas Meliponas Beecheii", "Romero", "Vitamina E"],
    descripcion: "La crema REAFIRMANTE XUUJAB es creada por la  acción y efectividad de la Miel de las abejas Meliponas Beeheii en la piel,  potenciada con  el Romero , así como la Vitamina E están ya comprobados. Beneficios: son regenerar la células dañadas de manera acelerada, que logra reparar la piel afectada por diversos factores.\nInstrucciones de uso:     Aplicar por ls noches 15 minutos antes de dormir para que la piel absorba los nutrientes al máximo.\nRecomendaciones alternas: evitar el humo de cigarrillos. Consuma agua suero (agua gotas de limón y pizca de sal marina), consuma frutas y verduras, de preferencia crudas...Alternar con la crema de dia HIDRATANTE XUUMIEL y COLAGENO + SONREIR A LA VIDA",
    ritual: "Aplicar por las noches 15 minutos antes de dormir.",
    destaca:
      "" ,
    variantes: [{ tamano: "50 g", precio: 290 }],
  },
  {
    id: "miel-abejas-meliponas",
    nombre: "Miel de abejas meliponas Beecheii",
    categoria: "Mieles y elixires",
    marca: "XUUMIEL",
    ingrediente: "Miel de Melipona beecheii",
    ingredientes: ["Miel de Melipona beecheii"],
    descripcion:
      "Salud Ocular: Utilizada tradicionalmente en gotas para tratar \nvista cansada, conjuntivitis, carnosidades (pterigión) y cataratas.\nAfecciones Respiratorias: Ayuda a aliviar la garganta irritada, tos y asma.\nProblemas Digestivos: Auxiliar en el tratamiento de úlceras gástricas y gastritis.\nCicatrización y Piel: Útil para tratar heridas, quemaduras, manchas en la piel y picaduras, actuando como cicatrizante y regenerador celular.\nFortalecimiento Inmune: Su consumo regular fortalece las defensas debido a su alta actividad biológica.",
    ritual:
      "La ficha la presenta como alimento natural; el catálogo no especifica una dosis de uso.",
    destaca:
      "" ,
    variantes: [
      { tamano: "10 ml", precio: 130 },
      { tamano: "15 ml", precio: 180 },
      { tamano: "20 ml", precio: 230 },
      { tamano: "30 ml", precio: 320 },
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
    descripcion: "La gran cantidad de antioxidantes y polifenoles, sumadoEl cacao puro (100% desgrasado, sin azúcar) es un superalimento rico en antioxidantes (flavonoides), minerales como magnesio, hierro y zinc, y compuestos estimulantes como la teobromina. Mejora la salud cardiovascular al aumentar la elasticidad vascular, reduce la inflamación, mejora el estado de ánimo y aporta energía sostenida",
    ritual: "No especificado en la ficha del catálogo.",
    destaca:
      "" ,
    variantes: [
      { tamano: "30 ml", precio: 210 },
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
    descripcion: "La función del propóleo es encapsular virus y bacterias para proteger, en este caso células. El polen como fuente de energía, la base donde las abejas producen la miel, mas la composición de la miel   fuente de energía rápida, y remedio tradicional para aliviar la tos y el dolor de garganta gracias a sus propiedades antisépticas, antibacterianas y antioxidantes. También es utilizada para mejorar la digestión, cicatrizar heridas",
    ritual: "La ficha lo presenta como remedio tradicional; no especifica una dosis de uso.",
    destaca:
      "" ,
    variantes: [{ tamano: "200 g · envase de cristal oscuro", precio: 150 }],
  },
  {
    id: "propoleo-eucalipto",
    nombre: "Propóleo con eucalipto",
    categoria: "Mieles y elixires",
    marca: "XUUMIEL",
    ingrediente: "Propóleo con eucalipto",
    ingredientes: ["Propóleo", "Eucalipto"],
    descripcion: "",
    ritual: "No especificado en la ficha del catálogo.",
    destaca: "" ,
    variantes: [{ tamano: "25 ml", precio: 180 }],
  },
  {
    id: "shampoo-mascarilla-miel-romero-canela",
    nombre: "Shampoo mascarilla para cabello de miel, romero y canela",
    categoria: "Cuidado personal",
    marca: "XUUJÁAB",
    ingrediente: "Miel, romero y canela",
    ingredientes: ["Miel", "Romero", "Canela"],
    descripcion: "ESTIMULA EL CRECIMIENTO \nDEL CABELLO  Y LO FORTALECE\nSHAMPOO MASCARILLA PARA CABELLO \nDE MIEL, ROMERO Y  CANELA. RESTAURA, REPARA, SE OBTIENE SUAVIDAD NATURAL, BRILLO",
    ritual: "Usar como shampoo mascarilla. La ficha no especifica una frecuencia de aplicación.",
    destaca:
      "" ,
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
    descripcion: "REPELENTE DE ZANCUDOS Y MOSCOS, TÁBANOS",
    ritual: "No especificado en la ficha del catálogo.",
    destaca: "" ,
    variantes: [{ tamano: "60 ml", precio: 90 }],
  },
  {
    id: "repelente-liquido-hidroalcoholico",
    nombre: "Repelente líquido hidroalcohólico",
    categoria: "Cuidado personal",
    marca: "XUUJÁAB",
    ingrediente: "Fórmula líquida hidroalcohólica",
    ingredientes: ["No especificados en la ficha del catálogo"],
    descripcion: "REPELENTE DE ZANCUDOS Y MOSCOS, TÁBANOS",
    ritual: "No especificado en la ficha del catálogo.",
    destaca: "" ,
    variantes: [{ tamano: "60 ml", precio: 70 }],
  },
];
