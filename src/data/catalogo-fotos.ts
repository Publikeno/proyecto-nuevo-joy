import type { Categoria } from "./catalogo";
import elixirCacaoNueva from "@/assets/elixir-cacao-nueva.jpg.asset.json";
import jabonPanalNueva from "@/assets/jabon-panal-abeja-nueva.png.asset.json";
import jabonRosaNueva from "@/assets/jabon-rosa-nueva.png.asset.json";
import jabonLavandaNueva from "@/assets/jabon-lavanda-nueva.png.asset.json";
import jabonNeemNueva from "@/assets/jabon-neem-nueva.png.asset.json";
import jabonDisenoAbejaNueva from "@/assets/jabon-diseno-abeja-nueva.png.asset.json";
import hidromielNueva from "@/assets/hidromiel-nueva.png.asset.json";

// Photo-only entries are intentionally separate from purchasable products.
export type FotoCatalogo = {
  id: string;
  nombre: string;
  categoria: Categoria;
  archivo: string;
  estado: string;
  /** URL directa que sustituye a `archivo` cuando la foto vive en el CDN del proyecto. */
  url?: string;
};

export const fotosCatalogo: FotoCatalogo[] = [
  { id: "IMG_8092", nombre: "Jabón de panal y abeja", categoria: "Jabones", archivo: "cjXqhYGENXHnNSSq.png", estado: "Diseño recibido", url: jabonPanalNueva.url },
  { id: "IMG_8094", nombre: "Jabón artesanal rosa", categoria: "Jabones", archivo: "XncbeftxROyqSnSU.png", estado: "Variante por confirmar", url: jabonRosaNueva.url },
  { id: "IMG_8115", nombre: "Jabón de lavanda y miel", categoria: "Jabones", archivo: "JqqJWmQbuLLeDbPG.png", estado: "Producto nuevo", url: jabonLavandaNueva.url },
  {
    id: "IMG_8167",
    nombre: "Cacao en polvo",
    categoria: "Mieles y elixires",
    archivo: "CgeGQYnmuiRTHmeR.png",
    estado: "Producto identificado",
    url: elixirCacaoNueva.url,
  },
  { id: "IMG_8169", nombre: "Hidromiel de la Selva", categoria: "Mieles y elixires", archivo: "MCntVvPuNkpHMABQ.png", estado: "Producto nuevo", url: hidromielNueva.url },
  { id: "abejajabon", nombre: "Jabón diseño abeja", categoria: "Jabones", archivo: "tdPQCvHhwktiTsvU.png", estado: "Producto identificado", url: jabonDisenoAbejaNueva.url },
  { id: "jabondemiel", nombre: "Jabón de neem y miel", categoria: "Jabones", archivo: "tHPfKyyWZZqrrwZs.png", estado: "Producto identificado", url: jabonNeemNueva.url },
];