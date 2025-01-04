<template>
   <!--begin::Navbar-->
   <div class="card mb-5">
      <div class="card-body pt-9 pb-0">
         <!--begin::Navs-->
         <div class="d-flex overflow-auto h-55px">
            <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap">
               <!--begin::Nav item-->
               <li class="nav-item">
                  <router-link
                     to="/transfers/contracts"
                     class="nav-link text-active-primary me-6"
                     active-class="active"
                  >
                     Contratos
                  </router-link>
               </li>
               <!--end::Nav item-->
               <!--begin::Nav item-->
               <li class="nav-item">
                  <router-link
                     to="/transfers/zones"
                     class="nav-link text-active-primary me-6"
                     active-class="active"
                  >
                     Zonaz
                  </router-link>
               </li>
               <!--end::Nav item-->
               <!--begin::Nav item-->
               <li class="nav-item">
                  <a
                     href="/metronic8/vue/demo5/crafted/pages/profile/overview"
                     class="nav-link text-active-primary me-6"
                  >
                     3
                  </a>
               </li>
               <!--end::Nav item-->
               <!--begin::Nav item-->
               <li class="nav-item">
                  <a
                     href="/metronic8/vue/demo5/crafted/pages/profile/overview"
                     class="nav-link text-active-primary me-6"
                  >
                     4
                  </a>
               </li>
               <!--end::Nav item-->
            </ul>
         </div>
      </div>
   </div>
   <!--begin::Navs-->
   <!--end::Navbar-->
   <router-view></router-view>
</template>

<script lang="ts">
   import { defineComponent } from "vue";

   export default defineComponent({
      name: "PageLayout",
      components: {},
      setup() {
         return {};
      },
   });
</script>
