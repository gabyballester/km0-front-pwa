import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useRegisterSW } from 'virtual:pwa-register/react';

import { Button, Modal } from '@components';

import { logger } from '@utils';

import { PWA_CONFIG, STORAGE_KEYS } from '@constants';

/**
 * Preferencias de actualización del PWA
 * 
 * Estas preferencias controlan cómo se manejan las actualizaciones de la PWA.
 * Las preferencias del usuario tienen prioridad sobre las preferencias por defecto.
 * 
 * @example
 * ```typescript
 * // Preferencias por defecto
 * const DEFAULT_PREFERENCES = {
 *   autoUpdate: false,        // Siempre preguntar antes de actualizar
 *   showNotifications: true   // Mostrar diálogos de actualización
 * };
 * 
 * // Preferencias del usuario (tienen prioridad)
 * const userPreferences = {
 *   autoUpdate: true,         // Actualizar automáticamente
 *   showNotifications: false  // No mostrar diálogos
 * };
 * 
 * // Resultado final: las preferencias del usuario sobrescriben las por defecto
 * const finalPreferences = { ...DEFAULT_PREFERENCES, ...userPreferences };
 * // Resultado: { autoUpdate: true, showNotifications: false }
 * ```
 */
interface UpdatePreferences {
  /** Actualización automática */
  autoUpdate: boolean;
  /** Mostrar notificaciones */
  showNotifications: boolean;
}

