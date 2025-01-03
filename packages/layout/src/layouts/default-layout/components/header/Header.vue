<template>
   <!--begin::Header-->
   <div
      id="kt_header"
      class="header align-items-stretch"
   >
      <!--begin::Container-->
      <div
         class="d-flex align-items-stretch justify-content-between"
         :class="{
            'container-fluid': headerWidthFluid,
            'container-xxl': !headerWidthFluid,
         }"
      >
         <!--begin::Brand-->
         <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0 w-lg-225px me-5">
            <!--begin::Aside mobile toggle-->
            <div
               id="kt_aside_toggle"
               class="btn btn-icon btn-active-icon-primary ms-n2 me-2 d-flex d-lg-none"
            >
               <KTIcon
                  icon-name="abstract-14"
                  icon-class="fs-1"
               />
            </div>
            <!--end::Aside mobile toggle-->

            <!--begin::Logo-->
            <router-link to="/">
               <img
                  alt="Logo"
                  :src="getAssetPath('media/logos/demo5.svg')"
                  class="d-none d-lg-inline h-30px"
               />
               <img
                  alt="Logo"
                  :src="getAssetPath('media/logos/demo5-mobile.svg')"
                  class="d-lg-none h-25px"
               />
            </router-link>
            <!--end::Logo-->
         </div>
         <!--end::Brand-->

         <!--begin::Wrapper-->
         <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
            <!--begin::Navbar-->
            <div
               id="kt_header_nav"
               class="d-flex align-items-stretch"
            >
               <KTMenu />
            </div>
            <!--end::Navbar-->

            <KTTopbar />
         </div>
         <!--end::Wrapper-->
      </div>
      <!--end::Container-->
   </div>
   <!--end::Header-->
</template>

<script lang="ts">
   import { defineComponent } from "vue";

   import { getAssetPath } from "../../../../core/helpers/assets";
   import { headerWidthFluid } from "../../config/helper";
   import KTMenu from "../header/Menu.vue";
   import KTTopbar from "../header/Topbar.vue";

   export default defineComponent({
      name: "KTHeader",
      components: {
         KTTopbar,
         KTMenu,
      },
      setup() {
         return {
            headerWidthFluid,
            getAssetPath,
         };
      },
   });
</script>
