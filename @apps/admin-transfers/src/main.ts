import "./style.css";
import "@admin/layout/dist/layout.css";

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import i18n from "./i18n.ts";
import router from "./router.ts";

(async () => {
   const pinia = createPinia();
   const app = i18n(createApp(App));

   app.use(pinia);

   createApp(App).use(router).mount("#app-admin-transfers");
})();
