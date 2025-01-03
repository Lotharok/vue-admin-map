import {DefaultLayout} from "@admin/layout";
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
   {
      path: "/",
      redirect: "/home",
      component: DefaultLayout,
      meta: {},
      children: [
         {
            path: "/home",
            name: "home",
            component: () => import("@/views/Home.vue"),
            meta: {
               pageTitle: "Home",
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

export default router;
