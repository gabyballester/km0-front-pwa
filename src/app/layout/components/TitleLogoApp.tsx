import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { APP_ROUTES } from '@/shared/constants/route.constants';

export const TitleLogoApp = () => {
  const { t } = useTranslation();
  return (
    <>
      <Link to={APP_ROUTES.HOME} className='flex gap-4'>
        <img src='/pwa-512x512.png' alt='Logo Km0' className='h-8 w-8' />
        <h1 className='font-bold text-xl'>{t('header.companyName')}</h1>
      </Link>
    </>
  );
};
