<script lang="ts">
   import { defineComponent } from "vue";

   import { getAssetPath } from "@/core/helpers/assets";
   import Root from "@/views/Root.vue";

   export default defineComponent({
      name: "App",
      components: {
         Root,
      },
      setup() {
         return {
            getAssetPath,
         };
      },
   });
</script>

<template>
   <Suspense>
      <Root />
      <template #fallback>
         <div
            id="splash-screen"
            class="splash-screen"
         >
            <img
               :src="getAssetPath('media/logos/demo5-dark.svg')"
               class="dark-logo"
               alt="App dark logo"
            />
            <img
               :src="getAssetPath('media/logos/demo5.svg')"
               class="light-logo"
               alt="App light logo"
            />
            <div class="loader-wrapper">
               <span class="loader"></span>
               <span class="loading-text">Loading...</span>
            </div>
         </div>
      </template>
   </Suspense>
</template>
