import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  base: "/RNA---Alg-bioinspirados-2026-S1/",
  build: {
    outDir: resolve(__dirname, "../docs"),
    emptyOutDir: false,
  },
});
