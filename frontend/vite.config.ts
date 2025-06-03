import { defineConfig } from "vite.js";
import react from "@vitejs/plugin-react.js";
import tailwindcss from "@tailwindcss/vite.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
