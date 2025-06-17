import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { PATHS } from '@/router/paths.router';

export const TitleLogoApp = () => {
  const { t } = useTranslation();
  return (
    <>
      <Link to={PATHS.HOME} className='flex gap-4'>
        <img src='/pwa-512x512.png' alt='Logo Km0' className='h-8 w-8' />
        <h1 className='font-bold text-xl'>{t('header.companyName')}</h1>
      </Link>
    </>
  );
};
