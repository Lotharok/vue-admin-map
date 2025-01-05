<script lang="ts">
   import "leaflet/dist/leaflet.css";

   import L from "leaflet";
   import { defineComponent, onMounted, ref } from "vue";

   import { useZoneStore } from "@/stores/zoneStore";
   import type { Zone } from "@/types/types";

   export default defineComponent({
      name: "ZonesMap",
      setup() {
         const zoneStore = useZoneStore();
         const zonesMap = ref<L.Map | null>(null); // Referencia al mapa Leaflet
         const polygons = ref<L.LayerGroup | null>(null); // Capa para los polígonos

         // Configuración inicial del mapa
         const initMap = () => {
            zonesMap.value = L.map("zones-map", {
               center: [21.1619, -86.8515], // Coordenadas iniciales (Cancun)
               zoom: 12, // Zoom inicial
               minZoom: 8, // Nivel mínimo de zoom
               maxZoom: 18, // Nivel máximo de zoom
            });

            // Cargar un tile layer de OpenStreetMap
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
               attribution: "&copy; OpenStreetMap contributors",
            }).addTo(zonesMap.value);

            polygons.value = L.layerGroup().addTo(zonesMap.value); // Crear capa para los polígonos
         };

         // Renderizar los polígonos desde el store
         const renderZones = () => {
            if (!polygons.value) return;
            polygons.value.clearLayers(); // Limpiar capa actual

            zoneStore.zones.forEach((zone) => {
               if (zone.shape_area) {
                  const polygon = L.geoJSON(zone.shape_area, {
                     style: { color: "blue", weight: 2 },
                  }).bindPopup(`
            <strong>${zone.name_es}</strong><br />
            ${zone.name_en}<br />
            Zoom: ${zone.zoom_level}
          `);

                  polygon.addTo(polygons.value);
               }
            });
         };

         // Centrar el mapa en una zona seleccionada
         const centerOnZone = (zone: Zone) => {
            if (zone && zone.geo_center) {
               const { coordinates } = zone.geo_center;
               if (coordinates) {
                  zonesMap.value?.setView([coordinates[1], coordinates[0]], zone.zoom_level);
               }
            }
         };

         onMounted(async () => {
            await zoneStore.fetchZones(); // Obtener datos del store
            initMap(); // Inicializar el mapa
            renderZones(); // Dibujar las zonas
            centerOnZone(zoneStore.selectedZone);
         });

         return {
            zones: zoneStore.zones,
            centerOnZone,
         };
      },
   });
</script>

<template>
   <div class="zones-map-container">
      <div
         id="zones-map"
         style="height: 500px; width: 100%"
      ></div>
   </div>
</template>

<style scoped>
   .zones-map-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
   }
   #zones-map {
      border: 1px solid #ccc;
      border-radius: 8px;
   }
</style>
