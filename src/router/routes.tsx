import { lazy } from 'react';

import { Home } from 'lucide-react';

import { PATHS } from './paths.router';

import type { RouteConfig } from './types';

// Lazy load layouts
const AuthLayout = lazy(() =>
  import('@/features/auth/layouts/AuthLayout').then(m => ({ default: m.AuthLayout }))
);
const DashboardLayout = lazy(() =>
  import('@/features/dashboard/DashboardLayout').then(m => ({ default: m.DashboardLayout }))
);

// Lazy load pages
const LandingPage = lazy(() => import('@/features/landing/LandingPage'));
const AboutPage = lazy(() => import('@/features/about/AboutPage'));
const NotFoundPage = lazy(() => import('@/shared/pages/NotFoundPage'));
const LoginPage = lazy(() => import('@/features/auth/pages/login/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/register/RegisterPage'));

// Lazy load dashboard pages
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'));

// Lazy load other pages
const GoogleMapsPage = lazy(() => import('@/features/google-maps/GoogleMapsPage'));

/**
 * Configuración de todas las rutas de la aplicación
 * Cada ruta incluye metadatos para navegación y autorización
 */
export const routes: RouteConfig[] = [
  // Rutas públicas
  {
    path: PATHS.HOME,
    type: 'public',
    element: <LandingPage />,
    title: 'Inicio',
    description: 'Página principal'
  },
  {
    path: PATHS.ABOUT,
    type: 'public',
    element: <AboutPage />,
    title: 'Acerca de',
    description: 'Información sobre nosotros'
  },
  {
    path: PATHS.GOOGLE_MAPS,
    type: 'public',
    element: <GoogleMapsPage />,
    title: 'Mapas',
    description: 'Visualización de mapas'
  },

  // Rutas de autenticación
  {
    path: PATHS.AUTH,
    type: 'auth',
    element: <AuthLayout />,
    isLayout: true,
    children: [
      {
        path: 'login',
        type: 'auth',
        element: <LoginPage />,
        title: 'Iniciar Sesión3',
        description: 'Accede a tu cuenta'
      },
      {
        path: 'register',
        type: 'auth',
        element: <RegisterPage />,
        title: 'Registrarse',
        description: 'Crea una nueva cuenta'
      }
    ]
  },

  // Rutas protegidas (Dashboard)
  {
    path: PATHS.DASHBOARD,
    type: 'protected',
    element: <DashboardLayout />,
    isLayout: true,
    meta: {
      roles: ['user', 'admin'],
      icon: <Home className='h-5 w-5' />
    },
    children: [
      {
        path: '',
        index: true,
        type: 'protected',
        element: <DashboardPage />,
        title: 'Dashboard',
        description: 'Panel de control',
        meta: {
          roles: ['user', 'admin']
        }
      }
    ]
  },

  // 404 - Siempre al final
  {
    path: '*',
    type: 'public',
    element: <NotFoundPage />,
    title: 'Página no encontrada',
    description: 'La página que buscas no existe'
  }
];
