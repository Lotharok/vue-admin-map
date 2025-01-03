<template>
   <!--begin::Toolbar wrapper-->
   <div class="d-flex align-items-stretch flex-shrink-0">
      <!--begin::Theme mode-->
      <div class="d-flex align-items-center ms-1 ms-lg-2">
         <!--begin::Menu toggle-->
         <a
            href=""
            class="btn btn-icon btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
            data-kt-menu-trigger="{default:'click', lg: 'hover'}"
            data-kt-menu-attach="parent"
            data-kt-menu-placement="bottom-end"
         >
            <KTIcon
               icon-name="night-day"
               icon-class="theme-light-show fs-2 fs-md-1"
            />
            <KTIcon
               icon-name="moon"
               icon-class="theme-dark-show fs-2 fs-md-1"
            />
         </a>
         <!--begin::Menu toggle-->
         <KTThemeModeSwitcher></KTThemeModeSwitcher>
      </div>
      <!--end::Theme mode-->

      <!--begin::User-->
      <div
         id="kt_header_user_menu_toggle"
         class="d-flex align-items-center ms-1 ms-lg-3"
      >
         <!--begin::User info-->
         <div
            class="btn btn-active-light d-flex align-items-center bg-hover-light py-2 px-2 px-md-3"
            data-kt-menu-trigger="click"
            data-kt-menu-attach="parent"
            data-kt-menu-placement="bottom-end"
         >
            <!--begin::Name-->
            <div class="d-none d-md-flex flex-column align-items-end justify-content-center me-2">
               <span class="text-muted fs-7 fw-semibold lh-1 mb-2">Hello</span>
               <span class="text-gray-900 fs-base fw-bold lh-1">Richard</span>
            </div>
            <!--end::Name-->

            <!--begin::Symbol-->
            <div class="symbol symbol-30px symbol-md-40px">
               <img
                  :src="getAssetPath('media/avatars/blank.png')"
                  alt="image"
               />
            </div>
            <!--end::Symbol-->
         </div>
         <!--end::User info-->
         <KTUserMenu></KTUserMenu>
         <!--end::Menu-->
      </div>
      <!--end::User -->

      <!--begin::Heaeder menu toggle-->
      <div class="d-flex align-items-center d-lg-none ms-2 me-n3">
         <div
            id="kt_header_menu_mobile_toggle"
            class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
         >
            <KTIcon
               icon-name="text-align-left"
               icon-class="fs-1"
            />
         </div>
      </div>
      <!--end::Heaeder menu toggle-->
   </div>
   <!--end::Toolbar wrapper-->
</template>

<script lang="ts">
   import { defineComponent } from "vue";

   import { getAssetPath } from "../../../../core/helpers/assets";
   import KTUserMenu from "../menus/UserAccountMenu.vue";
   import KTThemeModeSwitcher from "../theme-mode/ThemeModeSwitcher.vue";

   export default defineComponent({
      name: "LayoutTopbar",
      components: {
         KTUserMenu,
         KTThemeModeSwitcher,
      },
      setup() {
         return {
            getAssetPath,
         };
      },
   });
</script>
