import { useEffect, useState } from 'react';

import { useServiceWorker } from '@/shared/hooks';
import { clearBrowserCache, logger, verifyMainFiles } from '@/shared/utils';

interface AppInitializerProps {
  children: React.ReactNode;
}

export const AppInitializer = ({ children }: AppInitializerProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const { forceUpdate, restart, clearCache } = useServiceWorker();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Verificar si ya se ha inicializado en esta sesión
        const sessionInitialized = sessionStorage.getItem('app-initialized');
        if (sessionInitialized === 'true') {
          setIsInitialized(true);
          setIsVerifying(false);
          return;
        }

        // Verificar integridad de archivos principales
        const filesValid = await verifyMainFiles();
        if (!filesValid) {
          logger.warn('Main files verification failed, clearing cache...');
          await clearBrowserCache();
          clearCache();

          // Recargar después de limpiar caché
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return;
        }

        // Verificar si hay errores de MIME type en la consola
        const originalError = console.error;
        let resourceErrorDetected = false;

        console.error = (...args) => {
          const errorMessage = args.join(' ');
          if (errorMessage.includes('MIME type') && errorMessage.includes('module script')) {
            resourceErrorDetected = true;
            logger.warn('Resource error detected during app initialization');
          }
          originalError.apply(console, args);
        };

        // Esperar un poco para que se carguen todos los módulos
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Restaurar console.error original
        console.error = originalError;

        // Si se detectó un error de recurso, intentar recargar
        if (resourceErrorDetected) {
          logger.info('Attempting to recover from resource error...');

          // Marcar que se ha intentado inicializar
          sessionStorage.setItem('app-initialized', 'true');

          // Intentar forzar actualización del service worker primero
          forceUpdate();

          // Limpiar caché y recargar
          await clearBrowserCache();
          clearCache();

          // Pequeño delay antes de recargar
          setTimeout(() => {
            window.location.reload();
          }, 500);

          return;
        }

        // Si no hay errores, marcar como inicializado
        sessionStorage.setItem('app-initialized', 'true');
        setIsInitialized(true);
        setIsVerifying(false);

        logger.info('App initialized successfully');
      } catch (error) {
        logger.error('Error during app initialization:', error);
        setHasError(true);
        setIsVerifying(false);
      }
    };

    initializeApp();
  }, [forceUpdate, clearCache]);

  // Mostrar pantalla de carga mientras se inicializa
  if (isVerifying) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900'>
        <div className='text-center'>
          <div className='mb-4 text-4xl'>🔍</div>
          <h2 className='mb-2 text-xl font-semibold text-gray-900 dark:text-white'>
            Verificando aplicación...
          </h2>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Comprobando integridad de archivos
          </p>
        </div>
      </div>
    );
  }

  // Mostrar pantalla de carga mientras se inicializa
  if (!isInitialized && !hasError) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900'>
        <div className='text-center'>
          <div className='mb-4 text-4xl'>🚀</div>
          <h2 className='mb-2 text-xl font-semibold text-gray-900 dark:text-white'>
            Inicializando aplicación...
          </h2>
          <p className='text-sm text-gray-600 dark:text-gray-400'>Preparando todo para ti</p>
        </div>
      </div>
    );
  }

  // Mostrar pantalla de error si algo salió mal
  if (hasError) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900'>
        <div className='text-center'>
          <div className='mb-4 text-4xl'>⚠️</div>
          <h2 className='mb-2 text-xl font-semibold text-gray-900 dark:text-white'>
            Error de inicialización
          </h2>
          <p className='mb-4 text-sm text-gray-600 dark:text-gray-400'>
            Hubo un problema al cargar la aplicación
          </p>
          <div className='space-y-2'>
            <button
              onClick={() => window.location.reload()}
              className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
            >
              Recargar página
            </button>
            <button
              onClick={() => restart()}
              className='ml-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700'
            >
              Reiniciar SW
            </button>
            <button
              onClick={async () => {
                await clearBrowserCache();
                clearCache();
                window.location.reload();
              }}
              className='ml-2 rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700'
            >
              Limpiar caché
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Si todo está bien, mostrar la aplicación
  return <>{children}</>;
};
