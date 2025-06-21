import { useEffect, useState } from 'react';

export const PWAUpdateDebug = () => {
  const [swStatus, setSwStatus] = useState<string>('Checking...');
  const [swMessages, setSwMessages] = useState<string[]>([]);

  const addMessage = (message: string) => {
    setSwMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    // Verificar estado del service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        addMessage(`SW registered: ${registration.active?.state || 'none'}`);
        setSwStatus(`Active: ${registration.active?.state || 'none'}`);
        
        // Verificar si hay una nueva versión
        registration.update().then(() => {
          addMessage('Update check completed');
        }).catch(error => {
          addMessage(`Update check failed: ${error.message}`);
        });
      });

      // Escuchar mensajes del service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        const { type, version } = event.data;
        addMessage(`SW Message: ${type} - ${version}`);
      });

      // Escuchar cambios de estado
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        addMessage('Controller changed!');
        setSwStatus('Controller changed');
      });

      // Escuchar cuando se encuentra una actualización
      navigator.serviceWorker.addEventListener('updatefound', () => {
        addMessage('Update found!');
        setSwStatus('Update found');
      });
    } else {
      setSwStatus('Service Worker not supported');
      addMessage('Service Worker not supported');
    }
  }, []);

  const checkForUpdates = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.update();
        addMessage('Manual update check triggered');
      } catch (error) {
        addMessage(`Manual update check failed: ${error}`);
      }
    }
  };

  const clearCache = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.unregister();
        window.location.reload();
        addMessage('Cache cleared and page reloaded');
      } catch (error) {
        addMessage(`Cache clear failed: ${error}`);
      }
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">PWA Update Debug</h3>
      <p className="text-sm text-gray-600 mb-4">Status: {swStatus}</p>
      
      <div className="space-x-2 mb-4">
        <button
          onClick={checkForUpdates}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Check for Updates
        </button>
        <button
          onClick={clearCache}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Clear Cache
        </button>
      </div>

      <div className="max-h-40 overflow-y-auto">
        <h4 className="text-sm font-medium mb-2">Messages:</h4>
        {swMessages.map((message, index) => (
          <div key={index} className="text-xs text-gray-700 mb-1">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
}; 