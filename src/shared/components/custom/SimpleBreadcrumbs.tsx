import { useTranslation } from 'react-i18next';

import { Link, useLocation } from 'react-router-dom';

import { ChevronRight, Home } from 'lucide-react';

import { PATHS } from '@paths';

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export function SimpleBreadcrumbs() {
  const location = useLocation();
  const { t } = useTranslation();

  // Solo mostrar breadcrumbs si no estamos en home
  if (location.pathname === PATHS.HOME) return null;

  const routeLabels: Record<string, string> = {
    [PATHS.HOME]: t('breadcrumbs.home'),
    [PATHS.ABOUT]: t('breadcrumbs.about'),
    [PATHS.GOOGLE_MAPS]: t('breadcrumbs.googleMaps'),
    [PATHS.DASHBOARD]: t('breadcrumbs.dashboard')
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: t('breadcrumbs.home'),
      path: PATHS.HOME,
      icon: <Home className='h-4 w-4' />
    }
  ];

  // Agregar página actual
  const currentLabel = routeLabels[location.pathname] || location.pathname;
  if (currentLabel !== t('breadcrumbs.home')) {
    breadcrumbs.push({
      label: currentLabel,
      path: location.pathname
    });
  }

  return (
    <nav className='flex items-center text-sm text-muted-foreground px-4 py-2'>
      <div className='flex items-center space-x-1'>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <div key={breadcrumb.path} className='flex items-center'>
              {index > 0 && <ChevronRight className='h-4 w-4 mx-2 text-muted-foreground/50' />}

              {isLast ? (
                <span className='font-medium text-foreground flex items-center gap-1'>
                  {breadcrumb.icon}
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className='flex items-center gap-1 hover:text-foreground transition-colors'
                >
                  {breadcrumb.icon}
                  {breadcrumb.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
