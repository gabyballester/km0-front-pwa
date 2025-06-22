/* eslint-disable no-console */
import log from 'loglevel';

import { ENV_CONFIG } from '@constants';

// Configurar niveles por entorno
if (ENV_CONFIG.IS_PROD) {
  log.setLevel(log.levels.INFO); // Info, warn y error en producción
} else {
  log.setLevel(log.levels.DEBUG); // Todo en desarrollo
}

// Configuración del logger basada en el entorno
if (ENV_CONFIG.IS_PROD) {
  // En producción, solo mostrar errores y warnings
  console.log = () => {};
  console.info = () => {};
  console.debug = () => {};
}

/**
 * Logger personalizado para la aplicación
 *
 * Proporciona métodos de logging con diferentes niveles y configuración
 * automática según el entorno (desarrollo vs producción).
 *
 * En desarrollo: Muestra todos los niveles con colores en consola
 * En producción: Solo muestra errores para optimizar rendimiento
 *
 * @example
 * ```tsx
 * // Logging básico
 * logger.info('Aplicación iniciada correctamente');
 * logger.debug('Estado del usuario:', userState);
 * logger.warn('Función deprecada, usar nueva versión');
 * logger.error('Error al cargar datos:', error);
 *
 * // Logging con objetos
 * logger.info('Usuario autenticado:', {
 *   id: user.id,
 *   email: user.email,
 *   role: user.role
 * });
 *
 * // Logging de errores
 * try {
 *   const result = await fetchData();
 *   logger.info('Datos obtenidos:', result);
 * } catch (error) {
 *   logger.error('Error al obtener datos:', error);
 * }
 *
 * // Logging condicional
 * if (import.meta.env.DEV) {
 *   logger.debug('Información solo en desarrollo');
 * }
 *
 * // Logging de performance
 * const startTime = performance.now();
 * // ... operación costosa
 * const endTime = performance.now();
 * logger.info(`Operación completada en ${endTime - startTime}ms`);
 * ```
 */
const logger = {
  /**
   * Log de errores críticos
   * Siempre visible en producción
   */
  error: (...args: unknown[]) => {
    if (!ENV_CONFIG.IS_PROD) {
      console.error('%c[ERROR]', 'color: #ef4444; font-weight: bold;', ...args);
    } else {
      console.error('[ERROR]', ...args);
    }
    log.error('[ERROR]', ...args);
  },

  /**
   * Log de advertencias
   * Visible en desarrollo y producción
   */
  warn: (...args: unknown[]) => {
    if (!ENV_CONFIG.IS_PROD) {
      console.warn('%c[WARN]', 'color: #f59e0b; font-weight: bold;', ...args);
    } else {
      console.warn('[WARN]', ...args);
    }
    log.warn('[WARN]', ...args);
  },

  /**
   * Log de información general
   * Visible en desarrollo y producción
   */
  info: (...args: unknown[]) => {
    if (!ENV_CONFIG.IS_PROD) {
      console.info('%c[INFO]', 'color: #3b82f6; font-weight: bold;', ...args);
    } else {
      console.info('[INFO]', ...args);
    }
    log.info('[INFO]', ...args);
  },

  /**
   * Log de debugging
   * Solo visible en desarrollo
   */
  debug: (...args: unknown[]) => {
    if (!ENV_CONFIG.IS_PROD) {
      console.debug('[DEBUG]', ...args);
    }
    log.debug('[DEBUG]', ...args);
  }
};

export { logger };
