import { useTranslation } from 'react-i18next';

import { Link, Outlet, useLocation } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import { PATHS } from '@/router/paths.router';
import { Button } from '@/shared/components/ui/button';
import { combineClassNames } from '@/shared/utils';

export function AuthLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useTranslation();

  return (
    <div className='flex flex-col h-screen w-screen'>
      {/* Header */}
      <header className='mx-auto px-4 h-16 flex items-center justify-between flex-shrink-0'>
        <Link to={PATHS.HOME} className='flex items-center gap-2 text-xl font-semibold'>
          <ArrowLeft className='h-5 w-5' />
          <span>{t('auth.backToHome')}</span>
        </Link>
        <nav className='flex items-center gap-4'>
          <Button
            variant='ghost'
            asChild
            className={combineClassNames(
              'hover:bg-transparent hover:text-primary',
              currentPath === PATHS.LOGIN && 'text-primary'
            )}
          >
            <Link to={PATHS.LOGIN}>{t('auth.login')}</Link>
          </Button>
          <Button
            variant='ghost'
            asChild
            className={combineClassNames(
              'hover:bg-transparent hover:text-primary',
              currentPath === PATHS.REGISTER && 'text-primary'
            )}
          >
            <Link to={PATHS.REGISTER}>{t('auth.register')}</Link>
          </Button>
        </nav>
      </header>
      <main className='h-full flex items-center justify-center overflow-x-auto'>
        <Outlet />
      </main>
    </div>
  );
}
