import { SESSION_KEYS } from '@constants';

import { logger } from './logger';

/**
 * Utilidades para gestión del Service Worker
 * 
 * Este módulo proporciona funciones para manejar el service worker,
 * incluyendo limpieza de cachés, actualizaciones y reinicio.
 * 
 * @example
 * ```tsx
 * import { 
 *   clearServiceWorkerCaches, 
 *   restartServiceWorker 
 * } from '@utils';
 * 
 * // Limpiar cachés del SW
 * const handleClearCache = async () => {
 *   await clearServiceWorkerCaches();
 *   console.log('Cachés limpiados');
 * };
 * 
 * // Reiniciar SW
 * const handleRestart = async () => {
 *   await restartServiceWorker();
 * };
 * ```
 */

/**
 * Limpia todos los cachés del service worker
 * 
 * Esta función elimina todos los caches almacenados por el service worker,
 * útil para resolver problemas de archivos obsoletos.
 * 
 * @example
 * ```tsx
 * // Limpiar cachés manualmente
 * const clearCaches = async () => {
 *   await clearServiceWorkerCaches();
 *   console.log('Cachés del SW limpiados');
 * };
 * 
 * // En un componente de administración
 * function AdminPanel() {
 *   const handleClearCaches = async () => {
 *     setLoading(true);
 *     await clearServiceWorkerCaches();
 *     setLoading(false);
 *     showNotification('Cachés limpiados');
 *   };
 * 
 *   return (
 *     <button onClick={handleClearCaches} disabled={loading}>
 *       Limpiar Cachés SW
 *     </button>
 *   );
 * }
 * ```
 */
export const clearServiceWorkerCaches = async (): Promise<void> => {
  try {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => {
          logger.info(`Deleting cache: ${cacheName}`);
          return caches.delete(cacheName);
        })
      );
      logger.info('All service worker caches cleared');
    }
  } catch (error) {
    logger.error('Error clearing service worker caches:', error);
  }
};

/**
 * Desregistra el service worker actual
 * 
 * Esta función elimina completamente el service worker registrado,
 * útil para resolver problemas de actualización.
 * 
 * @example
 * ```tsx
 * // Desregistrar SW
 * const unregisterSW = async () => {
 *   await unregisterServiceWorker();
 *   console.log('SW desregistrado');
 * };
 * 
 * // En un componente de debug
 * function DebugPanel() {
 *   const handleUnregister = async () => {
 *     await unregisterServiceWorker();
 *     window.location.reload();
 *   };
 * 
 *   return (
 *     <button onClick={handleUnregister}>
 *       Desregistrar SW
 *     </button>
 *   );
 * }
 * ```
 */
export const unregisterServiceWorker = async (): Promise<void> => {
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map(registration => {
          logger.info('Unregistering service worker');
          return registration.unregister();
        })
      );
      logger.info('Service worker unregistered');
    }
  } catch (error) {
    logger.error('Error unregistering service worker:', error);
  }
};

/**
 * Fuerza la actualización del service worker
 * 
 * Esta función envía un mensaje al service worker para que
 * se actualice inmediatamente sin esperar.
 * 
 * @example
 * ```tsx
 * // Forzar actualización
 * const forceUpdate = async () => {
 *   await forceServiceWorkerUpdate();
 *   console.log('Actualización forzada');
 * };
 * 
 * // En un componente de actualización
 * function UpdateNotification() {
 *   const handleForceUpdate = async () => {
 *     await forceServiceWorkerUpdate();
 *     window.location.reload();
 *   };
 * 
 *   return (
 *     <div>
 *       <p>Nueva versión disponible</p>
 *       <button onClick={handleForceUpdate}>
 *         Actualizar Ahora
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export const forceServiceWorkerUpdate = async (): Promise<void> => {
  try {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
      logger.info('Service worker update forced');
    }
  } catch (error) {
    logger.error('Error forcing service worker update:', error);
  }
};

/**
 * Verifica si hay errores de MIME type en la consola
 * 
 * Esta función intercepta temporalmente console.error para detectar
 * errores de MIME type que pueden indicar problemas de carga.
 * 
 * @returns true si se detectó un error de MIME type
 * 
 * @example
 * ```tsx
 * // Verificar errores de MIME
 * const checkMimeErrors = () => {
 *   const hasError = checkForMimeTypeErrors();
 *   if (hasError) {
 *     console.log('Error de MIME type detectado');
 *     // Manejar el error
 *   }
 * };
 * 
 * // En un hook de diagnóstico
 * function useDiagnostics() {
 *   useEffect(() => {
 *     const hasMimeError = checkForMimeTypeErrors();
 *     if (hasMimeError) {
 *       // Reportar el error o tomar acción
 *       reportError('MIME type error detected');
 *     }
 *   }, []);
 * }
 * ```
 */
