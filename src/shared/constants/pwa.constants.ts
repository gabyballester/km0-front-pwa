import { ENV_CONFIG } from './env.constants';

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
  UPDATE_CHECK_INTERVAL: 30000, // 30 segundos (muy agresivo)

  /** Timeout para detección de beforeinstallprompt en milisegundos */
  INSTALL_PROMPT_TIMEOUT: 5000,

  /** Verificación inicial de actualizaciones en milisegundos */
  INITIAL_CHECK_DELAY: 1000, // 1 segundo (muy rápido)

  /** Intervalo mínimo entre verificaciones forzadas en milisegundos */
  MIN_FORCED_CHECK_INTERVAL: 5000, // 5 segundos (muy agresivo)

  /** Configuración del modal de instalación */
  INSTALL_MODAL: {
    /** Delay antes de mostrar el modal de instalación (5 segundos) */
    DELAY_MS: 5000
  },

  /** Configuración de desarrollo */
  DEV: {
    /** Mostrar botones de debug en desarrollo */
    SHOW_DEBUG_BUTTONS: ENV_CONFIG.IS_DEV,

    /** Logs detallados en desarrollo */
    VERBOSE_LOGGING: ENV_CONFIG.IS_DEV,

    /** Función global para forzar instalación en desarrollo */
    ENABLE_FORCE_INSTALL: ENV_CONFIG.IS_DEV
  }
} as const;

/**
 * Valores por defecto recomendados para diferentes entornos
 */
export const PWA_DEFAULTS = {
  /** Intervalo de verificación de actualizaciones (30 segundos) */
  UPDATE_INTERVAL: 30000,

  /** Timeout para detección de beforeinstallprompt (5 segundos) */
  INSTALL_PROMPT_TIMEOUT: 5000,

  /** Verificación inicial de actualizaciones (1 segundo) */
  INITIAL_CHECK_DELAY: 1000,

  /** Intervalo mínimo entre verificaciones forzadas (5 segundos) */
  MIN_FORCED_CHECK_INTERVAL: 5000
} as const;

/**
 * Tipos de configuración de PWA
 */
export type PWAConfig = typeof PWA_CONFIG;
export type PWADefaults = typeof PWA_DEFAULTS;
