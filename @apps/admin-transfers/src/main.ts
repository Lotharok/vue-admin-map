import { initKtIcon } from "@admin/layout";
import { Tooltip } from "bootstrap";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import i18n from "./i18n.ts";
import router from "./router.ts";

(async () => {
   const pinia = createPinia();
   const app = i18n(createApp(App));
   app.use(pinia);
   app.use(router);
   initKtIcon(app);
   app.directive("tooltip", (el) => {
      new Tooltip(el);
   });
   app.mount("#app-admin-transfers");
})();
