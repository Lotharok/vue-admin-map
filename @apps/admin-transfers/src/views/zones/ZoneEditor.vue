<template>
   <div
      v-if="selectedZone && currentPolygon"
      class="row flex-row-fluid"
   >
      <div class="col-lg-6">
         <ZoneForm
            :zone="selectedZone"
            :current-polygon="currentPolygon"
            @submit="handleFormSubmit"
         />
      </div>
      <div class="col-lg-6">
         <ZoneMap
            :current-polygon="currentPolygon"
            @polygon-drawn="handlePolygonDrawn"
         />
      </div>
   </div>
</template>

<script lang="ts">
   import { storeToRefs } from "pinia";
   import { defineComponent, onMounted, ref } from "vue";
   import { useRoute, useRouter } from "vue-router";

   import { useZoneStore } from "@/stores/zoneStore";
   import type { Zone } from "@/types/types";
   import ZoneForm from "@/views/zones/ZoneForm.vue";
   import ZoneMap from "@/views/zones/ZoneMap.vue";

   export default defineComponent({
      name: "ZoneEditor",
      components: { ZoneForm, ZoneMap },
      setup() {
         const zoneStore = useZoneStore();
         const route = useRoute();
         const router = useRouter();
         const { selectedZone } = storeToRefs(zoneStore);
         const currentPolygon = ref(null); // El polígono actual que está siendo dibujado o editado

         // Función para manejar el polígono que se dibuja en el mapa
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const handlePolygonDrawn = (polygon: any) => {
            currentPolygon.value = polygon; // Se actualiza el polígono
         };

         // Función que maneja el envío del formulario
         const handleFormSubmit = async (formData: Zone) => {
            try {
               if (zoneStore.selectedZone?.zone_id) {
                  // Si existe un ID de zona, hacemos una actualización
                  await zoneStore.updateZone(zoneStore.selectedZone.zone_id, {
                     ...formData,
                     shape_area: currentPolygon.value,
                  });
               } else {
                  // Si no existe un ID de zona, hacemos una creación
                  await zoneStore.addZone({
                     ...formData,
                     shape_area: currentPolygon.value,
                  });
               }
               zoneStore.setSelectedZone(null);
               router.push("/transfers/zones");
            } catch (err) {
               console.error("Error al guardar la zona", err);
            }
         };

         // En caso de edición de zona, cargamos el polígono existente
         onMounted(async () => {
            const id = Number(route.params.id);
            if (id > 0) {
               await zoneStore.fetchZone(id);
               if (zoneStore.selectedZone?.shape_area) {
                  currentPolygon.value = zoneStore.selectedZone.shape_area; // Cargar polígono si está disponible
               }
            } else {
               zoneStore.setSelectedZone(null);
            }
         });

         return {
            selectedZone,
            currentPolygon,
            handlePolygonDrawn,
            handleFormSubmit,
         };
      },
   });
</script>
