import { useEffect, useState } from 'react';

import './PWAInstallComponent.css';

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

  const handleInstallClick = () => {
    if (deferredPrompt) {
      void deferredPrompt.prompt().catch(error => {
        console.error('Error showing install prompt:', error);
      });

      deferredPrompt.userChoice
        .then(({ outcome }) => {
          if (outcome === 'accepted') {
            console.warn('User accepted the install prompt');
          } else {
            console.warn('User dismissed the install prompt');
          }
        })
        .catch(error => {
          console.error('Error in user choice:', error);
        })
        .finally(() => {
          setDeferredPrompt(null);
          setShowInstallMessage(false);
        });
    }
  };

  const handleCloseMessage = () => {
    setShowInstallMessage(false);
    sessionStorage.setItem('installMessageClosed', 'true');
  };

  return (
    <>
      {deferredPrompt && (
        <button onClick={handleInstallClick} className='install-button'>
          Instalar App
        </button>
      )}
      {showInstallMessage && (
        <div className='install-message'>
          <p>¿Quieres usar la aplicación?</p>
          <div className='install-message-buttons'>
            <button onClick={handleInstallClick}>Instalar</button>
            <button onClick={handleCloseMessage}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};
