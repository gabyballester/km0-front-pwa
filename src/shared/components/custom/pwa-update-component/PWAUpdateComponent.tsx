import { useEffect, useState } from 'react';

import { useRegisterSW } from 'virtual:pwa-register/react';

import { Button } from '@/shared/components/ui/button';
import { Modal } from '@/shared/components/ui/modal';
import { logger } from '@/shared/utils/logger';

interface UpdatePreferences {
  autoUpdate: boolean;
  showNotifications: boolean;
}

const DEFAULT_PREFERENCES: UpdatePreferences = {
  autoUpdate: true,
  showNotifications: true
};

const STORAGE_KEY = 'pwa-update-preferences';

export const PWAUpdateComponent = () => {
  const [preferences, setPreferences] = useState<UpdatePreferences>(DEFAULT_PREFERENCES);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

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
    }
  });

  // Cargar preferencias al montar el componente
  useEffect(() => {
    const savedPreferences = localStorage.getItem(STORAGE_KEY);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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

  // Cerrar diálogo
  const handleClose = () => {
    setShowUpdateDialog(false);
  };

  // Deshabilitar notificaciones
  const handleDisableNotifications = () => {
    updatePreferences({ showNotifications: false });
    setShowUpdateDialog(false);
  };

  // Función temporal para simular actualización (solo en desarrollo)
  const simulateUpdate = () => {
    if (import.meta.env.DEV) {
      setShowUpdateDialog(true);
    }
  };

  // Mostrar mensaje de offline ready
  if (offlineReady) {
    return (
      <div className='fixed top-4 left-4 z-50 rounded-lg bg-blue-600 p-4 text-white shadow-lg max-w-sm'>
        <div className='flex items-start gap-3'>
          <div className='flex-shrink-0'>
            <span className='text-lg'>📱</span>
          </div>
          <div className='flex-1'>
            <h4 className='mb-1 text-sm font-medium'>App lista para usar offline</h4>
            <p className='mb-3 text-xs text-blue-100'>
              La aplicación ahora puede funcionar sin conexión a internet. Los datos se
              sincronizarán cuando vuelvas a estar online.
            </p>
            <Button
              onClick={() => setOfflineReady(false)}
              className='h-6 rounded bg-blue-700 px-2 py-1 text-xs hover:bg-blue-800'
            >
              Entendido
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar diálogo de actualización usando el Modal del proyecto
  if (showUpdateDialog) {
    return (
      <Modal
        open={showUpdateDialog}
        onOpenChange={setShowUpdateDialog}
        title='Nueva versión disponible'
        description='Puedes actualizar ahora para obtener las últimas mejoras, o esperar y se actualizará automáticamente la próxima vez que abras la app.'
        size='sm'
      >
        <div className='space-y-4'>
          <div className='flex items-start gap-3'>
            <span className='text-2xl'>🔄</span>
            <div className='flex-1'>
              <h4 className='font-medium text-gray-900 dark:text-white'>
                ¿Qué incluye esta actualización?
              </h4>
              <p className='mt-1 text-sm text-gray-600 dark:text-gray-300'>
                Mejoras de rendimiento, correcciones de errores y nuevas funcionalidades.
              </p>
            </div>
          </div>
        </div>
        <Modal.Footer>
          <div className='flex flex-col gap-2 w-full'>
            <Button onClick={handleAutoUpdate} className='w-full bg-blue-600 hover:bg-blue-700'>
              Actualizar y recordar preferencia
            </Button>
            <Button onClick={handleManualUpdate} variant='outline' className='w-full'>
              Actualizar solo esta vez
            </Button>
            <div className='flex justify-between pt-2'>
              <Button
                onClick={handleDisableNotifications}
                variant='ghost'
                className='text-xs text-gray-500 hover:text-gray-700'
              >
                No mostrar de nuevo
              </Button>
              <Button
                onClick={handleClose}
                variant='ghost'
                className='text-xs text-gray-500 hover:text-gray-700'
              >
                Más tarde
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }

  // Botón temporal para simular actualización (solo en desarrollo)
  if (import.meta.env.DEV) {
    return (
      <div className='fixed top-4 right-4 z-50'>
        <Button
          onClick={simulateUpdate}
          variant='outline'
          size='sm'
          className='bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
        >
          🔄 Simular Actualización
        </Button>
      </div>
    );
  }

  return null;
};
