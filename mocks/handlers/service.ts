// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { delay, http, HttpResponse } from "msw";

import type { Zone } from "../../@apps/admin-transfers/src/types/types";
import { mockZones } from "../data/zones";

const apiTransferUrl = "https://api-transfer.web-travel.com/api";

const getZones = () => {
   let zones = [];
   const storedZones = localStorage.getItem("zones");
   if (storedZones) {
      zones = JSON.parse(storedZones);
   } else {
      localStorage.setItem("zones", JSON.stringify(mockZones));
      zones = mockZones;
   }

   return zones;
};

export const service = [
   // Recuperar todas las zonas
   http.get(`${apiTransferUrl}/zones`, async () => {
      await delay(500);
      return HttpResponse.json(getZones(), { status: 200 });
   }),

   // Recuperar una zona
   http.get(`${apiTransferUrl}/zones/:id`, async (req) => {
      const { id } = req.params;
      const zone = mockZones.find(({ zone_id }) => zone_id === Number(id));
      await delay(500);
      return HttpResponse.json(zone, { status: 200 });
   }),

   // Agregar una nueva zona
   http.post(`${apiTransferUrl}/zones`, async (req) => {
      const newZone: Zone = await req.request.json();
      newZone.zone_id = mockZones.length + 1; // Asignar un ID único
      newZone.dt_created = new Date().toISOString();
      const z = getZones();
      z.push(newZone);
      localStorage.setItem("zones", JSON.stringify(z));
      return HttpResponse.json(newZone, { status: 201 });
   }),

   // Editar una zona existente
   http.put(`${apiTransferUrl}/zones/:id`, async (req) => {
      const { id } = req.params;
      const updatedZone: Partial<Zone> = await req.request.json();
      let zone = mockZones.find(({ zone_id }) => zone_id === Number(id));
      if (!zone) {
         return HttpResponse.json({ message: "Zone not found" }, { status: 404 });
      }
      zone = { ...zone, ...updatedZone };
      return HttpResponse.json(zone, { status: 200 });
   }),

   // Eliminar una zona
   http.delete(`${apiTransferUrl}/zones/:id`, (req, res, ctx) => {
      const { id } = req.params;
      const zoneIndex = mockZones.findIndex((zone) => zone.zone_id === Number(id));
      if (zoneIndex === -1) {
         return res(ctx.status(404), ctx.json({ message: "Zone not found" }));
      }
      mockZones.splice(zoneIndex, 1);
      return res(ctx.status(204));
   }),
];
