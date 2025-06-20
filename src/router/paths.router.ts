/**
 * Application route paths - Type-safe route definitions
 */

export const PATHS = {
  /**
   * Rutas públicas
   * (accesibles siempre)
   */
  HOME: '/',
  ABOUT: '/about',
  GOOGLE_MAPS: '/maps',

  /**
   * Rutas de autenticación
   * (accesibles sólo si no estás autenticado)
   */
  AUTH: '/auth',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',

  /**
   * Rutas protegidas
   * (accesibles sólo si estás autenticado)
   */
  DASHBOARD: '/dashboard'
} as const;
