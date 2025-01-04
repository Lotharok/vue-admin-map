import type { Zone } from "../types/types";

export const mockZones: Zone[] = [
   {
      zone_id: 1,
      name_en: "Mexico City Central",
      name_es: "Centro de Ciudad de México",
      shape_area: {
         type: "Polygon",
         coordinates: [
            [
               [-99.1447, 19.4214],
               [-99.1303, 19.4214],
               [-99.1303, 19.4326],
               [-99.1447, 19.4326],
               [-99.1447, 19.4214],
            ],
         ],
      },
      zoom_level: 14,
      geo_center: {
         type: "Point",
         coordinates: [-99.1375, 19.427],
      },
      dt_created: "2024-01-01T10:00:00Z",
      dt_updated: "2024-01-02T10:00:00Z",
      created_by_admin_user_id: 1,
      updated_by_admin_user_id: 2,
   },
   {
      zone_id: 2,
      name_en: "Cancun Hotel Zone",
      name_es: "Zona Hotelera de Cancún",
      shape_area: {
         type: "Polygon",
         coordinates: [
            [
               [-86.834, 21.1319],
               [-86.8256, 21.1319],
               [-86.8256, 21.1437],
               [-86.834, 21.1437],
               [-86.834, 21.1319],
            ],
         ],
      },
      zoom_level: 15,
      geo_center: {
         type: "Point",
         coordinates: [-86.8298, 21.1378],
      },
      dt_created: "2024-01-03T11:00:00Z",
      dt_updated: "2024-01-04T11:00:00Z",
      created_by_admin_user_id: 2,
      updated_by_admin_user_id: 3,
   },
];
