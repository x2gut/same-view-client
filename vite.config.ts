import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//@ts-ignore
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "src/shared"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@features": path.resolve(__dirname, "src/features"),
      "@app": path.resolve(__dirname, "src/app"),
      "@": path.resolve(__dirname, "src"),
    },
  },
});
