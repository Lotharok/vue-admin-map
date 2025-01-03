import type { MenuItem } from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
   {
      pages: [
         {
            heading: "menu.transfers",
            route: "/transfers",
            keenthemesIcon: "element-11",
            bootstrapIcon: "bi-app-indicator",
            isRouterLink: false,
         },
         {
            heading: "menu.tours",
            route: "/tours",
            keenthemesIcon: "switch",
            bootstrapIcon: "bi-layers",
            isRouterLink: false,
         },
         {
            heading: "menu.cars",
            route: "/cars",
            keenthemesIcon: "switch",
            bootstrapIcon: "bi-layers",
            isRouterLink: false,
         },
      ],
   },
];

export default MainMenuConfig;
