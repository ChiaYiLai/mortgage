import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  base: "/mortgage/",
  plugins: [vue()],
  server: {
    host: true,
    port: 5176,
  },
});
