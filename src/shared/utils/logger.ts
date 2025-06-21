import log from 'loglevel';

// Configurar niveles por entorno
if (import.meta.env.PROD) {
  log.setLevel(log.levels.ERROR); // Solo errores en producción
} else {
  log.setLevel(log.levels.DEBUG); // Todo en desarrollo
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
    if (!import.meta.env.PROD) {
      console.error('%c[ERROR]', 'color: #ef4444; font-weight: bold;', ...args);
    }
    log.error('[ERROR]', ...args);
  },

  /**
   * Log de advertencias
   * Visible en desarrollo, filtrado en producción
   */
  warn: (...args: unknown[]) => {
    if (!import.meta.env.PROD) {
      console.warn('%c[WARN]', 'color: #f59e0b; font-weight: bold;', ...args);
    }
    log.warn('[WARN]', ...args);
  },

  /**
   * Log de información general
   * Visible en desarrollo, filtrado en producción
   */
  info: (...args: unknown[]) => {
    log.info('[INFO]', ...args);
  },

  /**
   * Log de debugging
   * Solo visible en desarrollo
   */
  debug: (...args: unknown[]) => {
    log.debug('[DEBUG]', ...args);
  }
};

export { logger };

