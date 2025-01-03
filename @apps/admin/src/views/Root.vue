<script lang="ts">
   import { themeConfigValue } from "@admin/layout";
   import { useThemeStore } from "@admin/layout";
   import { useConfigStore } from "@admin/layout";
   import { useBodyStore } from "@admin/layout";
   import { initializeComponents } from "@admin/layout";
   import { defineComponent, nextTick, onBeforeMount, onMounted } from "vue";
   import { RouterView } from "vue-router";

   import { i18nextPromise } from "@/i18n";

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
