/**
 * Application route paths - Type-safe route definitions
 */

export const PATHS = {
  // Rutas públicas
  HOME: '/',
  ABOUT: '/about',
  GOOGLE_MAPS: '/maps',

  // Rutas de autenticación
  AUTH: '/auth',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // Rutas protegidas
  DASHBOARD: '/dashboard'
} as const;
