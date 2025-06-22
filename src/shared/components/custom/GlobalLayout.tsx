import type { ReactNode } from 'react';

import { Toaster } from 'sonner';

import { InstallButton, PWAUpdateComponent, VersionDisplay } from '@custom-ui';

interface GlobalLayoutProps {
  children: ReactNode;
}

/**
 * Layout global de la aplicación
 *
 * Incluye elementos que deben estar presentes en toda la aplicación:
 * - Botón de instalación PWA (flotante)
 * - Componente de actualización PWA
 * - Toaster para notificaciones
 * - Display de versión
 *
 * Este componente se coloca en el nivel más alto de la aplicación
 * para asegurar que estos elementos estén disponibles globalmente.
 */
export function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <>
      {children}

      {/* Botón de instalación PWA - flotante en la esquina inferior derecha */}
      <div className='fixed bottom-4 right-4 z-50'>
        <InstallButton variant='outline' size='sm' className='shadow-lg' />
      </div>

      {/* Componentes globales */}
      <Toaster richColors />
      <PWAUpdateComponent />
      <VersionDisplay position='bottom-left' showDetails />
    </>
  );
}
