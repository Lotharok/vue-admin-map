interface Zone {
   zone_id: number; // Identificador único de la zona
   name_en: string; // Nombre en inglés
   name_es: string; // Nombre en español
   // eslint-disable-next-line no-undef
   shape_area: GeoJSON.Polygon | undefined; // Polígono de la zona
   zoom_level: number; // Nivel de zoom sugerido para centrar
   // eslint-disable-next-line no-undef
   geo_center: GeoJSON.Point | null; // Centro geográfico
   dt_created: string; // Fecha de creación
   dt_updated: string; // Fecha de última actualización
   created_by_admin_user_id: number; // ID del creador
   updated_by_admin_user_id: number; // ID del último actualizador
}
export type { Zone };
