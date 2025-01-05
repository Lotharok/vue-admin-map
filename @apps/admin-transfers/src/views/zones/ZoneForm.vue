<template>
   <div class="card">
      <div class="card-body">
         <form @submit.prevent="handleSubmit">
            <div class="form-group">
               <label for="name_en">Name (English):</label>
               <input
                  id="name_en"
                  v-model="form.name_en"
                  type="text"
                  placeholder="Enter English name"
                  required
               />
               <span
                  v-if="errors.name_en"
                  class="error"
                  >{{ errors.name_en }}</span
               >
            </div>

            <div class="form-group">
               <label for="name_es">Name (Spanish):</label>
               <input
                  id="name_es"
                  v-model="form.name_es"
                  type="text"
                  placeholder="Enter Spanish name"
                  required
               />
               <span
                  v-if="errors.name_es"
                  class="error"
                  >{{ errors.name_es }}</span
               >
            </div>

            <div class="form-group">
               <label for="zoom_level">Zoom Level:</label>
               <input
                  id="zoom_level"
                  v-model="form.zoom_level"
                  type="number"
                  placeholder="Enter zoom level"
                  required
               />
               <span
                  v-if="errors.zoom_level"
                  class="error"
                  >{{ errors.zoom_level }}</span
               >
            </div>

            <div class="form-group">
               <label>Polygon Status:</label>
               <span
                  v-if="!isPolygonValid"
                  class="error"
                  >Polygon is invalid or missing!</span
               >
            </div>

            <button
               type="submit"
               :disabled="isSubmitting"
            >
               Save
            </button>
         </form>
      </div>
   </div>
</template>

<script lang="ts">
   import type { Polygon } from "geojson";
   import L from "leaflet";
   import { defineComponent, PropType, reactive, ref, watch } from "vue";

   import { useZoneStore } from "@/stores/zoneStore";
   import type { Zone } from "@/types/types";

   export default defineComponent({
      name: "ZoneForm",
      props: {
         zone: {
            type: Object as PropType<Partial<Zone>>,
            default: null,
            required: false,
         },
         currentPolygon: {
            type: Object as PropType<Polygon>,
            default: null,
            required: false,
         },
      },
      emits: ["update", "submit"],
      setup(props, { emit }) {
         const zoneStore = useZoneStore();
         const form = reactive<Partial<Zone>>({ ...props.zone });
         const errors = reactive({
            name_en: "",
            name_es: "",
            zoom_level: "",
            polygon: "",
         });
         const isSubmitting = ref(false);
         const isPolygonValid = ref(false);

         // Validar polígono con la función del store
         watch(
            () => props.currentPolygon,
            async (polygon: Polygon) => {
               if (polygon) {
                  isPolygonValid.value = await zoneStore.validatePolygon(L.geoJSON(polygon));
               } else {
                  isPolygonValid.value = false;
               }
            },
            { immediate: true },
         );

         /*
          watch(
             () => props.zone,
             (newZone) => {
                if (newZone) {
                   Object.assign(form, newZone);
                }
             },
             { immediate: true },
          );
          */

         // Validar el formulario
         const validateForm = () => {
            let isValid = true;
            errors.name_en = form.name_en ? "" : "English name is required.";
            errors.name_es = form.name_es ? "" : "Spanish name is required.";
            errors.zoom_level = form.zoom_level ? "" : "Zoom level is required.";
            isValid = isValid && !errors.name_en && !errors.name_es && !errors.zoom_level;
            return isValid;
         };

         const handleSubmit = async () => {
            if (!validateForm() || !isPolygonValid.value) {
               errors.polygon = !isPolygonValid.value ? "Polygon is invalid." : "";
               return;
            }

            isSubmitting.value = true;
            try {
               emit("submit", { ...form, shape_area: props.currentPolygon });
            } catch (err) {
               console.error("Error submitting form:", err);
            } finally {
               isSubmitting.value = false;
            }
         };

         return {
            form,
            errors,
            isSubmitting,
            isPolygonValid,
            handleSubmit,
         };
      },
   });
</script>

<style scoped>
   .error {
      color: red;
      font-size: 0.85rem;
   }
</style>
