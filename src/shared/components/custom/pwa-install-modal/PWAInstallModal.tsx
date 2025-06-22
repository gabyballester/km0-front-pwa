import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { logger } from '@utils';

import { usePWAInstall, useVersion } from '@contexts';

import { PWA_CONFIG, SESSION_KEYS, STORAGE_KEYS } from '@constants';

import { Button, Modal } from '@ui';

/**
 * Componente PWAInstallModal
 *
 * Muestra un modal de invitación a instalar la PWA después de 5 segundos.
 * El modal se puede cerrar de tres formas:
 * - Clic fuera del modal (cierre temporal)
 * - Botón "Más tarde" (cierre para esta sesión)
 * - Botón "No, gracias" (cierre permanente)
 *
 * @example
 * ```tsx
 * // Uso básico
 * <PWAInstallModal />
 *
 * // Con configuración personalizada
 * <PWAInstallModal
 *   delay={3000}
 *   onInstall={() => console.log('Instalando...')}
 * />
 * ```
 */
export function PWAInstallModal() {
  const { t } = useTranslation();
  const { canInstall, promptInstall, isChecking } = usePWAInstall();
  const { displayVersion } = useVersion();
  const [showModal, setShowModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

  useEffect(() => {
    // No mostrar si está verificando la instalabilidad
    if (isChecking) {
      logger.info('Verificando instalabilidad de la PWA, esperando...');
      return;
    }

    // Solo mostrar si la PWA es instalable Y no se ha mostrado antes
    if (!canInstall && !hasShownModal) {
      logger.info('PWA no es instalable, no se mostrará el modal');
      return;
    }

    // Si ya se mostró el modal, no volver a mostrarlo
    if (hasShownModal) {
      return;
    }

    // Verificar si el usuario ya declinó permanentemente
    const hasDeclined = localStorage.getItem(STORAGE_KEYS.PWA_INSTALL_DECLINED);
    if (hasDeclined === 'true') {
      logger.info('Usuario declinó la instalación permanentemente');
      return;
    }

    // Verificar si ya se cerró en esta sesión
    const isClosedThisSession = sessionStorage.getItem(SESSION_KEYS.PWA_INSTALL_MODAL_CLOSED);
    if (isClosedThisSession === 'true') {
      logger.info('Modal ya fue cerrado en esta sesión');
      return;
    }

    // Mostrar el modal después del delay
    const timer = setTimeout(() => {
      setShowModal(true);
      setHasShownModal(true);
      logger.info('Mostrando modal de instalación PWA');
    }, PWA_CONFIG.INSTALL_MODAL.DELAY_MS);

    return () => clearTimeout(timer);
  }, [canInstall, hasShownModal, isChecking]);

  const handleInstall = async () => {
    try {
      if (promptInstall) {
        await promptInstall();
        // No cerrar el modal automáticamente aquí
        // El modal se mantendrá abierto hasta que el usuario tome una acción específica
        logger.info('Usuario inició la instalación PWA');
      }
    } catch (error) {
      logger.error('Error al instalar PWA:', error);
    }
  };

  const handleLater = () => {
    setShowModal(false);
    sessionStorage.setItem(SESSION_KEYS.PWA_INSTALL_MODAL_CLOSED, 'true');
    logger.info('Usuario eligió "Más tarde" para la instalación PWA');
  };

  const handleCancel = () => {
    setShowModal(false);
    localStorage.setItem(STORAGE_KEYS.PWA_INSTALL_DECLINED, 'true');
    logger.info('Usuario declinó permanentemente la instalación PWA');
  };

  const handleCloseOutside = () => {
    setShowModal(false);
    logger.info('Usuario cerró el modal de instalación PWA haciendo clic fuera');
  };

  if (!showModal) return null;

  return (
    <Modal
      open={showModal}
      onOpenChange={setShowModal}
      onCloseOutside={handleCloseOutside}
      title={t('pwa.install.modal.title', { version: displayVersion })}
      size='sm'
      preventCloseOnEscape={false}
    >
      <div className='space-y-3'>
        <p className='text-sm text-foreground leading-relaxed'>
          {t('pwa.install.modal.description')}
        </p>

        <div className='space-y-2'>
          <h4 className='text-sm font-medium text-foreground'>{t('pwa.install.modal.benefits')}</h4>
          <ul className='space-y-1 text-xs text-muted-foreground'>
            <li className='flex items-center gap-2'>
              <span className='text-primary'>•</span>
              {t('pwa.install.modal.benefit1')}
            </li>
            <li className='flex items-center gap-2'>
              <span className='text-primary'>•</span>
              {t('pwa.install.modal.benefit2')}
            </li>
          </ul>
        </div>

        <div className='flex flex-col gap-2 pt-3'>
          <Button
            onClick={handleInstall}
            className='w-full bg-green-600 hover:bg-green-700'
            size='sm'
          >
            {t('pwa.install.modal.buttonInstall')}
          </Button>

          <div className='flex gap-2'>
            <Button variant='outline' onClick={handleLater} className='flex-1' size='sm'>
              {t('pwa.install.modal.buttonLater')}
            </Button>

            <Button variant='ghost' onClick={handleCancel} className='flex-1' size='sm'>
              {t('pwa.install.modal.buttonCancel')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
