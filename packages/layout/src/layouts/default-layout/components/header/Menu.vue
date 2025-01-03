<template>
   <!--begin::Menu wrapper-->
   <div
      class="header-menu align-items-stretch"
      data-kt-drawer="true"
      data-kt-drawer-name="header-menu"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle="#kt_header_menu_mobile_toggle"
      data-kt-swapper="true"
      data-kt-swapper-mode="prepend"
      data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav'}"
   >
      <!--begin::Menu-->
      <div
         id="#kt_header_menu"
         class="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-semibold my-5 my-lg-0 align-items-stretch"
         data-kt-menu="true"
      >
         <template
            v-for="(item, i) in MainMenuConfig"
            :key="i"
         >
            <template v-if="!item.heading">
               <template
                  v-for="(menuItem, j) in item.pages"
                  :key="j"
               >
                  <div
                     v-if="menuItem.heading"
                     class="menu-item me-lg-1"
                  >
                     <template v-if="menuItem.route">
                        <router-link
                           v-if="menuItem.isRouterLink"
                           class="menu-link"
                           :to="menuItem.route"
                           active-class="active"
                        >
                           <span class="menu-title">{{ $t(menuItem.heading) }}</span>
                        </router-link>
                        <a
                           v-else
                           :href="menuItem.route"
                           class="menu-link"
                           ><span class="menu-title">{{ $t(menuItem.heading) }}</span></a
                        >
                     </template>
                  </div>
               </template>
            </template>
            <div
               v-if="item.heading"
               data-kt-menu-trigger="click"
               data-kt-menu-placement="bottom-start"
               class="menu-item menu-lg-down-accordion me-lg-1"
            >
               <span
                  v-if="item.route"
                  class="menu-link py-3"
                  :class="{ active: hasActiveChildren(item.route) }"
               >
                  <span class="menu-title">{{ $t(item.heading) }}</span>
                  <span class="menu-arrow d-lg-none"></span>
               </span>
               <div class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-rounded-0 py-lg-4 w-lg-225px">
                  <template
                     v-for="(menuItem, j) in item.pages"
                     :key="j"
                  >
                     <div
                        v-if="menuItem.sectionTitle"
                        data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                        data-kt-menu-placement="right-start"
                        class="menu-item menu-lg-down-accordion"
                     >
                        <span
                           v-if="menuItem.route"
                           class="menu-link py-3"
                           :class="{ active: hasActiveChildren(menuItem.route) }"
                        >
                           <span class="menu-icon">
                              <KTIcon
                                 :icon-name="menuItem.keenthemesIcon"
                                 icon-class="fs-1"
                              />
                           </span>
                           <span class="menu-title">{{ $t(menuItem.sectionTitle) }}</span>
                           <span class="menu-arrow"></span>
                        </span>
                        <div
                           class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px"
                        >
                           <template
                              v-for="(menuItem1, k) in menuItem.sub"
                              :key="k"
                           >
                              <div
                                 v-if="menuItem1.sectionTitle"
                                 data-kt-menu-trigger="{default:'click', lg: 'hover'}"
                                 data-kt-menu-placement="right-start"
                                 class="menu-item menu-lg-down-accordion"
                              >
                                 <span
                                    v-if="menuItem1.route"
                                    class="menu-link py-3"
                                    :class="{ active: hasActiveChildren(menuItem1.route) }"
                                 >
                                    <span class="menu-bullet">
                                       <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">{{ $t(menuItem1.sectionTitle) }}</span>
                                    <span class="menu-arrow"></span>
                                 </span>
                                 <div
                                    class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown menu-active-bg py-lg-4 w-lg-225px"
                                 >
                                    <template
                                       v-for="menuItem2 in menuItem1.sub"
                                       :key="menuItem2"
                                    >
                                       <div class="menu-item">
                                          <router-link
                                             v-if="menuItem2.route && menuItem2.heading"
                                             class="menu-link py-3"
                                             active-class="active"
                                             :to="menuItem2.route"
                                          >
                                             <span class="menu-bullet">
                                                <span class="bullet bullet-dot"></span>
                                             </span>
                                             <span class="menu-title">{{ $t(menuItem2.heading) }}</span>
                                          </router-link>
                                       </div>
                                    </template>
                                 </div>
                              </div>
                              <div
                                 v-if="menuItem1.heading"
                                 class="menu-item"
                              >
                                 <router-link
                                    v-if="menuItem1.route"
                                    class="menu-link"
                                    active-class="active"
                                    :to="menuItem1.route"
                                 >
                                    <span class="menu-bullet">
                                       <span class="bullet bullet-dot"></span>
                                    </span>
                                    <span class="menu-title">{{ $t(menuItem1.heading) }}</span>
                                 </router-link>
                              </div>
                           </template>
                        </div>
                     </div>
                     <div
                        v-if="menuItem.heading"
                        class="menu-item"
                     >
                        <router-link
                           v-if="menuItem.route"
                           class="menu-link"
                           active-class="active"
                           :to="menuItem.route"
                        >
                           <span class="menu-icon">
                              <KTIcon
                                 icon-name="element-8"
                                 icon-class="fs-2"
                              />
                           </span>
                           <span class="menu-title">{{ $t(menuItem.heading) }}</span>
                        </router-link>
                     </div>
                  </template>
               </div>
            </div>
         </template>
         <!--end::Menu-->
      </div>
   </div>
   <!--end::Menu wrapper-->
</template>

<script lang="ts">
   import { defineComponent } from "vue";
   import { useRoute } from "vue-router";

   import { getAssetPath } from "../../../../core/helpers/assets";
   import MainMenuConfig from ".././../config/MainMenuConfig";

   export default defineComponent({
      name: "KTMenu",
      components: {},
      setup() {
         const route = useRoute();

         const hasActiveChildren = (match: string) => {
            return route.path.indexOf(match) !== -1;
         };

         return {
            hasActiveChildren,
            MainMenuConfig,
            getAssetPath,
         };
      },
   });
</script>
