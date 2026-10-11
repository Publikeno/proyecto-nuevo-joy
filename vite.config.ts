// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv } from "vite";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Carga todas las variables de entorno en process.env SOLO para código de
// servidor (rutas API y server functions). No se exponen al cliente.
Object.assign(process.env, loadEnv("development", process.cwd(), ""));

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Generar HTML estático en el build (compatible con GitHub Pages).
    pages: [{ path: "/" }],
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
  vite: {
    resolve: {
      alias: {
        // React Email necesita entities v4.5.0; evita copias anidadas v7.
        "entities/lib/decode.js": path.resolve(dirname, "node_modules/entities/lib/decode.js"),
        "entities/lib/encode.js": path.resolve(dirname, "node_modules/entities/lib/encode.js"),
        entities: path.resolve(dirname, "node_modules/entities"),
      },
    },
  },
});
