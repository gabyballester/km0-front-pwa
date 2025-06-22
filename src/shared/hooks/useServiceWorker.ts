import { useEffect, useRef } from 'react';

import { clearServiceWorkerSessionData, logger, restartServiceWorker } from '@utils';

import { ENV_CONFIG, SESSION_KEYS } from '@constants';

interface ServiceWorkerMessage {
  type: string;
  version?: string;
  error?: string;
}

/**
 * Hook para manejar el Service Worker de la aplicación PWA
 *
 * Proporciona funcionalidades para gestionar el Service Worker, incluyendo
 * detección de errores, recuperación automática, actualización forzada
 * y limpieza de caché.
 *
 * @example
 * ```tsx
 * // Uso básico en App.tsx
 * function App() {
 *   const { forceUpdate, restart, clearCache } = useServiceWorker();
 *
 *   return (
 *     <div>
 *       <AppContent />
 *     </div>
 *   );
 * }
 *
 * // Uso con controles manuales
 * function ServiceWorkerControls() {
 *   const { forceUpdate, restart, clearCache, clearSessionData } = useServiceWorker();
 *
 *   return (
 *     <div className="space-y-2">
 *       <Button onClick={forceUpdate}>
 *         Forzar Actualización
 *       </Button>
 *       <Button onClick={restart}>
 *         Reiniciar Service Worker
 *       </Button>
 *       <Button onClick={clearCache}>
 *         Limpiar Caché
 *       </Button>
 *       <Button onClick={clearSessionData}>
 *         Limpiar Datos de Sesión
 *       </Button>
 *     </div>
 *   );
 * }
 *
 * // Uso con notificaciones de estado
 * function ServiceWorkerStatus() {
 *   const { forceUpdate } = useServiceWorker();
 *   const [hasUpdate, setHasUpdate] = useState(false);
 *
 *   useEffect(() => {
 *     // Escuchar actualizaciones del service worker
 *     navigator.serviceWorker?.addEventListener('controllerchange', () => {
 *       setHasUpdate(true);
 *     });
 *   }, []);
 *
 *   if (hasUpdate) {
 *     return (
 *       <div className="bg-blue-100 p-4 rounded">
 *         <p>Hay una nueva versión disponible</p>
 *         <Button onClick={forceUpdate}>
 *           Actualizar Ahora
 *         </Button>
 *       </div>
 *     );
 *   }
 *
 *   return null;
 * }
 * ```
 *
 * @returns Objeto con funciones para gestionar el Service Worker
 */
export const useServiceWorker = () => {
  const hasReloaded = useRef(false);
  const retryCount = useRef(0);
  const maxRetries = 3;
  const isDev = ENV_CONFIG.IS_DEV;

  useEffect(() => {
    // Verificar si ya hemos recargado en esta sesión
    const sessionReloaded = sessionStorage.getItem(SESSION_KEYS.SW_RELOADED);
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
            sessionStorage.setItem(SESSION_KEYS.SW_RELOADED, 'true');
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

          sessionStorage.setItem(SESSION_KEYS.SW_RELOADED, 'true');
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
