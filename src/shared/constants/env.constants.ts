/**
 * Constantes de entorno de la aplicación
 * 
 * Este archivo centraliza todas las variables de entorno de Vite
 * y proporciona constantes tipadas para el entorno actual.
 * 
 * @example
 * ```typescript
 * import { ENV_CONFIG } from '@constants';
 * 
 * // Usar en componentes
 * if (ENV_CONFIG.IS_DEV) {
 *   console.log('Estamos en desarrollo');
 * }
 * ```
 */

/**
 * Configuración del entorno
 */
export const ENV_CONFIG = {
  /** Indica si estamos en modo desarrollo */
  IS_DEV: import.meta.env.DEV,
  
  /** Indica si estamos en modo producción */
  IS_PROD: import.meta.env.PROD,
  
  /** Indica si estamos en modo preview */
  IS_PREVIEW: import.meta.env.MODE === 'preview',
  
  /** URL base de la aplicación */
  BASE_URL: import.meta.env.BASE_URL || '/',
  
  /** Modo actual (development, production, preview) */
  MODE: import.meta.env.MODE,
  
  /** Entorno de Node.js */
  NODE_ENV: import.meta.env.MODE === 'development' ? 'development' : 'production'
} as const;

/**
 * Configuración de desarrollo
 */
export const DEV_CONFIG = {
  /** Mostrar logs detallados en desarrollo */
  VERBOSE_LOGGING: ENV_CONFIG.IS_DEV,
  
  /** Mostrar información de debug */
  SHOW_DEBUG_INFO: ENV_CONFIG.IS_DEV,
  
  /** Habilitar herramientas de desarrollo */
  ENABLE_DEV_TOOLS: ENV_CONFIG.IS_DEV,
  
  /** Mostrar errores detallados */
  SHOW_DETAILED_ERRORS: ENV_CONFIG.IS_DEV
} as const;

/**
 * Configuración de producción
 */
export const PROD_CONFIG = {
  /** Optimizar rendimiento */
  OPTIMIZE_PERFORMANCE: ENV_CONFIG.IS_PROD,
  
  /** Minimizar logs */
  MINIMIZE_LOGS: ENV_CONFIG.IS_PROD,
  
  /** Habilitar cache agresivo */
  AGGRESSIVE_CACHING: ENV_CONFIG.IS_PROD,
  
  /** Comprimir assets */
  COMPRESS_ASSETS: ENV_CONFIG.IS_PROD
} as const;

/**
 * Tipos de configuración del entorno
 */
export type EnvConfig = typeof ENV_CONFIG;
export type DevConfig = typeof DEV_CONFIG;
export type ProdConfig = typeof PROD_CONFIG; 