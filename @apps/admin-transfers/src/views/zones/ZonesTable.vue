<template>
   <div v-if="loading">Cargando...</div>
   <table v-else>
      <thead>
         <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
         </tr>
      </thead>
      <tbody>
         <tr
            v-for="zone in zones"
            :key="zone.zone_id"
         >
            <td>{{ zone.zone_id }}</td>
            <td>{{ zone.name_es }}</td>
            <td>{{ zone.dt_created }}</td>
            <td>
               <button @click="selectZone(zone)">📍 Zoom to Zone</button>
            </td>
            <td>
               <router-link
                  class="menu-link"
                  active-class="active"
                  :to="{ path: `/transfers/zones/${zone.zone_id}` }"
               >
                  <span class="menu-bullet">
                     <span class="bullet bullet-dot"></span>
                  </span>
                  <span class="menu-title">Editar</span>
               </router-link>
            </td>
            <td>
               <button @click="deleteZone(zone.zone_id)">🗑️ Eliminar</button>
            </td>
         </tr>
      </tbody>
   </table>
</template>

<script lang="ts">
   import { defineComponent } from "vue";

   import { useZoneStore } from "@/stores/zoneStore";
   import type { Zone } from "@/types/types";

   export default defineComponent({
      name: "ZonesTable",
      setup() {
         const zoneStore = useZoneStore();

         // Función para confirmar y eliminar una zona
         const deleteZone = async (zoneId: number) => {
            const confirmed = confirm("¿Estás seguro de que deseas eliminar esta zona?");
            if (confirmed) {
               await zoneStore.deleteZone(zoneId);
            }
         };

         const selectZone = (zone: Zone) => {
            zoneStore.setSelectedZone(zone); // Actualiza el estado global
            zoneStore.currentView = "map";
         };

         return {
            zones: zoneStore.zones,
            loading: zoneStore.loading,
            deleteZone,
            selectZone,
         };
      },
   });
</script>
