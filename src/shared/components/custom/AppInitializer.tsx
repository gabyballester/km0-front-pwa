import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { clearBrowserCache, logger, verifyMainFiles } from '@utils';

import { useServiceWorker } from '@hooks';

import { SESSION_KEYS } from '@constants';

import { AppLoader } from './AppLoader';

interface AppInitializerProps {
  children: React.ReactNode;
}

/**
 * Componente AppInitializer para gestionar la inicialización de la aplicación
 * 
 * Este componente se encarga de:
 * - Verificar la integridad de archivos principales
 * - Detectar y manejar errores de MIME type
 * - Gestionar el service worker
 * - Mostrar pantallas de carga y error apropiadas
 * - Prevenir inicializaciones múltiples en la misma sesión
 * 
 * @example
 * ```tsx
 * // Uso básico en el punto de entrada de la aplicación
 * function App() {
 *   return (
 *     <AppInitializer>
 *       <Router>
 *         <Routes>
 *           <Route path="/" element={<HomePage />} />
 *         </Routes>
 *       </Router>
 *     </AppInitializer>
 *   );
 * }
 * 
 * // Con configuración adicional
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <AppInitializer>
 *         <AuthProvider>
 *           <Router>
 *             <AppContent />
 *           </Router>
 *         </AuthProvider>
 *       </AppInitializer>
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export const AppInitializer = ({ children }: AppInitializerProps) => {
  const { t } = useTranslation();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { forceUpdate, restart, clearCache } = useServiceWorker();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Verificar si ya se ha inicializado en esta sesión
        const sessionInitialized = sessionStorage.getItem(SESSION_KEYS.APP_INITIALIZED);
        if (sessionInitialized === 'true') {
          setIsLoading(false);
          return;
        }

        // Proceso de inicialización unificado
        logger.info(t('loading.appInit.title'));

        // 1. Verificar integridad de archivos principales
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

        // 2. Verificar si hay errores de MIME type en la consola
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

        // 3. Esperar un poco para que se carguen todos los módulos
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Restaurar console.error original
        console.error = originalError;

        // 4. Si se detectó un error de recurso, intentar recargar
        if (resourceErrorDetected) {
          logger.info('Attempting to recover from resource error...');

          // Marcar que se ha intentado inicializar
          sessionStorage.setItem(SESSION_KEYS.APP_INITIALIZED, 'true');

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

        // 5. Si no hay errores, marcar como inicializado
        sessionStorage.setItem(SESSION_KEYS.APP_INITIALIZED, 'true');
        setIsLoading(false);

        logger.info('App initialized successfully');
      } catch (error) {
        logger.error('Error during app initialization:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [forceUpdate, clearCache, t]);

  // Mostrar pantalla de carga mientras se inicializa
  if (isLoading) {
    return <AppLoader variant="app-init" />;
  }

  // Mostrar pantalla de error si algo salió mal
  if (hasError) {
    return (
      <AppLoader
        variant="error"
        actions={
          <div className='space-y-2'>
            <button
              onClick={() => window.location.reload()}
              className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
            >
              {t('loading.actions.reloadPage')}
            </button>
            <button
              onClick={() => restart()}
              className='ml-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700'
            >
              {t('loading.actions.restartSW')}
            </button>
            <button
              onClick={async () => {
                await clearBrowserCache();
                clearCache();
                window.location.reload();
              }}
              className='ml-2 rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700'
            >
              {t('loading.actions.clearCache')}
            </button>
          </div>
        }
      />
    );
  }

  // Si todo está bien, mostrar la aplicación
  return <>{children}</>;
};
