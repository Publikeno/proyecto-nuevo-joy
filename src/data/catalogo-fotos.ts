import type { Categoria } from "./catalogo";

// Photo-only entries are intentionally separate from purchasable products.
export type FotoCatalogo = {
  id: string;
  nombre: string;
  categoria: Categoria;
  archivo: string;
  estado: string;
};

export const fotosCatalogo: FotoCatalogo[] = [
  { id: "IMG_8092", nombre: "Jabón de panal y abeja", categoria: "Jabones", archivo: "cjXqhYGENXHnNSSq.png", estado: "Diseño recibido" },
  { id: "IMG_8094", nombre: "Jabón artesanal rosa", categoria: "Jabones", archivo: "XncbeftxROyqSnSU.png", estado: "Variante por confirmar" },
  { id: "IMG_8115", nombre: "Jabón de lavanda y miel", categoria: "Jabones", archivo: "JqqJWmQbuLLeDbPG.png", estado: "Producto nuevo" },
  { id: "IMG_8167", nombre: "Cacao en polvo", categoria: "Mieles y elixires", archivo: "CgeGQYnmuiRTHmeR.png", estado: "Producto identificado" },
  { id: "IMG_8169", nombre: "Hidromiel de la Selva", categoria: "Mieles y elixires", archivo: "MCntVvPuNkpHMABQ.png", estado: "Producto nuevo" },
  { id: "abejajabon", nombre: "Jabón diseño abeja", categoria: "Jabones", archivo: "tdPQCvHhwktiTsvU.png", estado: "Producto identificado" },
  { id: "jabondemiel", nombre: "Jabón de neem y miel", categoria: "Jabones", archivo: "tHPfKyyWZZqrrwZs.png", estado: "Producto identificado" },
];