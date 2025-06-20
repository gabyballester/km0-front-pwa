import { logger } from './logger';

/**
 * Limpia todos los cachés del service worker
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
 */
export const clearServiceWorkerSessionData = (): void => {
  try {
    sessionStorage.removeItem('sw-reloaded');
    sessionStorage.removeItem('app-initialized');
    logger.info('Service worker session data cleared');
  } catch (error) {
    logger.error('Error clearing service worker session data:', error);
  }
};

/**
 * Reinicia completamente el service worker
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
