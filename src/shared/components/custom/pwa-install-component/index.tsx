import { useEffect, useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Modal } from '@/shared/components/ui/modal';
import { logger } from '@/shared/utils/logger';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallComponent = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (sessionStorage.getItem('installModalClosed') !== 'true') {
        setShowInstallModal(true);
      }
      // El botón solo se oculta si el usuario lo cierra manualmente en la sesión
      if (sessionStorage.getItem('installButtonClosed') !== 'true') {
        setShowInstallButton(true);
      }
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      logger.error('No install prompt available');
      return;
    }
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        logger.info('Usuario aceptó la instalación');
        setShowInstallButton(false);
        setShowInstallModal(false);
        setDeferredPrompt(null);
      } else {
        logger.info('Usuario rechazó la instalación');
        setShowInstallModal(false);
      }
    } catch (error) {
      logger.error('Error en la instalación:', error);
      setShowInstallModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowInstallModal(false);
    sessionStorage.setItem('installModalClosed', 'true');
  };

  const handleCloseButton = () => {
    setShowInstallButton(false);
    sessionStorage.setItem('installButtonClosed', 'true');
  };

  if (!deferredPrompt || !showInstallButton) {
    return null;
  }

  return (
    <>
      {/* Modal de instalación resumido */}
      <Modal
        open={showInstallModal}
        onOpenChange={setShowInstallModal}
        title='¿Instalar la app?'
        description='Puedes instalar la app para acceder más rápido. Siempre puedes usar el botón verde abajo a la derecha para instalarla más tarde o cerrarlo para ocultarlo durante esta sesión.'
        size='sm'
      >
        <Modal.Footer>
          <Button variant='outline' onClick={handleCloseModal}>
            Más tarde
          </Button>
          <Button onClick={handleInstallClick} className='bg-green-600 hover:bg-green-700'>
            Instalar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Botón flotante de instalación */}
      <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2'>
        <Button
          onClick={handleInstallClick}
          className='rounded-lg bg-green-600 px-4 py-2 text-white shadow-lg transition-colors hover:bg-green-700'
        >
          📱 Instalar App
        </Button>
        <Button
          onClick={handleCloseButton}
          variant='outline'
          size='sm'
          className='rounded-lg bg-white/90 px-2 py-1 text-xs text-gray-700 shadow-lg hover:bg-white'
        >
          ✕
        </Button>
      </div>
    </>
  );
};
