import { logger } from './logger';

/**
 * Limpia el caché del navegador para archivos específicos
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
    sessionStorage.removeItem('sw-reloaded');
    sessionStorage.removeItem('app-initialized');

    // Limpiar localStorage de PWA
    localStorage.removeItem('pwa-update-preferences');

    logger.info('Browser cache cleared successfully');
  } catch (error) {
    logger.error('Error clearing browser cache:', error);
  }
};

/**
 * Fuerza la recarga de la página sin caché
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
