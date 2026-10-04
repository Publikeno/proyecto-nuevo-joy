// Copia las imágenes/videos guardados en Lovable (archivos *.asset.json) dentro
// de la carpeta del build, para que también funcionen en GitHub Pages.
// Uso: node scripts/copy-lovable-assets.mjs [carpetaDestino]
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";

const OUT_DIR = process.argv[2] ?? "dist/client";
const SOURCE_ORIGIN =
  process.env.LOVABLE_ASSETS_ORIGIN ??
  "https://project--1fec5602-da1a-43fd-b950-2b7da1137375.lovable.app";

async function findAssetPointers(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await findAssetPointers(full)));
    else if (entry.name.endsWith(".asset.json")) files.push(full);
  }
  return files;
}

const pointers = await findAssetPointers("src");
let failed = 0;
for (const pointer of pointers) {
  const { url } = JSON.parse(await readFile(pointer, "utf8"));
  if (!url?.startsWith("/__l5e/")) continue;
  const res = await fetch(SOURCE_ORIGIN + url);
  if (!res.ok) {
    console.error(`No se pudo descargar ${url} (${res.status})`);
    failed++;
    continue;
  }
  const target = join(OUT_DIR, url);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(await res.arrayBuffer()));
  console.log(`Copiado ${url}`);
}

if (failed > 0) {
  console.error(`${failed} archivo(s) no se pudieron copiar.`);
  process.exit(1);
}
