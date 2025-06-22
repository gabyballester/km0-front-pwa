import { useTranslation } from 'react-i18next';

import { Download } from 'lucide-react';

import { usePWAInstall } from '@contexts';

import { Button } from '@ui';

type PWAInstallButtonProps = Omit<React.ComponentProps<typeof Button>, 'onClick'> & {
  /** Texto personalizado del botón */
  children?: React.ReactNode;
};

/**
 * Botón de instalación PWA
 *
 * Se muestra automáticamente cuando la aplicación puede ser instalada.
 * Utiliza el contexto PWA para manejar la instalación.
 *
 * @example
 * <PWAInstallButton />
 * <PWAInstallButton variant="outline" size="sm" className="fixed bottom-4 right-4" />
 */
export function PWAInstallButton({ children, ...buttonProps }: PWAInstallButtonProps) {
  const { canInstall, installApp, isChecking } = usePWAInstall();
  const { t } = useTranslation();

  if (isChecking || !canInstall) return null;

  return (
    <Button onClick={installApp} {...buttonProps}>
      <Download className='w-4 h-4 mr-2' />
      {children || t('pwa.install.install')}
    </Button>
  );
}
