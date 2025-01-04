<script lang="ts">
   import { defineComponent, nextTick, onBeforeMount, onMounted } from "vue";
   import { RouterView } from "vue-router";

   import { initializeComponents } from "@/core/plugins/keenthemes";
   import { i18nextPromise } from "@/i18n";
   import { themeConfigValue } from "@/layouts/default-layout/config/helper";
   import { useBodyStore } from "@/stores/body";
   import { useConfigStore } from "@/stores/config";
   import { useThemeStore } from "@/stores/theme";

   export default defineComponent({
      name: "RootApp",
      components: {
         RouterView,
      },
      async setup() {
         const configStore = useConfigStore();
         const themeStore = useThemeStore();
         const bodyStore = useBodyStore();

         onBeforeMount(() => {
            configStore.overrideLayoutConfig();
            themeStore.setThemeMode(themeConfigValue.value);
         });

         onMounted(() => {
            nextTick(() => {
               initializeComponents();
               bodyStore.removeBodyClassName("page-loading");
            });
         });

         await i18nextPromise;
      },
   });
</script>

<template>
   <RouterView />
</template>
