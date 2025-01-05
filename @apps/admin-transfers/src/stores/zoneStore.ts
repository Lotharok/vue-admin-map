import axios from "axios";
import L from "leaflet";
import { defineStore } from "pinia";

import type { Zone } from "@/types/types";

const apiTransfer = axios.create({
   baseURL: "https://api-transfer.web-travel.com/api",
});

export const useZoneStore = defineStore("zone", {
   state: () => ({
      zones: [] as Zone[], // Lista de zonas
      loading: false, // Indicador de carga
      currentView: "map",
      error: null as string | null, // Error al cargar o manejar zonas
      selectedZone: null as Zone | null, // Zona actualmente seleccionada
   }),
   actions: {
      // Obtener todas las zonas.
      async fetchZones() {
         await this.handleRequest(apiTransfer.get<Zone[]>("/zones"), (data: Zone[]) => (this.zones = data));
      },

      // Obtener todas las zonas.
      async fetchZone(id: number) {
         await this.handleRequest(apiTransfer.get<Zone>(`/zones/${id}`), (data: Zone) => (this.selectedZone = data));
      },

      // Agregar una nueva zona.
      async addZone(newZone: Omit<Zone, "zone_id" | "dt_created">) {
         await this.handleRequest(
            apiTransfer.post<Zone>("/zones", newZone),
            (data: Zone) => this.zones.push(data),
            "Error al agregar la zona.",
         );
      },

      // Editar una zona existente.
      async updateZone(zoneId: number, updatedZone: Partial<Zone>) {
         await this.handleRequest(
            apiTransfer.put<Zone>(`/zones/${zoneId}`, updatedZone),
            (data: Zone) => {
               const index = this.zones.findIndex((zone) => zone.zone_id === zoneId);
               if (index !== -1) {
                  this.zones[index] = data;
               }
            },
            "Error al actualizar la zona.",
         );
      },

      // Eliminar una zona.
      async deleteZone(zoneId: number) {
         await this.handleRequest(
            apiTransfer.delete(`/zones/${zoneId}`),
            () => {
               this.zones = this.zones.filter((zone) => zone.zone_id !== zoneId);
            },
            "Error al eliminar la zona.",
         );
      },

      async handleRequest<T>(
         promise: Promise<{ data: T }>,
         // eslint-disable-next-line no-unused-vars
         successCallback: (data: T) => void,
         errorMessage: string = "Ocurrió un error al realizar la operación.",
      ) {
         this.loading = true;
         this.error = null;
         try {
            const response = await promise;
            successCallback(response.data);
         } catch (err) {
            this.error = errorMessage;
            console.error(err);
         } finally {
            this.loading = false;
         }
      },

      //Validaciones en los datos a capturar.
      async validatePolygon(polygon: L.GeoJSON): Promise<boolean> {
         try {
            // Obtener el centroide del polígono
            const center = polygon.getBounds().getCenter();
            const { lat, lng } = center;

            // Consultar la API de Nominatim
            const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
               params: {
                  format: "json",
                  lat: lat,
                  lon: lng,
               },
            });

            // Validar la respuesta
            const data = response.data;
            if (data.address && data.address.country) {
               return true; // Está en tierra
            }

            return false; // No hay dirección asociada (posiblemente en el mar)
         } catch (error) {
            console.error("Error al validar el polígono:", error);
            return false;
         }
      },

      // Establecer la zona seleccionada.
      setSelectedZone(zone: Zone | null) {
         this.selectedZone = zone;
      },
   },
});
