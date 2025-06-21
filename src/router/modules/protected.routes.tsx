import { lazy } from 'react';

import { useTranslation } from 'react-i18next';

import { Home } from 'lucide-react';

import { PATHS } from '@paths';

import type { RouteConfig } from '../types';

// Lazy load de layout y páginas protegidas
const DashboardLayout = lazy(() =>
  import('@/features/dashboard/DashboardLayout').then(m => ({ default: m.DashboardLayout }))
);
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'));

/**
 * Hook para obtener las rutas protegidas con traducciones
 */
export const useProtectedRoutes = (): RouteConfig[] => {
  const { t } = useTranslation();

  return [
    {
      path: PATHS.DASHBOARD,
      type: 'protected',
      element: <DashboardLayout />,
      isLayout: true,
      title: t('navigation.dashboard'),
      description: t('dashboard.title'),
      meta: {
        roles: ['user', 'admin'],
        icon: <Home className='h-5 w-5' />,
        hidden: false
      },
      children: [
        {
          path: '',
          index: true,
          type: 'protected',
          element: <DashboardPage />,
          title: t('dashboard.title'),
          description: t('dashboard.title'),
          meta: {
            roles: ['user', 'admin'],
            hidden: false
          }
        }
        // Aquí se pueden agregar más rutas del dashboard:
        // {
        //   path: 'settings',
        //   type: 'protected',
        //   element: <SettingsPage />,
        //   title: 'Configuración',
        //   meta: { roles: ['user', 'admin'] }
        // }
      ]
    }
  ];
};

/**
 * Configuración de rutas protegidas (para compatibilidad)
 * Estas rutas solo son accesibles si estás autenticado
 */
export const protectedRoutes: RouteConfig[] = [
  {
    path: PATHS.DASHBOARD,
    type: 'protected',
    element: <DashboardLayout />,
    isLayout: true,
    title: 'Dashboard',
    description: 'Panel de control de KM0',
    meta: {
      roles: ['user', 'admin'],
      icon: <Home className='h-5 w-5' />,
      hidden: false
    },
    children: [
      {
        path: '',
        index: true,
        type: 'protected',
        element: <DashboardPage />,
        title: 'Panel Principal',
        description: 'Vista principal del dashboard',
        meta: {
          roles: ['user', 'admin'],
          hidden: false
        }
      }
      // Aquí se pueden agregar más rutas del dashboard:
      // {
      //   path: 'settings',
      //   type: 'protected',
      //   element: <SettingsPage />,
      //   title: 'Configuración',
      //   meta: { roles: ['user', 'admin'] }
      // }
    ]
  }
];
