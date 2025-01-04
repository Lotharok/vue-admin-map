import {DefaultLayout} from "@admin/layout";
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import { config } from "@/config";

const routes: Array<RouteRecordRaw> = [
   {
      path: "/transfers",
      component: DefaultLayout,
      meta: {},
      children: [
         {
            path: "/transfers",
            name: "home",
            component: () => import("@/components/HomeView.vue"),
            meta: {
               pageTitle: "Home",
               breadcrumbs: [],
            },
         },
         {
            path: "/transfers/about",
            name: "about",
            component: () => import("@/components/AboutView.vue"),
            meta: {
               pageTitle: "About",
               breadcrumbs: [],
            },
         },
      ],
   },
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
