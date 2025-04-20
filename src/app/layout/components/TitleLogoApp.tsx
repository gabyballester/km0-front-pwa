import { Link } from 'react-router';

import { APP_ROUTES } from '@/shared/constants/routes';

export const TitleLogoApp = () => {
  return (
    <>
      <Link to={APP_ROUTES.HOME} className='flex gap-4'>
        <img src='/pwa-512x512.png' alt='Logo Km0' className='h-8 w-8' />
        <h1 className='font-bold text-xl'>Mi Empresa</h1>
      </Link>
    </>
  );
};
