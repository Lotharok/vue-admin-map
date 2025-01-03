import i18next from "i18next";
import Backend from "i18next-http-backend";
import I18NextVue from "i18next-vue";
import { App } from "vue";

i18next.use(Backend).init({
   debug: import.meta.env.VITE_IS_DEBUG === "true",
   fallbackLng: "es-mx",
   load: "currentOnly",
   interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
   },
   backend: {
      loadPath: (lng: string, ns: string) => {
         const version = import.meta.env.VITE_I18_VERSION;
         return import.meta.env.VITE_I18_PATH + `/${lng}/${ns}.json?v=${version}`;
      },
      crossDomain: true,
   },
});

export default function (app: App) {
   app.use(I18NextVue, { i18next });
   return app;
}
