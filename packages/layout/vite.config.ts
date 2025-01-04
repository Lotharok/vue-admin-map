/* eslint-disable no-undef */
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import dts from "vite-plugin-dts";

export default (opts: { mode: string }) => {
   process.env = { ...process.env, ...loadEnv(opts.mode, process.cwd()) };
   const isDebug: boolean = process.env.VITE_IS_DEBUG === "true";
   return defineConfig({
      resolve: {
         alias: {
            "@": path.resolve(__dirname, "./src"),
         },
      },
      build: {
         minify: !isDebug,
         lib: {
            entry: path.resolve(__dirname, "src/main.ts"),
            formats: ["es"],
            name: "layout",
         },
         rollupOptions: {
            external: ["vue", "vue-router", "pinia", "i18next", "i18next-vue", "i18next-http-backend"],
            output: {
               globals: {
                  Vue: "vue",
               },
            },
         },
      },
      plugins: [vue(), dts()],
   });
};
