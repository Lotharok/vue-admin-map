import { createRouter, createWebHistory } from "vue-router";

import { config } from "@/config";

import AboutView from "./components/AboutView.vue";
import HomeView from "./components/HomeView.vue";

const routes = [
   { path: "/transfers", component: HomeView },
   { path: "/transfers/about", component: AboutView },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

router.beforeEach((to) => {
   if (!to.matched.length) {
      const baseUrl = config.appUrl.replace(/\/$/, "");
      const fullPath = to.fullPath.replace(/^\//, "");
      window.location.href = `${baseUrl}/${fullPath}`;
   }
   return true;
});

export default router;
