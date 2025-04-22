import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import prerender from "vite-plugin-prerender";

// https://vite.dev/config/
export default defineConfig({
  base: "/mortgage/",
  plugins: [
    vue(),
    prerender({
      staticDir: "dist",
      routes: ["/"], // 想要 pre-render 的路徑
    }),
  ],
  server: {
    host: true,
    port: 5176,
  },
});
