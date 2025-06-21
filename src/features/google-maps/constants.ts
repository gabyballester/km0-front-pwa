/**
 * Constantes de configuración para Google Maps
 * 
 * Este archivo centraliza las variables de entorno relacionadas con Google Maps.
 */

/**
 * Configuración de Google Maps desde variables de entorno
 */
export const GOOGLE_MAPS_CONFIG = {
  /** Clave de API de Google Maps */
  API_KEY: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY || '',
  
  /** ID del mapa de Google Maps */
  MAP_ID: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || ''
} as const; 