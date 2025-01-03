<script lang="ts">
   import { defineComponent } from "vue";

   import Root from "@/views/Root.vue";

   export default defineComponent({
      name: "App",
      components: {
         Root,
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
               src="https://test-b2b2c-assets.s3.us-east-1.amazonaws.com/Scripts/admin-complementarios/media/logos/demo5-dark.svg"
               class="dark-logo"
               alt="App dark logo"
            />
            <img
               src="https://test-b2b2c-assets.s3.us-east-1.amazonaws.com/Scripts/admin-complementarios/media/logos/demo5.svg"
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
