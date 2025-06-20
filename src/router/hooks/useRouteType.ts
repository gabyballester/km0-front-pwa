import { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { routes } from '../routes';

import type { RouteType } from '../types';

/**
 * Hook para determinar el tipo de ruta actual
 * Útil para aplicar lógica específica según el tipo de ruta
 *
 * @returns El tipo de ruta actual (public, auth, protected)
 *
 * @example
 * ```tsx
 * const routeType = useRouteType();
 *
 * if (routeType === 'protected') {
 *   // Lógica específica para rutas protegidas
 * }
 * ```
 */
export function useRouteType(): RouteType {
  const location = useLocation();

  return useMemo(() => {
    const findRouteType = (routeList: typeof routes, pathname: string): RouteType => {
      for (const route of routeList) {
        // Coincidencia exacta
        if (route.path === pathname) {
          return route.type;
        }

        // Buscar en rutas hijas
        if (route.children) {
          for (const child of route.children) {
            const childPath = route.path === '/' ? `/${child.path}` : `${route.path}/${child.path}`;

            if (childPath === pathname) {
              return child.type;
            }
          }
        }

        // Coincidencia de prefijo para rutas dinámicas
        if (pathname.startsWith(route.path) && route.path !== '/') {
          return route.type;
        }
      }

      // Por defecto, rutas públicas
      return 'public';
    };

    return findRouteType(routes, location.pathname);
  }, [location.pathname]);
}
