import { DefaultLayout } from "@admin/layout";
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import { config } from "@/config";

const routes: Array<RouteRecordRaw> = [
   {
      path: "/transfers",
      component: DefaultLayout,
      meta: {},
      children: [
         {
            path: "",
            redirect: "/transfers/home",
            name: "transfers-layout",
            component: () => import("@/components/PageLayout.vue"),
            meta: {
               breadcrumbs: [],
            },
            children: [
               {
                  path: "home",
                  name: "transfers-home",
                  component: () => import("@/views/Home.vue"),
                  meta: {
                     pageTitle: "Transfer Contracts",
                  },
               },
               {
                  path: "contracts",
                  name: "transfers-contracts",
                  component: () => import("@/views/contracts/Contracts.vue"),
                  meta: {
                     pageTitle: "Transfer Contracts",
                  },
               },
               {
                  path: "zones",
                  name: "transfers-zones",
                  component: () => import("@/views/zones/Zones.vue"),
                  meta: {
                     pageTitle: "Transfer Zones",
                  },
               },
               {
                  path: "zones/:id",
                  name: "transfer-zones-edith",
                  component: () => import("@/views/zones/ZoneEditor.vue"),
                  meta: {
                     pageTitle: "Transfer Zone"
                  },
               },
            ],
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
