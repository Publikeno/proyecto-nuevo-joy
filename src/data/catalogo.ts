export type Categoria = "Jabones" | "Cremas" | "Mieles y elixires" | "Kits";

export type Producto = {
  id: string;
  nombre: string;
  categoria: Categoria;
  precio: number;
  tamano: string;
  ingrediente: string;
  descripcion: string;
  ritual: string;
};

export const categorias: Categoria[] = ["Jabones", "Cremas", "Mieles y elixires", "Kits"];

export const productos: Producto[] = [
  {
    id: "jabon-miel-avena",
    nombre: "Jabón de miel y avena",
    categoria: "Jabones",
    precio: 120,
    tamano: "110 g",
    ingrediente: "Miel melipona",
    descripcion:
      "Barra curada en frío durante seis semanas, con avena molida en metate para una espuma densa y suave.",
    ritual: "Frota entre las manos húmedas y masajea el rostro en círculos lentos.",
  },
  {
    id: "jabon-carbon-copal",
    nombre: "Jabón de carbón y copal",
    categoria: "Jabones",
    precio: 135,
    tamano: "110 g",
    ingrediente: "Copal blanco",
    descripcion:
      "Carbón activado de madera local y resina de copal recolectada en la selva maya.",
    ritual: "Ideal para el baño de la tarde, cuando el día pide despedirse.",
  },
  {
    id: "jabon-cacao",
    nombre: "Jabón de cacao y cera",
    categoria: "Jabones",
    precio: 130,
    tamano: "110 g",
    ingrediente: "Manteca de cacao",
    descripcion: "Manteca de cacao sin refinar y cera de abeja melipona en proporción 2:1.",
    ritual: "Para pieles que buscan una limpieza sin tirones.",
  },
  {
    id: "crema-cera-flor",
    nombre: "Crema de cera y flor de naranjo",
    categoria: "Cremas",
    precio: 290,
    tamano: "60 ml",
    ingrediente: "Cera de abeja",
    descripcion:
      "Emulsión ligera batida a mano, con hidrolato de flor de naranjo y aceite de coco de la península.",
    ritual: "Una nuez sobre la piel apenas húmeda, mañana y noche.",
  },
  {
    id: "crema-manos-chaka",
    nombre: "Bálsamo de manos chaká",
    categoria: "Cremas",
    precio: 210,
    tamano: "40 ml",
    ingrediente: "Corteza de chaká",
    descripcion: "Bálsamo denso con infusión de corteza de chaká y aceite de ajonjolí.",
    ritual: "Después de lavar los platos o de un día de taller.",
  },
  {
    id: "crema-corporal-vainilla",
    nombre: "Crema corporal de vainilla maya",
    categoria: "Cremas",
    precio: 340,
    tamano: "120 ml",
    ingrediente: "Vainilla planifolia",
    descripcion: "Vaina de vainilla macerada tres meses en aceite de almendra dulce.",
    ritual: "Extiende con las palmas tibias desde los tobillos hacia arriba.",
  },
  {
    id: "miel-melipona",
    nombre: "Miel melipona pura",
    categoria: "Mieles y elixires",
    precio: 480,
    tamano: "125 ml",
    ingrediente: "Melipona beecheii",
    descripcion:
      "Cosecha de temporada en jobones de tronco, extraída gota a gota sin prensar el panal.",
    ritual: "Una cucharadita lenta, sin prisa, al empezar la mañana.",
  },
  {
    id: "elixir-propoleo",
    nombre: "Elixir de propóleo y cítricos",
    categoria: "Mieles y elixires",
    precio: 260,
    tamano: "30 ml",
    ingrediente: "Propóleo melipona",
    descripcion: "Extracto de propóleo con cáscara de limón criollo y miel de la misma colmena.",
    ritual: "Unas gotas bajo la lengua o disueltas en agua tibia.",
  },
  {
    id: "miel-monte",
    nombre: "Miel de monte florida",
    categoria: "Mieles y elixires",
    precio: 320,
    tamano: "250 ml",
    ingrediente: "Floración de tajonal",
    descripcion: "Miel ámbar clara de floración de tajonal y dzidzilché, filtrada solo por gravedad.",
    ritual: "Para el pan de la tarde y el café de olla.",
  },
  {
    id: "kit-ritual-diario",
    nombre: "Kit ritual diario",
    categoria: "Kits",
    precio: 690,
    tamano: "3 piezas",
    ingrediente: "Miel, cera y avena",
    descripcion: "Jabón de miel y avena, crema de cera y elixir de propóleo en caja de cartón kraft.",
    ritual: "Pensado para empezar y cerrar el día con el mismo aroma.",
  },
  {
    id: "kit-taller",
    nombre: "Kit del taller",
    categoria: "Kits",
    precio: 980,
    tamano: "5 piezas",
    ingrediente: "Selección completa",
    descripcion: "Los tres jabones, el bálsamo de manos y un frasco de miel melipona pura.",
    ritual: "El regalo largo: alcanza para varias estaciones.",
  },
  {
    id: "kit-mieles",
    nombre: "Kit de mieles",
    categoria: "Kits",
    precio: 760,
    tamano: "2 piezas + elixir",
    ingrediente: "Miel melipona y de monte",
    descripcion: "Miel melipona pura, miel de monte florida y elixir de propóleo con cuchara de madera.",
    ritual: "Para comparar dos mieles en la misma mesa.",
  },
];
