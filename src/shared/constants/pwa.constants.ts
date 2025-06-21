import { toBool, toInt } from '../utils/convertUtils';

/**
 * Constantes de configuración para PWA (Progressive Web App)
 * 
 * Este archivo centraliza todas las configuraciones relacionadas con PWA,
 * incluyendo intervalos de verificación, timeouts y configuraciones de desarrollo.
 * 
 * @example
 * ```typescript
 * import { PWA_CONFIG } from '@constants';
 * 
 * // Usar en componentes
 * const updateInterval = PWA_CONFIG.UPDATE_CHECK_INTERVAL;
 * ```
 */

/**
 * Configuración de PWA
 */
export const PWA_CONFIG = {
  /** Intervalo de verificación de actualizaciones en milisegundos */
  UPDATE_CHECK_INTERVAL: toInt(
    import.meta.env.VITE_PWA_UPDATE_INTERVAL,
    10000
  ),
  
  /** Timeout para detección de beforeinstallprompt en milisegundos */
  INSTALL_PROMPT_TIMEOUT: toInt(
    import.meta.env.VITE_PWA_INSTALL_PROMPT_TIMEOUT,
    5000
  ),
  
  /** Verificación inicial de actualizaciones en milisegundos */
  INITIAL_CHECK_DELAY: toInt(
    import.meta.env.VITE_PWA_INITIAL_CHECK_DELAY,
    1000
  ),
  
  /** Verificación forzada después del registro en milisegundos */
  FORCED_CHECK_DELAY: toInt(
    import.meta.env.VITE_PWA_FORCED_CHECK_DELAY,
    1000
  ),
  
  /** Configuración de desarrollo */
  DEV: {
    /** Mostrar botones de debug en desarrollo */
    SHOW_DEBUG_BUTTONS: toBool(
      import.meta.env.VITE_PWA_SHOW_DEBUG_BUTTONS,
      import.meta.env.DEV
    ),
    
    /** Logs detallados en desarrollo */
    VERBOSE_LOGGING: toBool(
      import.meta.env.VITE_PWA_VERBOSE_LOGGING,
      import.meta.env.DEV
    ),
    
    /** Función global para forzar instalación en desarrollo */
    ENABLE_FORCE_INSTALL: toBool(
      import.meta.env.VITE_PWA_ENABLE_FORCE_INSTALL,
      import.meta.env.DEV
    )
  }
} as const;

/**
 * Valores por defecto recomendados para diferentes entornos
 */
export const PWA_DEFAULTS = {
  /** Desarrollo: verificación cada 10 segundos */
  DEV_UPDATE_INTERVAL: 10000,
  
  /** Producción: verificación cada 1 minuto */
  PROD_UPDATE_INTERVAL: 60000,
  
  /** Staging: verificación cada 30 segundos */
  STAGING_UPDATE_INTERVAL: 30000
} as const;

/**
 * Tipos de configuración de PWA
 */
export type PWAConfig = typeof PWA_CONFIG;
export type PWADefaults = typeof PWA_DEFAULTS; 