import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  server: {
    host: true,
    port: 31348
  },
  clearScreen: false,
  build: {
    minify: false,
  },
  plugins: [react(), viteSingleFile({ useRecommendedBuildConfig: true })],
});

