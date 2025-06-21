/**
 * Barrel export para utilidades de la aplicación
 * 
 * Este archivo exporta todas las utilidades disponibles en la aplicación,
 * organizadas por categorías: logging, strings, clases CSS, service worker
 * y gestión de caché.
 * 
 * @example
 * ```tsx
 * // Importar utilidades específicas
 * import { logger, combineClassNames, clearBrowserCache } from '@utils';
 * 
 * // Importar utilidades de service worker
 * import { 
 *   clearServiceWorkerCaches, 
 *   restartServiceWorker 
 * } from '@utils';
 * 
 * // Importar utilidades de caché
 * import { 
 *   clearBrowserCache, 
 *   verifyMainFiles 
 * } from '@utils';
 * 
 * // Uso en componentes
 * function MyComponent() {
 *   const handleError = () => {
 *     logger.error('Error en el componente');
 *   };
 * 
 *   const handleClearCache = async () => {
 *     await clearBrowserCache();
 *     logger.info('Caché limpiado');
 *   };
 * 
 *   return (
 *     <div className={combineClassNames('base-class', 'conditional-class')}>
 *       <button onClick={handleError}>Log Error</button>
 *       <button onClick={handleClearCache}>Limpiar Caché</button>
 *     </div>
 *   );
 * }
 * ```
 */

// Logger
export * from './logger';

// String utilities
export * from './stringUtils';

// CSS/Class utilities
export * from './classUtils';

// Service Worker utilities
export * from './swUtils';

// Cache utilities
export * from './cacheUtils';

// Build info utilities
export * from './buildInfo';
