const { defineConfig } = require("vite");

export default defineConfig({
  base: "./",
  build: {
    minify: "terser",
  },
});