const DEFAULT_PREFERENCES: UpdatePreferences = {
  autoUpdate: true, // Actualizar automáticamente
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
 * Configuración:
 * - VITE_PWA_UPDATE_INTERVAL: Intervalo de verificación en milisegundos (default: 10000)
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
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [newVersion, setNewVersion] = useState<string>('');
  const [resourceErrorDetected, setResourceErrorDetected] = useState(false);

  // Configuración del intervalo de verificación (configurable por variables de entorno)
  const UPDATE_CHECK_INTERVAL = PWA_CONFIG.UPDATE_CHECK_INTERVAL;

  const {
    needRefresh: [needRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(registration) {
      logger.info('SW registered: ', registration);
      
      // Verificar si hay una nueva versión disponible
      if (registration) {
        registration.addEventListener('updatefound', () => {
          logger.info('Service Worker update found!');
        });
        
        registration.addEventListener('controllerchange', () => {
          logger.info('Service Worker controller changed!');
        });

        // Forzar verificación de actualización inmediatamente después del registro
        setTimeout(() => {
          logger.info('Forcing immediate update check after registration...');
          registration.update().catch(error => {
            logger.error('Error forcing update check:', error);
          });
        }, 1000);
      }
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
    },
    // Configuración adicional para mejorar detección
    onNeedRefresh() {
      logger.info('PWA needs refresh - new version detected!');
    },
    onOfflineReady() {
      logger.info('PWA is ready for offline use');
    },
    // Configuración para forzar actualizaciones más frecuentes
    immediate: true
  });

  // Cargar preferencias al montar el componente
  useEffect(() => {
    const savedPreferences = localStorage.getItem(STORAGE_KEYS.PWA_UPDATE_PREFERENCES);
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        const mergedPreferences = { ...DEFAULT_PREFERENCES, ...parsed };
        setPreferences(mergedPreferences);
        logger.info('PWA preferences loaded from localStorage:', mergedPreferences);
      } catch (error) {
        logger.error('Error parsing PWA preferences:', error);
        // Si hay error, usar preferencias por defecto
        setPreferences(DEFAULT_PREFERENCES);
        logger.info('Using default PWA preferences due to parsing error');
      }
    } else {
      // No hay preferencias guardadas, usar por defecto
      setPreferences(DEFAULT_PREFERENCES);
      logger.info('No saved preferences found, using defaults:', DEFAULT_PREFERENCES);
    }
  }, []);

  // Guardar preferencias cuando cambien
  const updatePreferences = (newPreferences: Partial<UpdatePreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    localStorage.setItem(STORAGE_KEYS.PWA_UPDATE_PREFERENCES, JSON.stringify(updated));
    logger.info('PWA preferences updated and saved:', updated);
  };

  // Manejar actualización automática
  useEffect(() => {
    if (needRefresh && preferences.autoUpdate) {
      logger.info('Auto-updating PWA (user preference)...');
      
      const performAutoUpdate = async () => {
        try {
          // Obtener la nueva versión antes de actualizar
          const currentVersion = await getCurrentVersion();
          setNewVersion(currentVersion);
          
          // Actualizar automáticamente
          await updateServiceWorker(true);
          
          // Mostrar notificación de actualización exitosa
          setShowUpdateNotification(true);
          
          // Ocultar notificación después de 5 segundos
          setTimeout(() => {
            setShowUpdateNotification(false);
          }, 5000);
          
          logger.info('PWA auto-updated successfully to version:', currentVersion);
        } catch (error) {
          logger.error('Error auto-updating PWA:', error);
        }
      };
      
      performAutoUpdate();
    }
  }, [needRefresh, preferences.autoUpdate, updateServiceWorker]);

  // Mostrar diálogo de actualización manual (solo si no es automático)
  useEffect(() => {
    if (needRefresh && !preferences.autoUpdate && preferences.showNotifications) {
      logger.info('Update available, showing dialog...');
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

  // Manejar actualización manual (usuario eligió "Actualizar solo esta vez")
  const handleManualUpdate = () => {
    logger.info('User chose manual updates for future');
    updatePreferences({ autoUpdate: false, showNotifications: true });
    handleUpdate();
  };

  // Deshabilitar notificaciones (usuario eligió "No mostrar de nuevo")
  const handleDisableNotifications = () => {
    logger.info('User disabled update notifications');
    updatePreferences({ autoUpdate: false, showNotifications: false });
    setShowUpdateDialog(false);
  };

  // Función para obtener la versión actual
  const getCurrentVersion = async (): Promise<string> => {
    try {
      const response = await fetch('/version.json', { cache: 'no-cache' });
      const versionData = await response.json();
      return versionData.version || 'v0';
    } catch (error) {
      logger.error('Error fetching version:', error);
      return 'v0';
    }
  };

  // Función para resetear preferencias a los valores por defecto (útil para debugging)
  const resetPreferences = () => {
    logger.info('Resetting PWA preferences to defaults');
    localStorage.removeItem(STORAGE_KEYS.PWA_UPDATE_PREFERENCES);
    setPreferences(DEFAULT_PREFERENCES);
  };

  // Exponer función de reset en desarrollo para testing
  useEffect(() => {
    if (PWA_CONFIG.DEV) {
      (window as Window & { resetPWAPreferences?: () => void }).resetPWAPreferences = resetPreferences;
      logger.info('PWA reset function available in development: window.resetPWAPreferences()');
    }
  }, []);

  // Verificación inicial y periódica de actualizaciones
  useEffect(() => {
    // Verificación inmediata al cargar la app
    const initialCheck = async () => {
      logger.info('Initial update check on app load...');
      
      try {
        if ('serviceWorker' in navigator) {
          // Forzar verificación de actualización del service worker
          const registration = await navigator.serviceWorker.getRegistration();
          if (registration) {
            await registration.update();
            logger.info('Forced service worker update check on initial load');
          }
          
          // También usar el método de virtual:pwa-register
          await updateServiceWorker(false);
          
          if (needRefresh && preferences.showNotifications) {
            logger.info('Update available on initial check');
            setShowUpdateDialog(true);
          }
        }
      } catch (error) {
        logger.error('Error during initial update check:', error);
      }
    };

    // Ejecutar verificación inicial después de un pequeño delay
    const initialTimeout = setTimeout(initialCheck, PWA_CONFIG.INITIAL_CHECK_DELAY);

    // Verificación periódica automática cada 10 segundos (más frecuente)
    const periodicCheck = async () => {
      logger.info('Periodic update check...');
      
      try {
        if ('serviceWorker' in navigator) {
          // Forzar verificación de actualización del service worker
          const registration = await navigator.serviceWorker.getRegistration();
          if (registration) {
            await registration.update();
            logger.info('Forced service worker update check');
          }
          
          // También usar el método de virtual:pwa-register
          await updateServiceWorker(false);
          
          if (needRefresh && preferences.showNotifications) {
            logger.info('Update available during periodic check');
            setShowUpdateDialog(true);
          }
        }
      } catch (error) {
        logger.error('Error during periodic update check:', error);
      }
    };

    // Iniciar verificación periódica cada 10 segundos (más frecuente)
    const intervalId = setInterval(periodicCheck, UPDATE_CHECK_INTERVAL);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [needRefresh, preferences.showNotifications, updateServiceWorker, UPDATE_CHECK_INTERVAL]);

  // Detectar cuando la app vuelve a primer plano
  useEffect(() => {
    const handleVisibilityChange = async () => {
      // Solo verificar cuando la página se vuelve visible (app traída a primer plano)
      if (!document.hidden) {
        logger.info('App brought to foreground, checking for updates...');
        
        try {
          if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            await updateServiceWorker(false);
            
            if (needRefresh && preferences.showNotifications) {
              logger.info('Update available after bringing app to foreground');
              setShowUpdateDialog(true);
            }
          }
        } catch (error) {
          logger.error('Error checking for updates on visibility change:', error);
        }
      }
    };

    // Escuchar cambios de visibilidad de la página
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // También escuchar cuando la ventana obtiene el foco (útil para PWA)
    const handleFocus = async () => {
      logger.info('Window focused, checking for updates...');
      
      try {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          await updateServiceWorker(false);
          
          if (needRefresh && preferences.showNotifications) {
            logger.info('Update available after window focus');
            setShowUpdateDialog(true);
          }
        }
      } catch (error) {
        logger.error('Error checking for updates on window focus:', error);
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [needRefresh, preferences.showNotifications, updateServiceWorker]);

  // Escuchar mensajes del service worker
  useEffect(() => {
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      const { type, version } = event.data;
      
      switch (type) {
        case 'SW_UPDATE_AVAILABLE':
          logger.info('Service worker update available:', version);
          // Forzar verificación de actualización
          updateServiceWorker(false);
          break;
          
        case 'SW_CONTROLLER_CHANGED':
          logger.info('Service worker controller changed:', version);
          // La nueva versión se ha activado
          break;
          
        case 'SW_ACTIVATED':
          logger.info('Service worker activated:', version);
          break;
      }
    };

    navigator.serviceWorker?.addEventListener('message', handleServiceWorkerMessage);

    return () => {
      navigator.serviceWorker?.removeEventListener('message', handleServiceWorkerMessage);
    };
  }, [updateServiceWorker]);

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

  // Mostrar notificación de actualización exitosa
  if (showUpdateNotification) {
    return (
      <Modal
        open={showUpdateNotification}
        onOpenChange={setShowUpdateNotification}
        title={t('pwa.updateSuccess.title')}
        description={t('pwa.updateSuccess.description', { version: newVersion })}
      >
        <div className='space-y-4'>
          <div className='flex items-center gap-3 p-4 bg-green-50 rounded-lg'>
            <div className='flex-shrink-0'>
              <span className='text-2xl'>✅</span>
            </div>
            <div className='flex-1'>
              <p className='text-sm text-green-800'>
                {t('pwa.updateSuccess.description', { version: newVersion })}
              </p>
            </div>
          </div>

          <div className='flex justify-end'>
            <Button 
              onClick={() => setShowUpdateNotification(false)}
              className='bg-green-600 hover:bg-green-700'
            >
              {t('pwa.updateSuccess.understood')}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return null;
};

