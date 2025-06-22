import type React from 'react';

import { usePWAInstall } from '@contexts';

import { Button } from '@ui';

/**
 * Un botón que solo aparece cuando la PWA es instalable.
 * Al hacer clic, inicia el diálogo de instalación del navegador.
 *
 * Este componente debe usarse dentro de un `PWAInstallProvider`.
 */
export const InstallButton = ({ children, ...props }: React.ComponentProps<typeof Button>) => {
  const { promptInstall } = usePWAInstall();

  // Si no hay prompt de instalación, no renderizamos nada.
  // El botón "aparecerá" mágicamente cuando el navegador dispare el evento.
  if (!promptInstall) {
    return null;
  }

  return (
    <Button onClick={promptInstall} {...props}>
      {children || '📥 Instalar App'}
    </Button>
  );
};
