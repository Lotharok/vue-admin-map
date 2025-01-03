import objectPath from "object-path";
import { defineStore } from "pinia";
import { ref } from "vue";

import { config } from "@/config";
import layoutConfig from "@/layouts/default-layout/config/DefaultLayoutConfig";
import type LayoutConfigTypes from "@/layouts/default-layout/config/types";

export const LS_CONFIG_NAME_KEY = "config_" + config.appName;

export const useConfigStore = defineStore("config", () => {
   const config = ref<LayoutConfigTypes>(layoutConfig);
   const initial = ref<LayoutConfigTypes>(layoutConfig);

   function getLayoutConfig(path: string, defaultValue?: string) {
      return objectPath.get(config.value, path, defaultValue);
   }

   function setLayoutConfigProperty(property: string, value: unknown) {
      objectPath.set(config.value, property, value);
      localStorage.setItem(LS_CONFIG_NAME_KEY, JSON.stringify(config.value));
   }

   function resetLayoutConfig() {
      config.value = Object.assign({}, initial.value);
   }

   function overrideLayoutConfig() {
      config.value = initial.value = Object.assign(
         {},
         initial.value,
         JSON.parse(window.localStorage.getItem(LS_CONFIG_NAME_KEY) || "{}"),
      );
   }

   return {
      config,
      getLayoutConfig,
      setLayoutConfigProperty,
      resetLayoutConfig,
      overrideLayoutConfig,
   };
});
