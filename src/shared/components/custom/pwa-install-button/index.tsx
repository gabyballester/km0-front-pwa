import { usePWAInstall } from '@contexts';

import { Button } from '@ui';

/**
 * Un botón que solo aparece cuando la PWA es instalable.
 * Al hacer clic, inicia el diálogo de instalación del navegador.
 *
 * Este componente debe usarse dentro de un `PWAInstallProvider`.
 */
export const InstallButton = () => {
  const { promptInstall } = usePWAInstall();

  // Si no hay prompt de instalación, no renderizamos nada.
  // El botón "aparecerá" mágicamente cuando el navegador dispare el evento.
  if (!promptInstall) {
    return null;
  }

  return (
    <Button onClick={promptInstall} className='bg-green-600 hover:bg-green-700'>
      📱 Instalar App
    </Button>
  );
};