export const checkForMimeTypeErrors = (): boolean => {
  const originalError = console.error;
  let hasMimeError = false;

  console.error = (...args) => {
    const errorMessage = args.join(' ');
    if (errorMessage.includes('MIME type') && errorMessage.includes('module script')) {
      hasMimeError = true;
      logger.warn('MIME type error detected');
    }
    originalError.apply(console, args);
  };

  // Restaurar después de un breve delay
  setTimeout(() => {
    console.error = originalError;
  }, 100);

  return hasMimeError;
};

/**
 * Limpia el sessionStorage relacionado con el service worker
 * 
 * Esta función elimina las claves de sessionStorage que controlan
 * el comportamiento del service worker.
 * 
 * @example
 * ```tsx
 * // Limpiar datos de sesión del SW
 * const clearSessionData = () => {
 *   clearServiceWorkerSessionData();
 *   console.log('Datos de sesión limpiados');
 * };
 * 
 * // En un componente de reset
 * function ResetButton() {
 *   const handleReset = () => {
 *     clearServiceWorkerSessionData();
 *     window.location.reload();
 *   };
 * 
 *   return (
 *     <button onClick={handleReset}>
 *       Resetear SW
 *     </button>
 *   );
 * }
 * ```
 */
export const clearServiceWorkerSessionData = (): void => {
  try {
    sessionStorage.removeItem(SESSION_KEYS.SW_RELOADED);
    sessionStorage.removeItem(SESSION_KEYS.APP_INITIALIZED);
    logger.info('Service worker session data cleared');
  } catch (error) {
    logger.error('Error clearing service worker session data:', error);
  }
};

/**
 * Reinicia completamente el service worker
 * 
 * Esta función realiza un reinicio completo del service worker:
 * limpia cachés, desregistra el SW y recarga la página.
 * 
 * @example
 * ```tsx
 * // Reiniciar SW completo
 * const restartSW = async () => {
 *   await restartServiceWorker();
 *   // La página se recargará automáticamente
 * };
 * 
 * // En un componente de administración
 * function ServiceWorkerAdmin() {
 *   const handleRestart = async () => {
 *     setLoading(true);
 *     await restartServiceWorker();
 *     // No necesitas setLoading(false) porque se recarga la página
 *   };
 * 
 *   return (
 *     <button onClick={handleRestart} disabled={loading}>
 *       {loading ? 'Reiniciando...' : 'Reiniciar SW'}
 *     </button>
 *   );
 * }
 * 
 * // En un componente de error
 * function ErrorRecovery() {
 *   const handleRecovery = async () => {
 *     try {
 *       await restartServiceWorker();
 *     } catch (error) {
 *       console.error('Error al reiniciar SW:', error);
 *       window.location.reload();
 *     }
 *   };
 * 
 *   return (
 *     <div>
 *       <p>Error del Service Worker</p>
 *       <button onClick={handleRecovery}>
 *         Intentar Recuperar
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export const restartServiceWorker = async (): Promise<void> => {
  try {
    logger.info('Restarting service worker...');

    // Limpiar cachés
    await clearServiceWorkerCaches();

    // Limpiar datos de sesión
    clearServiceWorkerSessionData();

    // Desregistrar service worker
    await unregisterServiceWorker();

    // Recargar página
    window.location.reload();
  } catch (error) {
    logger.error('Error restarting service worker:', error);
  }
};
