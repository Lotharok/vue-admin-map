<template>
   <div class="card">
      <!--begin::Card body-->
      <div class="card-body">
         <div class="view-toggle">
            <button @click="toggleView('table')">Table View</button>
            <button @click="toggleView('map')">Map View</button>
            <router-link
               class="menu-link"
               active-class="active"
               to="/transfers/zones/0"
            >
               <span class="menu-bullet">
                  <span class="bullet bullet-dot"></span>
               </span>
               <span class="menu-title">Agregar</span>
            </router-link>
         </div>
         <div v-if="zoneStore.currentView === 'table'">
            <ZonesTable />
         </div>
         <div v-else>
            <ZonesMap />
         </div>
      </div>
      <!--end::Card body-->
   </div>
</template>

<script lang="ts">
   import { defineComponent } from "vue";

   import { useZoneStore } from "@/stores/zoneStore";
   import ZonesMap from "@/views/zones/ZonesMap.vue";
   import ZonesTable from "@/views/zones/ZonesTable.vue";

   export default defineComponent({
      name: "ViewZones",
      components: { ZonesTable, ZonesMap },
      setup() {
         const zoneStore = useZoneStore();

         const toggleView = (view: "table" | "map") => {
            zoneStore.currentView = view;
         };

         return {
            zoneStore,
            toggleView,
         };
      },
      mounted() {
         this.zoneStore.fetchZones();
      },
   });
</script>

<style scoped>
   .view-toggle {
      margin-bottom: 1rem;
   }
</style>
