import { lazy } from 'react';

import { PATHS } from '@paths';

import { NotFoundPage } from '@pages';

import type { RouteConfig } from '../types';

// Lazy load de páginas públicas
const LandingPage = lazy(() => import('@/features/landing/pages/LandingPage'));
const AboutPage = lazy(() => import('@/features/about/AboutPage'));
const GoogleMapsPage = lazy(() => import('@/features/google-maps/GoogleMapsPage'));

/**
 * Configuración de rutas públicas
 * Estas rutas son accesibles sin autenticación
 */
export const publicRoutes: RouteConfig[] = [
  {
    path: PATHS.HOME,
    type: 'public',
    element: <LandingPage />,
    title: 'Inicio',
    description: 'Página principal de KM0',
    meta: {
      hidden: false
    }
  },
  {
    path: PATHS.ABOUT,
    type: 'public',
    element: <AboutPage />,
    title: 'Acerca de',
    description: 'Información sobre KM0 y nuestra misión',
    meta: {
      hidden: false
    }
  },
  {
    path: PATHS.GOOGLE_MAPS,
    type: 'public',
    element: <GoogleMapsPage />,
    title: 'Mapas',
    description: 'Visualización de mapas y ubicaciones',
    meta: {
      hidden: false
    }
  },
  {
    path: '*',
    type: 'public',
    element: <NotFoundPage />,
    title: 'Página no encontrada',
    description: 'La página que buscas no existe',
    meta: {
      hidden: true
    }
  }
];
