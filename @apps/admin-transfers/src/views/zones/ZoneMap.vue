<template>
   <div class="card">
      <div class="card-body">
         <div class="zones-map-container">
            <div
               id="map"
               style="height: 500px; width: 100%"
            ></div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
   import "leaflet-draw";
   import "leaflet/dist/leaflet.css";
   import "leaflet-draw/dist/leaflet.draw.css";

   import L from "leaflet";
   import { defineComponent, onMounted, ref, watch } from "vue";

   import { useZoneStore } from "@/stores/zoneStore";

   export default defineComponent({
      name: "ZoneMap",
      props: {
         currentPolygon: {
            type: Object,
            default: null,
         },
      },
      emits: ["polygon-drawn"],
      setup(props, { emit }) {
         const zoneStore = useZoneStore();
         const map = ref<L.Map | null>(null);
         const drawnItems = new L.FeatureGroup();
         const polygons = ref<L.LayerGroup | null>(null); // Capa para los polígonos

         // Renderizar las zonas actuales
         const renderZones = () => {
            if (!polygons.value) {
               return;
            }

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

         // Función para crear un nuevo polígono en el mapa
         const handlePolygonDrawn = (polygon: L.Polygon) => {
            emit("polygon-drawn", polygon.toGeoJSON());
         };

         // Establecer el polígono actual si se pasa desde el padre
         const setPolygon = (polygon) => {
            if (polygon && map.value) {
               // El polígono pasado desde el padre es un objeto Leaflet
               const geoJsonLayer = L.geoJSON(polygon, {
                  style: { color: "red", weight: 3 },
                  onEachFeature: function (feature, layer) {
                     layer.addTo(drawnItems);
                  },
               }).addTo(map.value);
               map.value?.fitBounds(geoJsonLayer.getBounds()); // Ajustar el mapa para ver el polígono
            }
         };

         onMounted(async () => {
            await zoneStore.fetchZones();

            map.value = L.map("map", {
               center: [21.1619, -86.8515], // Coordenadas iniciales (Cancún)
               zoom: 12, // Zoom inicial
               minZoom: 8, // Nivel mínimo de zoom
               maxZoom: 18, // Nivel máximo de zoom
            });

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
               maxZoom: 18,
            }).addTo(map.value);

            polygons.value = L.layerGroup().addTo(map.value);
            map.value.addLayer(drawnItems);

            // Agregar capa de dibujo
            L.control.layers(null, { "Draw Layer": drawnItems, Zonas: polygons.value }).addTo(map.value);

            // Control de dibujo
            const drawControl = new L.Control.Draw({
               edit: {
                  featureGroup: drawnItems,
               },
               draw: {
                  polygon: true,
                  polyline: false,
                  rectangle: false,
                  circle: false,
                  marker: false,
                  circlemarker: false,
               },
            });

            map.value.addControl(drawControl);

            // Evento de dibujo
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            map.value.on(L.Draw.Event.CREATED, (event: any) => {
               const layer = event.layer;
               drawnItems.addLayer(layer);
               handlePolygonDrawn(layer); // Emitir el polígono cuando se dibuja
            });

            renderZones(); // Renderizar las zonas cargadas desde el store
            setPolygon(props.currentPolygon); // Si hay un polígono a editar, se carga
         });

         // Validar polígono con la función del store
         watch(
            () => props.currentPolygon,
            async (polygon) => {
               if (polygon) {
                  setPolygon(polygon);
               }
            },
            { immediate: true },
         );

         return {};
      },
   });
</script>

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
