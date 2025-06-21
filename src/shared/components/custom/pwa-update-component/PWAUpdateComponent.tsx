import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useRegisterSW } from 'virtual:pwa-register/react';

import { Button, Modal } from '@components';

import { logger } from '@utils';

import { STORAGE_KEYS } from '@constants';

/**
 * Preferencias de actualización del PWA
 */
interface UpdatePreferences {
  /** Actualización automática */
  autoUpdate: boolean;
  /** Mostrar notificaciones */
  showNotifications: boolean;
}

const DEFAULT_PREFERENCES: UpdatePreferences = {
  autoUpdate: true,
  showNotifications: true
};

/**
 * Componente para manejar actualizaciones de PWA
 * 
 * Este componente gestiona las actualizaciones de la Progressive Web App,
 * incluyendo detección de nuevas versiones, actualización automática/manual,
 * y notificaciones al usuario.
 * 
 * Características:
 * - Detección automática de actualizaciones
 * - Actualización automática o manual
 * - Persistencia de preferencias del usuario
 * - Notificaciones de estado offline
 * - Manejo de errores de recursos
 * - Interfaz de usuario para control de actualizaciones
 * 
 * @example
 * ```tsx
 * // Uso básico en el punto de entrada de la aplicación
 * function App() {
 *   return (
 *     <div>
 *       <PWAUpdateComponent />
 *       <Router>
 *         <Routes>
 *           <Route path="/" element={<HomePage />} />
 *         </Routes>
 *       </Router>
 *     </div>
 *   );
 * }
 * 
 * // Con configuración personalizada
 * function App() {
 *   return (
 *     <ErrorBoundary>
 *       <ThemeProvider>
 *         <PWAUpdateComponent />
 *         <AppContent />
 *       </ThemeProvider>
 *     </ErrorBoundary>
 *   );
 * }
 * ```
 */
export const PWAUpdateComponent = () => {
  const { t } = useTranslation();
  const [preferences, setPreferences] = useState<UpdatePreferences>(DEFAULT_PREFERENCES);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [resourceErrorDetected, setResourceErrorDetected] = useState(false);

  const {
    needRefresh: [needRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(registration) {
      logger.info('SW registered: ', registration);
    },
    onRegisterError(error) {
      logger.error('SW registration error', error);

      // Verificar si es un error de MIME type o recurso no encontrado
      if (
        error.message &&
        (error.message.includes('MIME type') ||
          error.message.includes('Failed to load') ||
          error.message.includes('404'))
      ) {
        setResourceErrorDetected(true);
        logger.warn('Resource error detected during registration');
      }
    }
  });

  // Cargar preferencias al montar el componente
  useEffect(() => {
    const savedPreferences = localStorage.getItem(STORAGE_KEYS.PWA_UPDATE_PREFERENCES);
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      } catch (error) {
        logger.error('Error parsing PWA preferences:', error);
      }
    }
  }, []);

  // Guardar preferencias cuando cambien
  const updatePreferences = (newPreferences: Partial<UpdatePreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    localStorage.setItem(STORAGE_KEYS.PWA_UPDATE_PREFERENCES, JSON.stringify(updated));
  };

  // Manejar actualización automática
  useEffect(() => {
    if (needRefresh && preferences.autoUpdate) {
      logger.info('Auto-updating PWA...');
      updateServiceWorker(true);
    }
  }, [needRefresh, preferences.autoUpdate, updateServiceWorker]);

  // Mostrar diálogo de actualización manual
  useEffect(() => {
    if (needRefresh && !preferences.autoUpdate && preferences.showNotifications) {
      setShowUpdateDialog(true);
    }
  }, [needRefresh, preferences.autoUpdate, preferences.showNotifications]);

  // Manejar actualización manual
  const handleUpdate = async () => {
    try {
      await updateServiceWorker(true);
      setShowUpdateDialog(false);
      logger.info('PWA updated successfully');
    } catch (error) {
      logger.error('Error updating PWA:', error);
    }
  };

  // Manejar actualización automática
  const handleAutoUpdate = () => {
    updatePreferences({ autoUpdate: true });
    handleUpdate();
  };

  // Manejar actualización manual
  const handleManualUpdate = () => {
    updatePreferences({ autoUpdate: false });
    handleUpdate();
  };

  // Deshabilitar notificaciones
  const handleDisableNotifications = () => {
    updatePreferences({ showNotifications: false });
    setShowUpdateDialog(false);
  };

  // Mostrar mensaje de error de recurso
  if (resourceErrorDetected) {
    return (
      <div className='fixed top-4 left-4 z-50 rounded-lg bg-red-600 p-4 text-white shadow-lg max-w-sm'>
        <div className='flex items-start gap-3'>
          <div className='flex-shrink-0'>
            <span className='text-lg'>⚠️</span>
          </div>
          <div className='flex-1'>
            <h4 className='mb-1 text-sm font-medium'>{t('pwa.error.title')}</h4>
            <p className='mb-3 text-xs text-red-100'>
              {t('pwa.error.description')}
            </p>
            <Button
              onClick={() => setResourceErrorDetected(false)}
              className='h-6 rounded bg-red-700 px-2 py-1 text-xs hover:bg-red-800'
            >
              {t('pwa.error.understood')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar mensaje de offline ready
  if (offlineReady) {
    return (
      <div className='fixed top-4 left-4 z-50 rounded-lg bg-blue-600 p-4 text-white shadow-lg max-w-sm'>
        <div className='flex items-start gap-3'>
          <div className='flex-shrink-0'>
            <span className='text-lg'>📱</span>
          </div>
          <div className='flex-1'>
            <h4 className='mb-1 text-sm font-medium'>{t('pwa.offline.title')}</h4>
            <p className='mb-3 text-xs text-blue-100'>
              {t('pwa.offline.description')}
            </p>
            <Button
              onClick={() => setOfflineReady(false)}
              className='h-6 rounded bg-blue-700 px-2 py-1 text-xs hover:bg-blue-800'
            >
              {t('pwa.offline.understood')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar diálogo de actualización
  if (showUpdateDialog) {
    return (
      <Modal
        open={showUpdateDialog}
        onOpenChange={setShowUpdateDialog}
        title={t('pwa.update.title')}
        description={t('pwa.update.description')}
      >
        <div className='space-y-4'>
          <p className='text-sm text-gray-600'>
            {t('pwa.update.message')}
          </p>

          <div className='flex flex-col gap-2'>
            <Button onClick={handleAutoUpdate} className='w-full'>
              {t('pwa.update.updateAndRemember')}
            </Button>
            <Button onClick={handleManualUpdate} variant='outline' className='w-full'>
              {t('pwa.update.updateOnce')}
            </Button>
            <Button onClick={handleDisableNotifications} variant='ghost' className='w-full'>
              {t('pwa.update.dontShowAgain')}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return null;
};
