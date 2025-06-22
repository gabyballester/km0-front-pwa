import { GOOGLE_MAPS_ENV } from '@constants';

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
  API_KEY: GOOGLE_MAPS_ENV.API_KEY || '',
  
  /** ID del mapa de Google Maps */
  MAP_ID: GOOGLE_MAPS_ENV.MAP_ID || ''
} as const; 