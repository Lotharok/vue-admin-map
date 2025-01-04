import { initKtIcon } from "@admin/layout";
import { App } from "@admin/layout";
import { i18Config } from "@admin/layout";
import { Tooltip } from "bootstrap";
import { createPinia } from "pinia";
import { createApp } from "vue";

import router from "./router.ts";

(async () => {
   const pinia = createPinia();
   const app = i18Config(
      createApp(App),
      import.meta.env.VITE_I18_PATH,
      import.meta.env.VITE_I18_VERSION,
      import.meta.env.VITE_IS_DEBUG === "true",
   );
   app.use(pinia);
   app.use(router);
   initKtIcon(app);
   app.directive("tooltip", (el) => {
      new Tooltip(el);
   });
   app.mount("#app-admin");
})();
