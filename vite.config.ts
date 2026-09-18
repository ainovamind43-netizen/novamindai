import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  resolve: {
    // Vite 8 resolves the tsconfig "paths" ("@/*") natively.
    tsconfigPaths: true,
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    // One copy of React, the router and react-query, or hooks and context
    // resolve to different module instances ("invalid hook call").
    dedupe: [
      "react",
      "react-dom",
      "@tanstack/react-router",
      "@tanstack/router-core",
      "@tanstack/react-query",
    ],
  },
  server: {
    port: 8080,
    host: true,
    strictPort: false,
  },
  preview: {
    port: 8080,
    host: true,
  },
  plugins: [
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts,
      // our SSR error wrapper. nitro/vite builds from this.
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
    // Self-hosting target. Nitro's default is a Cloudflare worker, which
    // cannot run on Hostinger; node-server emits a plain Node HTTP server
    // and output.dir puts the deployable bundle in ./dist.
    nitro({
      preset: "node-server",
      output: { dir: "dist" },
    }),
  ],
});
