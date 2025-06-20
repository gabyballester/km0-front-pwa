/**
 * Sistema de routing modular para React TypeScript Vite
 *
 * Características:
 * - Estructura modular por features
 * - Separación de responsabilidades (DRY/SOLID)
 * - Type safety completo
 * - Escalabilidad optimizada
 * - Rendimiento mejorado con lazy loading
 * - Validación automática en desarrollo
 */

// Exportaciones principales
export { Router } from './core/router';
export { PATHS } from './paths.router';
export { routes, routeUtils } from './routes';

// Exportaciones de tipos
export type { RouteConfig, RouteType } from './types';

// Exportaciones de utilidades
export { useRouteType } from './hooks/useRouteType';
export { RouteBuilder } from './utils/route-builder';

// Exportaciones de módulos (para uso avanzado)
export { authRoutes } from './modules/auth.routes';
export { protectedRoutes } from './modules/protected.routes';
export { publicRoutes } from './modules/public.routes';

// Exportaciones de componentes
export { RouteGuard } from './components/RouteGuard';
