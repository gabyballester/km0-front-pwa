import { useEffect, useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { logger } from '@/shared/utils/logger';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallComponent = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallMessage, setShowInstallMessage] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      if (sessionStorage.getItem('installMessageClosed') !== 'true') {
        setShowInstallMessage(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      logger.error('Error showing install prompt:', error);
      return;
    }

    try {
      const result = await deferredPrompt.prompt();
      if (result.outcome === 'accepted') {
        logger.warn('User accepted the install prompt');
      } else {
        logger.warn('User dismissed the install prompt');
      }
    } catch (error) {
      logger.error('Error in user choice:', error);
    } finally {
      setDeferredPrompt(null);
    }
  };

  const handleCloseMessage = () => {
    setShowInstallMessage(prevstate => !prevstate);
    sessionStorage.setItem('installMessageClosed', 'true');
  };

  const handleOpenMessage = () => {
    setShowInstallMessage(prevstate => !prevstate);
    sessionStorage.removeItem('installMessageClosed');
  };

  return (
    <>
      {deferredPrompt && showInstallMessage && (
        <Button
          onClick={handleOpenMessage}
          className='fixed right-5 bottom-5 z-50 rounded-lg bg-green-600 px-5 py-2.5 text-white shadow-md
            transition-colors hover:bg-green-700'
        >
          Instalar App
        </Button>
      )}

      {showInstallMessage && (
        <div
          className='fixed top-4 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-3 rounded-xl bg-gray-800
            p-4 text-white shadow-lg'
        >
          <p className='m-0 text-base'>¿Quieres usar la aplicación?</p>
          <div className='flex gap-2'>
            <Button
              onClick={handleInstallClick}
              className='rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700'
            >
              Instalar
            </Button>
            <Button
              onClick={handleCloseMessage}
              className='rounded-md border border-gray-500 bg-transparent px-4 py-2 text-sm text-white transition-colors
                hover:bg-gray-100/10'
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
