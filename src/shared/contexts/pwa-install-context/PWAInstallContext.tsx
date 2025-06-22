import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

import { logger } from '@utils';

// Interfaz para el evento BeforeInstallPromptEvent, que es específico de la instalación de PWA
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt: () => Promise<void>;
}

// Definimos la forma del contexto
interface PWAInstallContextType {
  /**
   * Indica si la aplicación puede ser instalada
   */
  canInstall: boolean;
  /**
   * La función prompt() que muestra el diálogo de instalación nativo del navegador.
   * Será `null` si la app no es instalable o el prompt ya ha sido usado.
   */
  promptInstall: (() => Promise<void>) | null;
  /**
   * Función para instalar la aplicación
   */
  installApp: () => Promise<void>;
  /**
   * Indica si está verificando la instalabilidad
   */
  isChecking: boolean;
}

// Creamos el contexto con un valor inicial por defecto
const PWAInstallContext = createContext<PWAInstallContextType | undefined>(undefined);

/**
 * Hook personalizado para acceder fácilmente al contexto de instalación de la PWA.
 * @returns El contexto, que incluye la función `promptInstall`.
 * @throws {Error} Si se usa fuera de un `PWAInstallProvider`.
 */
export const usePWAInstall = () => {
  const context = useContext(PWAInstallContext);
  if (context === undefined) {
    throw new Error('usePWAInstall debe ser usado dentro de un PWAInstallProvider');
  }
  return context;
};

/**
 * Verifica si la PWA ya está instalada
 */
const isPWAInstalled = (): boolean => {
  // Verificar si se está ejecutando en modo standalone (PWA instalada)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }

  // Verificar si se está ejecutando en modo fullscreen (PWA instalada)
  if (window.matchMedia('(display-mode: fullscreen)').matches) {
    return true;
  }

  // Verificar si se está ejecutando en modo minimal-ui (PWA instalada)
  if (window.matchMedia('(display-mode: minimal-ui)').matches) {
    return true;
  }

  // Verificar si se está ejecutando en modo window-controls-overlay (PWA instalada)
  if (window.matchMedia('(display-mode: window-controls-overlay)').matches) {
    return true;
  }

  return false;
};

/**
 * Verifica si el navegador soporta la instalación de PWAs
 */
const isPWAInstallable = (): boolean => {
  return 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
};

/**
 * Proveedor del contexto que envuelve la aplicación o partes de ella.
 * Se encarga de la lógica de escuchar y capturar el evento `beforeinstallprompt`.
 */
export const PWAInstallProvider = ({ children }: { children: ReactNode }) => {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Verificar si la PWA ya está instalada
    if (isPWAInstalled()) {
      logger.info('PWA ya está instalada, no se mostrará el prompt de instalación');
      setIsChecking(false);
      return;
    }

    // Verificar si el navegador soporta la instalación
    if (!isPWAInstallable()) {
      logger.info('Navegador no soporta la instalación de PWAs');
      setIsChecking(false);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevenimos que el mini-infobar de Chrome aparezca en móviles
      e.preventDefault();
      logger.info('Evento "beforeinstallprompt" capturado y guardado.');

      // Guardamos el evento para poder usarlo más tarde
      setPrompt(e as BeforeInstallPromptEvent);
      setIsChecking(false);
    };

    // Verificar si ya hay un prompt disponible (puede suceder en Chrome para Android)
    const checkExistingPrompt = () => {
      // En Chrome para Android, a veces el prompt ya está disponible
      // pero no se dispara el evento beforeinstallprompt
      if (window.deferredPrompt) {
        logger.info('Prompt existente encontrado en window.deferredPrompt');
        setPrompt(window.deferredPrompt as BeforeInstallPromptEvent);
        setIsChecking(false);
      }
    };

    // Verificar prompt existente después de un pequeño delay
    const timeoutId = setTimeout(checkExistingPrompt, 1000);

    // Nos suscribimos al evento
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Verificar periódicamente si la PWA se instaló
    const checkInstallationInterval = setInterval(() => {
      if (isPWAInstalled()) {
        logger.info('PWA detectada como instalada durante la verificación');
        setPrompt(null);
        setIsChecking(false);
        clearInterval(checkInstallationInterval);
      }
    }, 5000);

    // Limpiamos los listeners cuando el componente se desmonta
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timeoutId);
      clearInterval(checkInstallationInterval);
    };
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  const promptInstall = async () => {
    if (!prompt) {
      logger.warn('La función de instalación fue llamada, pero no hay un prompt disponible.');
      return;
    }

    try {
      await prompt.prompt();
      logger.info('Prompt de instalación mostrado al usuario.');

      // Esperar la respuesta del usuario
      const userChoice = await prompt.userChoice;
      logger.info(`Usuario ${userChoice.outcome} la instalación PWA`);

      // Solo limpiar el prompt si el usuario aceptó la instalación
      if (userChoice.outcome === 'accepted') {
        setPrompt(null);
        logger.info('Prompt de instalación limpiado después de aceptación');
      } else {
        logger.info('Usuario canceló la instalación, manteniendo el prompt disponible');
      }
    } catch (error) {
      logger.error('Error al mostrar el prompt de instalación:', error);
    }
  };

  const installApp = async () => {
    if (!prompt) {
      logger.warn('No se puede instalar la aplicación: no hay prompt disponible.');
      return;
    }

    try {
      await prompt.prompt();
      const userChoice = await prompt.userChoice;

      if (userChoice.outcome === 'accepted') {
        setPrompt(null);
        logger.info('Aplicación instalada exitosamente.');
      } else {
        logger.info('Usuario canceló la instalación');
      }
    } catch (error) {
      logger.error('Error al instalar la aplicación:', error);
    }
  };

  const value: PWAInstallContextType = {
    canInstall: Boolean(prompt),
    promptInstall: prompt ? promptInstall : null,
    installApp,
    isChecking
  };

  return <PWAInstallContext.Provider value={value}>{children}</PWAInstallContext.Provider>;
};
