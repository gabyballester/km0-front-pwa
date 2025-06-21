import { useEffect, useState } from 'react';

import { Button, Modal } from '@components';

import { logger } from '@utils';

import { PWA_CONFIG } from '@constants';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Componente PWAInstallComponent para mostrar botones de instalación de PWA
 * 
 * Este componente detecta automáticamente si la PWA puede ser instalada y muestra
 * un botón o modal de instalación. Maneja diferentes navegadores y estados de instalación.
 * 
 * @example
 * // Uso básico en App.tsx
 * function App() {
 *   return (
 *     <div>
 *       <header>
 *         <PWAInstallComponent />
 *       </header>
 *       <main>
 *         Contenido de la app
 *       </main>
 *     </div>
 *   );
 * }
 * 
 * // Uso en una página específica
 * function HomePage() {
 *   return (
 *     <div>
 *       <h1>Bienvenido</h1>
 *       <p>Instala nuestra app para una mejor experiencia</p>
 *       <PWAInstallComponent />
 *     </div>
 *   );
 * }
 * 
 * // Con configuración personalizada
 * function CustomInstallButton() {
 *   return (
 *     <div className="fixed bottom-4 right-4 z-50">
 *       <PWAInstallComponent />
 *     </div>
 *   );
 * }
 * ```
 */
export const PWAInstallComponent = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);
  // const [debugInfo, setDebugInfo] = useState<string>(''); // Comentado: debug info ya no necesario

  useEffect(() => {
    // Debug: Información inicial para producción también
    const isStandalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
    const isInStandaloneMode = window.navigator && 'standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone;
    const userAgent = navigator.userAgent;
    const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
    const isEdge = /Edg/.test(userAgent);
    const isFirefox = /Firefox/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

    const debugData = {
      isStandalone,
      isInStandaloneMode,
      isChrome,
      isEdge,
      isFirefox,
      isSafari,
      userAgent: userAgent.substring(0, 100),
      href: window.location.href,
      protocol: window.location.protocol,
      isSecure: window.location.protocol === 'https:' || window.location.hostname === 'localhost',
      isLocalhost: window.location.hostname === 'localhost',
      port: window.location.port
    };

    logger.info('PWA Install Component - Debug Info:', debugData);

    const handleBeforeInstallPrompt = (e: Event) => {
      logger.info('beforeinstallprompt event fired!', e);

      // Solo prevenimos el evento si realmente vamos a mostrar nuestro prompt
      e.preventDefault();
      const prompt = e as BeforeInstallPromptEvent;
      setDeferredPrompt(prompt);

      // Verificar si ya está instalado
      const isStandalone =
        window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
      const isInStandaloneMode =
        window.navigator &&
        'standalone' in window.navigator &&
        (window.navigator as { standalone?: boolean }).standalone;

      if (isStandalone || isInStandaloneMode) {
        logger.info('App ya está instalada, no mostrar prompt');
        return;
      }

      // Verificar sessionStorage
      const modalClosed = sessionStorage.getItem('installModalClosed') === 'true';
      const buttonClosed = sessionStorage.getItem('installButtonClosed') === 'true';

      logger.info('Session storage check:', { modalClosed, buttonClosed });

      if (!modalClosed) {
        logger.info('Mostrando modal de instalación');
        setShowInstallModal(true);
      }

      if (!buttonClosed) {
        logger.info('Mostrando botón de instalación');
        setShowInstallButton(true);
      }
    };

    // Verificar si ya está instalado al cargar
    const checkIfInstalled = () => {
      const isStandalone =
        window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
      const isInStandaloneMode =
        window.navigator &&
        'standalone' in window.navigator &&
        (window.navigator as { standalone?: boolean }).standalone;

      if (isStandalone || isInStandaloneMode) {
        logger.info('App detectada como instalada');
        setShowInstallButton(false);
        setShowInstallModal(false);
        return true;
      }
      return false;
    };

    // Solo agregar listener si no está instalado
    if (!checkIfInstalled()) {
      logger.info('Agregando listener para beforeinstallprompt');
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // Timeout para detectar si el evento nunca se dispara
      const timeout = setTimeout(() => {
        if (!deferredPrompt) {
          logger.warn('beforeinstallprompt no se disparó después de 5 segundos');
          
          // Log adicional para debugging
          logger.info('Posibles razones por las que beforeinstallprompt no se disparó:', {
            isSecure: window.location.protocol === 'https:' || window.location.hostname === 'localhost',
            isLocalhost: window.location.hostname === 'localhost',
            port: window.location.port,
            userAgent: navigator.userAgent.substring(0, 100),
            hasManifest: Boolean(document.querySelector('link[rel="manifest"]')),
            hasServiceWorker: 'serviceWorker' in navigator,
            isStandalone: window.matchMedia && window.matchMedia('(display-mode: standalone)').matches
          });
          
          // En algunos casos, mostrar botón manualmente si cumple criterios
          const isStandalone =
            window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
          const isInStandaloneMode =
            window.navigator &&
            'standalone' in window.navigator &&
            (window.navigator as { standalone?: boolean }).standalone;
          const userAgent = navigator.userAgent;
          const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
          const isEdge = /Edg/.test(userAgent);

          if (
            !isStandalone &&
            !isInStandaloneMode &&
            (isChrome || isEdge) &&
            (window.location.protocol === 'https:' || window.location.hostname === 'localhost') &&
            sessionStorage.getItem('installButtonClosed') !== 'true'
          ) {
            logger.info('Mostrando botón de instalación manualmente (fallback)');
            setShowInstallButton(true);
          }
        }
      }, PWA_CONFIG.INSTALL_PROMPT_TIMEOUT);

      return () => {
        clearTimeout(timeout);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    } else {
      logger.info('App ya instalada, no agregando listeners');
    }
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      logger.warn('No hay prompt de instalación disponible');

      // Fallback: intentar abrir instrucciones de instalación manual
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        alert(
          'Para instalar esta app en iOS:\n1. Toca el botón "Compartir" en Safari\n2. Selecciona "Agregar a pantalla de inicio"'
        );
      } else {
        // En lugar de mostrar un alert, intentar forzar la instalación
        logger.info('Intentando forzar instalación sin prompt...');
        
        // Verificar si hay un service worker registrado
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.getRegistration();
          if (registration) {
            // Intentar activar el service worker
            await registration.update();
            logger.info('Service worker actualizado, intentando instalación...');
          }
        }
        
        // Mostrar instrucciones más específicas
        alert(
          'Para instalar esta app:\n\n' +
          '1. Busca el icono de instalación (📱) en la barra de direcciones\n' +
          '2. O usa el menú del navegador (⋮) > "Instalar aplicación"\n' +
          '3. O usa Ctrl+Shift+I > Application > Manifest > Install\n\n' +
          'Si no ves estas opciones, la app ya podría estar instalada.'
        );
      }
      return;
    }

    try {
      logger.info('Iniciando proceso de instalación con prompt nativo');
      // Activar el prompt nativo
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;

      logger.info('Resultado de instalación:', choice);

      if (choice.outcome === 'accepted') {
        logger.info('Usuario aceptó la instalación');
        setShowInstallButton(false);
        setShowInstallModal(false);
        // Limpiar sessionStorage ya que la app se instaló
        sessionStorage.removeItem('installModalClosed');
        sessionStorage.removeItem('installButtonClosed');
      } else {
        logger.info('Usuario rechazó la instalación');
        setShowInstallModal(false);
        // Marcar modal como cerrado cuando el usuario rechaza la instalación
        sessionStorage.setItem('installModalClosed', 'true');
      }

      // Limpiar el prompt después de usarlo
      setDeferredPrompt(null);
    } catch (error) {
      logger.error('Error durante la instalación:', error);
      setShowInstallModal(false);
      // Marcar modal como cerrado en caso de error
      sessionStorage.setItem('installModalClosed', 'true');
    }
  };

  const handleLaterClick = () => {
    setShowInstallModal(false);
    sessionStorage.setItem('installModalClosed', 'true');
    logger.info('Usuario eligió instalar más tarde');
  };

  const handleCloseButton = () => {
    setShowInstallButton(false);
    sessionStorage.setItem('installButtonClosed', 'true');
  };

  // Función para forzar mostrar botón (útil para testing)
  const forceShowButton = () => {
    if (import.meta.env.DEV) {
      setShowInstallButton(true);
      setShowInstallModal(true);
      logger.info('Forzando mostrar componentes de instalación (DEV)');
    }
  };

  // En desarrollo, agregar función global para testing
  useEffect(() => {
    if (import.meta.env.DEV) {
      (window as Window & { forcePWAInstall?: () => void }).forcePWAInstall = forceShowButton;
      logger.info('Función forcePWAInstall disponible en desarrollo: window.forcePWAInstall()');
    }
  }, []);

  // Lógica unificada para desarrollo y producción
  // Solo mostrar si hay prompt disponible o estamos en desarrollo
  if (!showInstallButton && !showInstallModal && !import.meta.env.DEV) {
    return null;
  }

  return (
    <>
      {/* Modal de instalación */}
      <Modal
        open={showInstallModal}
        onOpenChange={open => {
          if (!open) {
            handleLaterClick();
          }
        }}
        title='¿Instalar la aplicación?'
        description='Instala la aplicación para tener acceso más rápido y una mejor experiencia. Puedes instalarlo ahora o usar el botón verde más tarde.'
        size='sm'
      >
        <Modal.Footer>
          <Button variant='outline' onClick={handleLaterClick}>
            Más tarde
          </Button>
          <Button onClick={handleInstallClick} className='bg-green-600 hover:bg-green-700'>
            📱 Instalar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Botón flotante de instalación */}
      {showInstallButton && (
        <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2'>
          <Button
            onClick={handleInstallClick}
            className='rounded-lg bg-green-600 px-4 py-2 text-white shadow-lg transition-all hover:bg-green-700
              hover:scale-105'
          >
            📱 Instalar App
          </Button>
          <Button
            onClick={handleCloseButton}
            variant='outline'
            size='sm'
            className='rounded-lg bg-white/90 px-2 py-1 text-xs text-gray-700 shadow-lg hover:bg-white'
            title='Ocultar durante esta sesión'
          >
            ✕
          </Button>
        </div>
      )}

      {/* Botón de debug en desarrollo */}
      {import.meta.env.DEV && (
        <div className='fixed top-4 left-4 z-50'>
          <Button
            onClick={forceShowButton}
            variant='outline'
            size='sm'
            className='bg-blue-100 text-blue-800 hover:bg-blue-200'
          >
            🔧 Force Install
          </Button>
        </div>
      )}
    </>
  );
};
