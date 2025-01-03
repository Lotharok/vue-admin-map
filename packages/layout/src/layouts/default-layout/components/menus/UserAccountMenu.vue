<template>
   <!--begin::Menu-->
   <div
      class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold py-4 fs-6 w-275px"
      data-kt-menu="true"
   >
      <!--begin::Menu item-->
      <div class="menu-item px-3">
         <div class="menu-content d-flex align-items-center px-3">
            <!--begin::Avatar-->
            <div class="symbol symbol-50px me-5">
               <img
                  alt="Logo"
                  :src="getAssetPath('media/avatars/blank.png')"
               />
            </div>
            <!--end::Avatar-->

            <!--begin::Username-->
            <div class="d-flex flex-column">
               <div class="fw-bold d-flex align-items-center fs-5">Max Smith</div>
               <a
                  href="#"
                  class="fw-semibold text-muted text-hover-primary fs-7"
                  >max@kt.com</a
               >
            </div>
            <!--end::Username-->
         </div>
      </div>
      <!--end::Menu item-->

      <!--begin::Menu separator-->
      <div class="separator my-2"></div>
      <!--end::Menu separator-->

      <!--begin::Menu item-->
      <div
         class="menu-item px-5"
         data-kt-menu-trigger="hover"
         data-kt-menu-placement="left-start"
         data-kt-menu-flip="center, top"
      >
         <div class="menu-link px-5">
            <span class="menu-title position-relative">
               {{ $t("userAccountMenu.language") }}
               <span class="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0">
                  {{ $t("userAccountMenu." + currentLanguage) }}
                  <img
                     class="w-15px h-15px rounded-1 ms-2"
                     :src="currentFlag"
                     alt="metronic"
                  />
               </span>
            </span>
         </div>

         <!--begin::Menu sub-->
         <div class="menu-sub menu-sub-dropdown w-175px py-4">
            <!--begin::Menu item-->
            <div class="menu-item px-3">
               <a
                  href=""
                  class="menu-link d-flex px-5"
                  :class="{ active: currentLanguage === 'en-us' }"
                  @click="setLang('en-us')"
               >
                  <span class="symbol symbol-20px me-4">
                     <img
                        class="rounded-1"
                        :src="getAssetPath('media/flags/united-states.svg')"
                        alt="metronic"
                     />
                  </span>
                  {{ $t("userAccountMenu.en-us") }}
               </a>
            </div>
            <!--end::Menu item-->

            <!--begin::Menu item-->
            <div class="menu-item px-3">
               <a
                  href=""
                  class="menu-link d-flex px-5"
                  :class="{ active: currentLanguage === 'es-mx' }"
                  @click="setLang('es-mx')"
               >
                  <span class="symbol symbol-20px me-4">
                     <img
                        class="rounded-1"
                        :src="getAssetPath('media/flags/mexico.svg')"
                        alt="metronic"
                     />
                  </span>
                  {{ $t("userAccountMenu.es-mx") }}
               </a>
            </div>
            <!--end::Menu item-->
         </div>
         <!--end::Menu sub-->
      </div>
      <!--end::Menu item-->

      <!--begin::Menu item-->
      <div class="menu-item px-5">
         <a
            class="menu-link px-5"
            @click="signOut()"
         >
            Sign Out
         </a>
      </div>
      <!--end::Menu item-->
   </div>
   <!--end::Menu-->
</template>

<script lang="ts">
   import i18next from "i18next";
   import { defineComponent } from "vue";
   import { useRouter } from "vue-router";

   import { getAssetPath } from "../../../../core/helpers/assets";
   //import { useAuthStore } from "../../../../stores/auth";

   export default defineComponent({
      name: "KtUserMenu",
      components: {},
      setup() {
         const router = useRouter();
         //onst store = useAuthStore();

         i18next.changeLanguage(localStorage.getItem("lang") ? (localStorage.getItem("lang") as string) : "es-mx");

         const signOut = () => {
            //store.logout();
            router.push({ name: "sign-in" });
         };

         return {
            signOut,
            getAssetPath,
         };
      },
      data() {
         return {
            language: undefined,
         };
      },
      computed: {
         currentLanguage() {
            return this.language ?? "es-mx";
         },
         currentFlag() {
            const flagPath = this.language === "es-mx" ? "mexico" : "united-states";
            return getAssetPath(`media/flags/${flagPath}.svg`);
         },
      },
      mounted() {
         this.language = localStorage.getItem("lang") as string;
      },
      methods: {
         setLang(lang: string) {
            this.language = lang;
            localStorage.setItem("lang", lang);
            i18next.changeLanguage(lang);
         },
      },
   });
</script>
