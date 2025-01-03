<template>
   <!--begin::Card-->
   <div class="card">
      <!--begin::Card body-->
      <div class="card-body p-0">
         <!--begin::Heading-->
         <div class="card-px text-center py-5 my-5">
            <!--begin::Title-->
            <h2 class="fs-2x fw-bold mb-10">Admin 2.0</h2>
            <!--end::Title-->

            <!--begin::Description-->
            <p class="text-gray-500 fs-5 fw-semibold mb-13">
               <span v-html="$t('home.description')"></span>
            </p>
            <!--end::Description-->
         </div>
         <!--end::Heading-->

         <!--begin::Illustration-->
         <div class="text-center px-5">
            <img
               :src="getIllustrationsPath('15.png')"
               alt=""
               class="mw-100 mh-300px"
            />
         </div>
         <!--end::Illustration-->
      </div>
      <!--end::Card body-->
   </div>
   <!--end::Card-->
</template>

<script lang="ts">
   import { getIllustrationsPath } from "@admin/layout";
   import { defineComponent } from "vue";

   export default defineComponent({
      name: "MainHome",
      components: {},
      setup() {
         return {
            getIllustrationsPath,
         };
      },
   });
</script>
