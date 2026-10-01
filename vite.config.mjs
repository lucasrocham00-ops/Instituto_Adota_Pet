import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".",

  server: {
    fs: {
      allow: [".."]
    }
  },

  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "HTML/index.html"),
        projetos: resolve(__dirname, "HTML/projetos.html"),
        cadastro: resolve(__dirname, "HTML/cadastro.html")
      }
    },
    outDir: "dist",
    emptyOutDir: true
  }
});