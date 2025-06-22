import { SESSION_KEYS, STORAGE_KEYS } from '@constants';

import { logger } from './logger';

/**
 * Limpia el caché del navegador para archivos específicos
 *
 * Esta función elimina todos los caches de la aplicación, incluyendo
 * sessionStorage y localStorage relacionados con el service worker.
 *
 * @example
 * ```tsx
 * // Limpiar caché manualmente
 * const handleClearCache = async () => {
 *   await clearBrowserCache();
 *   console.log('Caché limpiado exitosamente');
 * };
 *
 * // En un componente de configuración
 * function SettingsPage() {
 *   const handleResetApp = async () => {
 *     await clearBrowserCache();
 *     window.location.reload();
 *   };
 *
 *   return (
 *     <button onClick={handleResetApp}>
 *       Resetear Aplicación
 *     </button>
 *   );
 * }
 * ```
 */
export const clearBrowserCache = async (): Promise<void> => {
  try {
    // Limpiar caché de la aplicación
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => {
          logger.info(`Clearing browser cache: ${cacheName}`);
          return caches.delete(cacheName);
        })
      );
    }

    // Limpiar sessionStorage y localStorage relacionado con el service worker
    sessionStorage.removeItem(SESSION_KEYS.SW_RELOADED);
    sessionStorage.removeItem(SESSION_KEYS.APP_INITIALIZED);

    // Limpiar localStorage de PWA
    localStorage.removeItem(STORAGE_KEYS.PWA_UPDATE_PREFERENCES);

    logger.info('Browser cache cleared successfully');
  } catch (error) {
    logger.error('Error clearing browser cache:', error);
  }
};

/**
 * Fuerza la recarga de la página sin caché
 *
 * Esta función limpia el caché y luego recarga la página,
 * asegurando que se carguen los archivos más recientes.
 *
 * @example
 * ```tsx
 * // Recargar después de una actualización
 * const handleUpdate = () => {
 *   forceReload();
 * };
 *
 * // En un componente de error
 * function ErrorBoundary() {
 *   const handleRetry = () => {
 *     forceReload();
 *   };
 *
 *   return (
 *     <div>
 *       <p>Algo salió mal</p>
 *       <button onClick={handleRetry}>
 *         Reintentar
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export const forceReload = (): void => {
  try {
    // Limpiar caché antes de recargar
    clearBrowserCache().then(() => {
      // Forzar recarga sin caché
      window.location.reload();
    });
  } catch (error) {
    logger.error('Error during force reload:', error);
    // Fallback: recarga simple
    window.location.reload();
  }
};

/**
 * Verifica si hay archivos obsoletos en el caché
 *
 * Esta función revisa todos los archivos en caché y verifica
 * si aún existen en el servidor.
 *
 * @returns Array de URLs de archivos obsoletos
 *
 * @example
 * ```tsx
 * // Verificar archivos obsoletos
 * const checkStaleFiles = async () => {
 *   const staleFiles = await checkForStaleFiles();
 *   if (staleFiles.length > 0) {
 *     console.log('Archivos obsoletos encontrados:', staleFiles);
 *     await clearBrowserCache();
 *   }
 * };
 *
 * // En un hook de mantenimiento
 * function useCacheMaintenance() {
 *   useEffect(() => {
 *     const interval = setInterval(async () => {
 *       const staleFiles = await checkForStaleFiles();
 *       if (staleFiles.length > 5) {
 *         await clearBrowserCache();
 *       }
 *     }, 60000); // Cada minuto
 *
 *     return () => clearInterval(interval);
 *   }, []);
 * }
 * ```
 */
export const checkForStaleFiles = async (): Promise<string[]> => {
  try {
    const staleFiles: string[] = [];

    if ('caches' in window) {
      const cacheNames = await caches.keys();

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();

        for (const request of requests) {
          const url = request.url;
          // Verificar si el archivo existe realmente
          try {
            const response = await fetch(url, {
              method: 'HEAD',
              cache: 'no-cache'
            });

            if (!response.ok) {
              staleFiles.push(url);
              logger.warn(`Stale file detected: ${url}`);
            }
          } catch (error) {
            staleFiles.push(url);
            logger.warn(`Failed to verify file: ${url}`, error);
          }
        }
      }
    }

    return staleFiles;
  } catch (error) {
    logger.error('Error checking for stale files:', error);
    return [];
  }
};

/**
 * Limpia archivos obsoletos del caché
 *
 * Esta función verifica archivos obsoletos y limpia el caché
 * si encuentra alguno.
 *
 * @example
 * ```tsx
 * // Limpiar archivos obsoletos
 * const cleanupCache = async () => {
 *   await clearStaleFiles();
 *   console.log('Limpieza de caché completada');
 * };
 *
 * // En un componente de administración
 * function AdminPanel() {
 *   const handleCacheCleanup = async () => {
 *     setLoading(true);
 *     await clearStaleFiles();
 *     setLoading(false);
 *     showNotification('Caché limpiado exitosamente');
 *   };
 *
 *   return (
 *     <button onClick={handleCacheCleanup} disabled={loading}>
 *       {loading ? 'Limpiando...' : 'Limpiar Caché'}
 *     </button>
 *   );
 * }
 * ```
 */
export const clearStaleFiles = async (): Promise<void> => {
  try {
    const staleFiles = await checkForStaleFiles();

    if (staleFiles.length > 0) {
      logger.info(`Found ${staleFiles.length} stale files, clearing cache...`);
      await clearBrowserCache();
    } else {
      logger.info('No stale files found');
    }
  } catch (error) {
    logger.error('Error clearing stale files:', error);
  }
};

/**
 * Verifica la integridad de los archivos principales
 *
 * Esta función verifica que los archivos principales de la aplicación
 * (index.html, manifest, service worker) estén disponibles.
 *
 * @returns true si todos los archivos están disponibles, false en caso contrario
 *
 * @example
 * ```tsx
 * // Verificar integridad al inicializar
 * const initializeApp = async () => {
 *   const filesValid = await verifyMainFiles();
 *   if (!filesValid) {
 *     console.error('Archivos principales no disponibles');
 *     await clearBrowserCache();
 *     window.location.reload();
 *   }
 * };
 *
 * // En un componente de inicialización
 * function AppInitializer() {
 *   useEffect(() => {
 *     const checkIntegrity = async () => {
 *       const isValid = await verifyMainFiles();
 *       if (!isValid) {
 *         setError('Error de integridad de archivos');
 *         await forceReload();
 *       }
 *     };
 *
 *     checkIntegrity();
 *   }, []);
 *
 *   if (error) {
 *     return <ErrorDisplay message={error} />;
 *   }
 *
 *   return <App />;
 * }
 * ```
 */
export const verifyMainFiles = async (): Promise<boolean> => {
  try {
    const mainFiles = ['/index.html', '/manifest.webmanifest', '/sw.js'];

    for (const file of mainFiles) {
      try {
        const response = await fetch(file, {
          method: 'HEAD',
          cache: 'no-cache'
        });

        if (!response.ok) {
          logger.error(`Main file not found: ${file}`);
          return false;
        }
      } catch (error) {
        logger.error(`Failed to verify main file: ${file}`, error);
        return false;
      }
    }

    return true;
  } catch (error) {
    logger.error('Error verifying main files:', error);
    return false;
  }
};
