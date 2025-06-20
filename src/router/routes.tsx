import { logger } from '@/shared/utils';

import { authRoutes } from './modules/auth.routes';
import { protectedRoutes } from './modules/protected.routes';
import { publicRoutes } from './modules/public.routes';
import { RouteBuilder } from './utils/route-builder';

import type { RouteConfig } from './types';

/**
 * Configuración unificada de todas las rutas de la aplicación
 * Utiliza un sistema modular para mejor organización y mantenibilidad
 *
 * @example
 * ```tsx
 * // Para agregar nuevas rutas, edita el módulo correspondiente:
 * // - publicRoutes: src/router/modules/public.routes.tsx
 * // - authRoutes: src/router/modules/auth.routes.tsx
 * // - protectedRoutes: src/router/modules/protected.routes.tsx
 * ```
 */
export const routes: RouteConfig[] = RouteBuilder.combineRoutes(
  publicRoutes,
  authRoutes,
  protectedRoutes
);

// Validación de rutas en desarrollo
if (process.env.NODE_ENV === 'development') {
  const validation = RouteBuilder.validateRoutes(routes);
  if (!validation.isValid) {
    logger.warn('⚠️ Problemas detectados en la configuración de rutas:', validation.errors);
  } else {
    logger.info('✅ Configuración de rutas validada correctamente');
  }
}

/**
 * Utilidades exportadas para uso en componentes
 */
export const routeUtils = {
  /**
   * Obtiene todas las rutas navegables (no ocultas)
   */
  getNavigableRoutes: () => RouteBuilder.getNavigableRoutes(routes),

  /**
   * Encuentra una ruta específica por su path
   */
  findRoute: (path: string) => RouteBuilder.findRouteByPath(routes, path),

  /**
   * Genera breadcrumbs para navegación
   */
  getBreadcrumbs: (currentPath: string) => RouteBuilder.generateBreadcrumbs(routes, currentPath),

  /**
   * Filtra rutas por tipo
   */
  getRoutesByType: (type: 'public' | 'auth' | 'protected') =>
    RouteBuilder.filterRoutes(routes, route => route.type === type)
};
