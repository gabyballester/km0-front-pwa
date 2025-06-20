import { useEffect, useState } from 'react';

import { Button, Modal } from '@/shared/components';
import { logger } from '@/shared/utils';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallComponent = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);
  // const [debugInfo, setDebugInfo] = useState<string>(''); // Comentado: debug info ya no necesario

  useEffect(() => {
    // Debug: Información inicial (comentado para producción)
    // const isStandalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
    // const isInStandaloneMode = window.navigator && 'standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone;
    // const userAgent = navigator.userAgent;
    // const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
    // const isEdge = /Edg/.test(userAgent);
    // const isFirefox = /Firefox/.test(userAgent);
    // const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

    // const debugData = {
    //   isStandalone,
    //   isInStandaloneMode,
    //   isChrome,
    //   isEdge,
    //   isFirefox,
    //   isSafari,
    //   userAgent: userAgent.substring(0, 100),
    //   href: window.location.href,
    //   protocol: window.location.protocol,
    //   isSecure: window.location.protocol === 'https:' || window.location.hostname === 'localhost'
    // };

    // setDebugInfo(JSON.stringify(debugData, null, 2));
    // logger.info('PWA Install Component - Debug Info:', debugData);

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
            window.location.protocol === 'https:' &&
            sessionStorage.getItem('installButtonClosed') !== 'true'
          ) {
            logger.info('Mostrando botón de instalación manualmente (fallback)');
            setShowInstallButton(true);
          }
        }
      }, 5000);

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
        alert(
          'Para instalar esta app:\n1. Busca el icono de instalación en la barra de direcciones\n2. O usa el menú del navegador > "Instalar aplicación"'
        );
      }
      return;
    }

    try {
      logger.info('Iniciando proceso de instalación');
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

  // Función para mostrar debug info (comentado: ya no necesario)
  // const showDebugInfo = () => {
  //   if (import.meta.env.DEV) {
  //     alert(`Debug Info:\n${debugInfo}`);
  //   }
  // };

  // Función para forzar mostrar botón (comentado: ya no necesario)
  // const forceShowButton = () => {
  //   if (import.meta.env.DEV) {
  //     setShowInstallButton(true);
  //     setShowInstallModal(true);
  //     logger.info('Forzando mostrar componentes de instalación (DEV)');
  //   }
  // };

  // En desarrollo, mostrar botones de debug (comentado)
  // if (import.meta.env.DEV) {
  //   return (
  //     <>
  //       {/* Modal de instalación */}
  //       <Modal
  //         open={showInstallModal}
  //         onOpenChange={(open) => {
  //           if (!open) {
  //             handleLaterClick();
  //           }
  //         }}
  //         title='¿Instalar la aplicación?'
  //         description='Instala la aplicación para tener acceso más rápido y una mejor experiencia. Puedes instalarlo ahora o usar el botón verde más tarde.'
  //         size='sm'
  //       >
  //         <Modal.Footer>
  //           <Button variant='outline' onClick={handleLaterClick}>
  //             Más tarde
  //           </Button>
  //           <Button onClick={handleInstallClick} className='bg-green-600 hover:bg-green-700'>
  //             📱 Instalar
  //           </Button>
  //         </Modal.Footer>
  //       </Modal>

  //       {/* Botones de desarrollo */}
  //       <div className='fixed top-4 left-4 z-50 flex flex-col gap-2'>
  //         <Button
  //           onClick={showDebugInfo}
  //           variant='outline'
  //           size='sm'
  //           className='bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
  //         >
  //           🐛 Debug Info
  //         </Button>
  //         <Button
  //           onClick={forceShowButton}
  //           variant='outline'
  //           size='sm'
  //           className='bg-blue-100 text-blue-800 hover:bg-blue-200'
  //         >
  //           🔧 Force Show
  //         </Button>
  //       </div>

  //       {/* Botón flotante de instalación */}
  //       {showInstallButton && (
  //         <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2'>
  //           <Button
  //             onClick={handleInstallClick}
  //             className='rounded-lg bg-green-600 px-4 py-2 text-white shadow-lg transition-all hover:bg-green-700 hover:scale-105'
  //           >
  //             📱 Instalar App
  //           </Button>
  //           <Button
  //             onClick={handleCloseButton}
  //             variant='outline'
  //             size='sm'
  //             className='rounded-lg bg-white/90 px-2 py-1 text-xs text-gray-700 shadow-lg hover:bg-white'
  //             title='Ocultar durante esta sesión'
  //           >
  //             ✕
  //           </Button>
  //         </div>
  //       )}
  //     </>
  //   );
  // }

  // Lógica unificada para desarrollo y producción
  // Solo mostrar si hay prompt disponible o si estamos en desarrollo
  if (!showInstallButton && !import.meta.env.DEV) {
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
    </>
  );
};
