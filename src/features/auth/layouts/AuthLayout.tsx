import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { PATHS } from '@/router/paths.router';
import { Button } from '@/shared/components/ui/button';
import { BaseLayout } from '@/shared/layouts/BaseLayout';
import { cn } from '@/shared/utils';

export function AuthLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useTranslation();

  const header = (
    <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
      <Link to={PATHS.HOME} className='flex items-center gap-2 text-xl font-semibold'>
        <ArrowLeft className='h-5 w-5' />
        <span>{t('auth.backToHome')}</span>
      </Link>
      <nav className='flex items-center gap-4'>
        <Button
          variant='ghost'
          asChild
          className={cn(
            'hover:bg-transparent hover:text-primary',
            currentPath === PATHS.LOGIN && 'text-primary'
          )}
        >
          <Link to={PATHS.LOGIN}>{t('auth.login')}</Link>
        </Button>
        <Button
          variant='ghost'
          asChild
          className={cn(
            'hover:bg-transparent hover:text-primary',
            currentPath === PATHS.REGISTER && 'text-primary'
          )}
        >
          <Link to={PATHS.REGISTER}>{t('auth.register')}</Link>
        </Button>
      </nav>
    </div>
  );

  return (
    <BaseLayout
      header={header}
      className='bg-gradient-to-b from-background to-muted/50 min-h-screen'
      mainClassName='max-w-md mx-auto flex items-center justify-center'
    >
      <Outlet />
    </BaseLayout>
  );
}
