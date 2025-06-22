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
 * Proveedor del contexto que envuelve la aplicación o partes de ella.
 * Se encarga de la lógica de escuchar y capturar el evento `beforeinstallprompt`.
 */
export const PWAInstallProvider = ({ children }: { children: ReactNode }) => {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevenimos que el mini-infobar de Chrome aparezca en móviles
      e.preventDefault();
      logger.info('Evento "beforeinstallprompt" capturado y guardado.');
      // Guardamos el evento para poder usarlo más tarde
      setPrompt(e as BeforeInstallPromptEvent);
    };

    // Nos suscribimos al evento
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Limpiamos el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
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
    installApp
  };

  return <PWAInstallContext.Provider value={value}>{children}</PWAInstallContext.Provider>;
}; 