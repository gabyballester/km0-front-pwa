/**
 * Constantes para el sistema de versionado incremental
 * 
 * Utiliza un número incremental que se auto-incrementa en cada build.
 * Formato: v1, v2, v3, etc.
 */

export const VERSION_CONFIG = {
  /** Prefijo para versiones */
  PREFIX: 'v',
  /** Prefijo para versiones de desarrollo */
  DEV_PREFIX: 'dev',
  /** Prefijo para versiones de producción */
  PROD_PREFIX: 'v',
  /** Sufijo para builds locales */
  LOCAL_SUFFIX: '-local',
  /** Archivo para almacenar la versión actual */
  VERSION_FILE: 'version.json'
} as const;

/**
 * Configuración de visualización del versionado
 */
export const VERSION_DISPLAY_CONFIG = {
  /** Mostrar versión en desarrollo */
  SHOW_IN_DEV: true,
  /** Mostrar versión en producción */
  SHOW_IN_PROD: true,
  /** Posición del indicador de versión */
  POSITION: {
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_RIGHT: 'bottom-right',
    TOP_LEFT: 'top-left',
    TOP_RIGHT: 'top-right'
  },
  /** Estilos del indicador */
  STYLES: {
    FONT_SIZE: 'text-xs',
    OPACITY: 'opacity-70',
    BACKGROUND: 'bg-black/20',
    TEXT_COLOR: 'text-white',
    PADDING: 'px-2 py-1',
    BORDER_RADIUS: 'rounded',
    BACKDROP_BLUR: 'backdrop-blur-sm'
  }
} as const;

/**
 * Tipos para el sistema de versionado
 */
export type VersionPosition = typeof VERSION_DISPLAY_CONFIG.POSITION[keyof typeof VERSION_DISPLAY_CONFIG.POSITION];

export interface VersionInfo {
  /** Número de versión (ej: 1, 2, 3) */
  versionNumber: number;
  /** Versión completa (ej: v1, v2) */
  version: string;
  /** Fecha de build (ej: 2024-12-15) */
  buildDate: string;
  /** Hora de build (ej: 14:30) */
  buildTime: string;
  /** Entorno (development/production) */
  environment: 'development' | 'production';
  /** Hash del commit git (si está disponible) */
  commitHash?: string;
  /** Branch de git (si está disponible) */
  branch?: string;
  /** Timestamp de build */
  timestamp: number;
} 