import { useEffect, useRef } from 'react';

import { clearServiceWorkerSessionData, logger, restartServiceWorker } from '@/shared/utils';

interface ServiceWorkerMessage {
  type: string;
  version?: string;
  error?: string;
}

export const useServiceWorker = () => {
  const hasReloaded = useRef(false);
  const retryCount = useRef(0);
  const maxRetries = 3;
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    // Verificar si ya hemos recargado en esta sesión
    const sessionReloaded = sessionStorage.getItem('sw-reloaded');
    if (sessionReloaded === 'true') {
      hasReloaded.current = true;
      return;
    }

    const handleServiceWorkerMessage = (event: MessageEvent<ServiceWorkerMessage>) => {
      const { type, error } = event.data;

      switch (type) {
        case 'SW_ACTIVATED':
          if (isDev) {
            logger.info('Service Worker activated successfully');
          }
          break;

        case 'SW_RESOURCE_ERROR':
          logger.warn('Service Worker resource error detected:', error);

          // Solo intentar recargar si no lo hemos hecho antes y no hemos excedido los intentos
          if (!hasReloaded.current && retryCount.current < maxRetries) {
            retryCount.current++;
            logger.info(`Attempting page reload (attempt ${retryCount.current}/${maxRetries})`);

            // Marcar que hemos recargado en esta sesión
            sessionStorage.setItem('sw-reloaded', 'true');
            hasReloaded.current = true;

            // Pequeño delay para asegurar que el service worker se haya registrado
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else if (retryCount.current >= maxRetries) {
            logger.error('Max retry attempts reached for service worker errors');
            // Intentar reiniciar completamente el service worker
            restartServiceWorker();
          }
          break;

        default:
          break;
      }
    };

    // Escuchar mensajes del service worker
    navigator.serviceWorker?.addEventListener('message', handleServiceWorkerMessage);

    // Verificar si hay errores de MIME type en la consola
    const originalError = console.error;
    console.error = (...args) => {
      const errorMessage = args.join(' ');
      if (errorMessage.includes('MIME type') && errorMessage.includes('module script')) {
        logger.warn('MIME type error detected in console, attempting recovery...');

        if (!hasReloaded.current && retryCount.current < maxRetries) {
          retryCount.current++;
          logger.info(
            `Attempting page reload due to MIME error (attempt ${retryCount.current}/${maxRetries})`
          );

          sessionStorage.setItem('sw-reloaded', 'true');
          hasReloaded.current = true;

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else if (retryCount.current >= maxRetries) {
          logger.error('Max retry attempts reached, attempting service worker restart...');
          restartServiceWorker();
        }
      }
      originalError.apply(console, args);
    };

    return () => {
      navigator.serviceWorker?.removeEventListener('message', handleServiceWorkerMessage);
      console.error = originalError;
    };
  }, [isDev]);

  // Función para forzar la actualización del service worker
  const forceUpdate = () => {
    if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  // Función para reiniciar completamente el service worker
  const restart = async () => {
    await restartServiceWorker();
  };

  // Función para limpiar datos de sesión
  const clearSessionData = () => {
    clearServiceWorkerSessionData();
  };

  // Función para limpiar caché del service worker
  const clearCache = () => {
    if (navigator.serviceWorker?.controller) {
      const channel = new MessageChannel();
      channel.port1.onmessage = event => {
        if (event.data.success) {
          logger.info('Service worker cache cleared successfully');
        }
      };
      navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' }, [channel.port2]);
    }
  };

  return { forceUpdate, restart, clearSessionData, clearCache };
};
