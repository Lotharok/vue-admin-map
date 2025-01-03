/* eslint-disable no-undef */

import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";

export default (opts: { mode: string }) => {
   process.env = { ...process.env, ...loadEnv(opts.mode, process.cwd()) };
   const isDebug: boolean = process.env.VITE_IS_DEBUG === "true";
   return defineConfig({
      plugins: [vue()],
      resolve: {
         alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
         },
      },
      build: {
         minify: !isDebug,
         rollupOptions: {
            output: {
               chunkFileNames: "[name]-[hash].js",
               manualChunks: (id) => {
                  if (id.includes("/mocks/")) {
                     return "browser";
                  }
                  if (id.includes("/leaflet/") || id.includes("/vue-leaflet/")) {
                     return "vendor-map";
                  }
                  if (
                     id.includes("/vue/") ||
                     id.includes("/vue-router/") ||
                     id.includes("/i18next/") ||
                     id.includes("/pinia/") ||
                     id.includes("/jose/") ||
                     id.includes("/swiper/")
                  ) {
                     return "vendor";
                  }
               },
               entryFileNames: "js-admin-transfers.js",
            },
         },
      },
   });
};
