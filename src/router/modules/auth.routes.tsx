import { lazy } from 'react';

import { PATHS } from '@paths';

import type { RouteConfig } from '../types';

// Lazy load de layout y páginas de autenticación
const AuthLayout = lazy(() =>
  import('@/features/auth/layouts/AuthLayout').then(m => ({ default: m.AuthLayout }))
);
const LoginPage = lazy(() => import('@/features/auth/pages/login/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/register/RegisterPage'));

/**
 * Configuración de rutas de autenticación
 * Estas rutas solo son accesibles si NO estás autenticado
 */
export const authRoutes: RouteConfig[] = [
  {
    path: PATHS.AUTH,
    type: 'auth',
    element: <AuthLayout />,
    isLayout: true,
    title: 'Autenticación',
    description: 'Área de autenticación de usuarios',
    children: [
      {
        path: 'login',
        type: 'auth',
        element: <LoginPage />,
        title: 'Iniciar Sesión',
        description: 'Accede a tu cuenta de KM0',
        meta: {
          hidden: false
        }
      },
      {
        path: 'register',
        type: 'auth',
        element: <RegisterPage />,
        title: 'Registrarse',
        description: 'Crea tu nueva cuenta en KM0',
        meta: {
          hidden: false
        }
      }
    ]
  }
];
