import { useEffect, useState } from 'react';

import { useRegisterSW } from 'virtual:pwa-register/react';

import { Button, Modal } from '@/shared/components';
import { logger } from '@/shared/utils';

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
            <h4 className='mb-1 text-sm font-medium'>Error de carga detectado</h4>
            <p className='mb-3 text-xs text-red-100'>
              Se detectó un problema al cargar la aplicación. Esto se resolverá automáticamente.
            </p>
            <Button
              onClick={() => setResourceErrorDetected(false)}
              className='h-6 rounded bg-red-700 px-2 py-1 text-xs hover:bg-red-800'
            >
              Entendido
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

  // Mostrar diálogo de actualización
  if (showUpdateDialog) {
    return (
      <Modal
        open={showUpdateDialog}
        onOpenChange={setShowUpdateDialog}
        title='Actualización disponible'
        description='Hay una nueva versión de la aplicación disponible.'
      >
        <div className='space-y-4'>
          <p className='text-sm text-gray-600'>
            Se ha detectado una nueva versión de la aplicación. ¿Deseas actualizar ahora?
          </p>

          <div className='flex flex-col gap-2'>
            <Button onClick={handleAutoUpdate} className='w-full'>
              Actualizar y recordar
            </Button>
            <Button onClick={handleManualUpdate} variant='outline' className='w-full'>
              Actualizar solo esta vez
            </Button>
            <Button onClick={handleDisableNotifications} variant='ghost' className='w-full'>
              No mostrar de nuevo
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return null;
};
