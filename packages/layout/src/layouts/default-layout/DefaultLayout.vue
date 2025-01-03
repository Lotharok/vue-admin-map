<template>
   <!-- begin:: Body -->
   <div class="page d-flex flex-column flex-column-fluid">
      <KTHeader />

      <div
         id="kt_content_container"
         class="d-flex flex-column-fluid align-items-stretch"
         :class="{
            'container-fluid': contentWidthFluid,
            'container-xxl': !contentWidthFluid,
         }"
      >
         <!-- begin:: Content -->
         <div
            id="kt_wrapper"
            class="wrapper d-flex flex-column flex-row-fluid mt-5"
         >
            <!--<KTToolbar />-->
            <div
               id="kt_content"
               class="content flex-column-fluid"
            >
               <!-- begin:: Content Body -->
               <div
                  id="kt_post"
                  class="post"
               >
                  <router-view />
               </div>
               <!-- end:: Content Body -->
            </div>
            <!-- <KTFooter />-->
         </div>
         <!-- end:: Content -->
      </div>
   </div>
   <!-- end:: Body -->
   <!--<KTScrollTop />-->
</template>

<script lang="ts">
   import { defineComponent, nextTick, onBeforeMount, onMounted, watch } from "vue";
   import { useRoute } from "vue-router";

   import { reinitializeComponents } from "@/core/plugins/keenthemes";
   import LayoutService from "@/core/services/LayoutService";
   import KTHeader from "@/layouts/default-layout/components/header/Header.vue";
   import { contentWidthFluid } from "@/layouts/default-layout/config/helper";

   export default defineComponent({
      name: "DefaultLayout",
      components: {
         KTHeader,
      },
      setup() {
         const route = useRoute();

         onBeforeMount(() => {
            LayoutService.init();
         });

         onMounted(() => {
            nextTick(() => {
               reinitializeComponents();
            });
         });

         watch(
            () => route.path,
            () => {
               nextTick(() => {
                  reinitializeComponents();
               });
            },
         );

         return {
            contentWidthFluid,
         };
      },
   });
</script>
