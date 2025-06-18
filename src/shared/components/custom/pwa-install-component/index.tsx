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
      e.preventDefault(); // Prevenir que el navegador muestre su propio prompt
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Mostrar modal si no se ha cerrado antes
      if (sessionStorage.getItem('installModalClosed') !== 'true') {
        setShowInstallModal(true);
      }

      // Siempre mostrar el botón si hay prompt disponible
      setShowInstallButton(true);
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
      // Mostrar el prompt nativo del navegador
      await deferredPrompt.prompt();

      // Esperar la respuesta del usuario
      const choice = await deferredPrompt.userChoice;

      if (choice.outcome === 'accepted') {
        logger.info('Usuario aceptó la instalación');
        setShowInstallButton(false);
        setShowInstallModal(false);
        setDeferredPrompt(null);
      } else {
        logger.info('Usuario rechazó la instalación');
        setShowInstallModal(false);
        // Mantener el botón visible para que pueda intentar de nuevo
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

  // Solo mostrar el botón si hay un prompt disponible y no se ha cerrado
  if (!deferredPrompt || !showInstallButton) {
    return null;
  }

  return (
    <>
      {/* Modal de instalación */}
      <Modal
        open={showInstallModal}
        onOpenChange={setShowInstallModal}
        title='¿Quieres instalar la aplicación?'
        description='Instala esta aplicación en tu dispositivo para acceder más fácilmente y disfrutar de una mejor experiencia.'
        size='sm'
      >
        <div className='space-y-4'>
          <div className='flex items-start gap-3'>
            <span className='text-2xl'>📱</span>
            <div className='flex-1'>
              <h4 className='font-medium text-gray-900 dark:text-white'>
                Beneficios de instalar la app:
              </h4>
              <ul className='mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                <li>• Acceso rápido desde el escritorio</li>
                <li>• Funciona sin conexión a internet</li>
                <li>• Notificaciones push</li>
                <li>• Experiencia como app nativa</li>
              </ul>
            </div>
          </div>
        </div>

        <Modal.Footer>
          <div className='flex gap-2 justify-end'>
            <Button variant='outline' onClick={handleCloseModal}>
              Más tarde
            </Button>
            <Button onClick={handleInstallClick} className='bg-green-600 hover:bg-green-700'>
              Instalar
            </Button>
          </div>
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
