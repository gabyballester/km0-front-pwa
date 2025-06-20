import type { RouteConfig } from '../types';

/**
 * Constructor de rutas con utilidades para optimizar la creación de rutas
 */
export class RouteBuilder {
  /**
   * Combina múltiples arrays de rutas en uno solo
   */
  static combineRoutes(...routeArrays: RouteConfig[][]): RouteConfig[] {
    return routeArrays.flat();
  }

  /**
   * Filtra rutas basándose en criterios específicos
   */
  static filterRoutes(
    routes: RouteConfig[],
    filter: (route: RouteConfig) => boolean
  ): RouteConfig[] {
    return routes.filter(filter);
  }

  /**
   * Encuentra una ruta por su path
   */
  static findRouteByPath(routes: RouteConfig[], path: string): RouteConfig | undefined {
    for (const route of routes) {
      if (route.path === path) {
        return route;
      }
      if (route.children) {
        const found = this.findRouteByPath(route.children, path);
        if (found) return found;
      }
    }
    return undefined;
  }

  /**
   * Obtiene todas las rutas visibles para navegación
   */
  static getNavigableRoutes(routes: RouteConfig[]): RouteConfig[] {
    return this.filterRoutes(routes, route => !route.meta?.hidden);
  }

  /**
   * Valida la estructura de rutas
   */
  static validateRoutes(routes: RouteConfig[]): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    const paths = new Set<string>();

    const validateRoute = (route: RouteConfig, parentPath = '') => {
      const fullPath = parentPath + route.path;

      // Verificar duplicados
      if (paths.has(fullPath)) {
        errors.push(`Ruta duplicada encontrada: ${fullPath}`);
      }
      paths.add(fullPath);

      // Verificar rutas index sin children
      if (route.index && route.children?.length) {
        errors.push(`Ruta index no puede tener children: ${fullPath}`);
      }

      // Validar children recursivamente
      if (route.children) {
        route.children.forEach(child => validateRoute(child, `${fullPath}/`));
      }
    };

    routes.forEach(route => validateRoute(route));

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Genera breadcrumbs para una ruta específica
   */
  static generateBreadcrumbs(
    routes: RouteConfig[],
    currentPath: string
  ): Array<{
    title: string;
    path: string;
  }> {
    const breadcrumbs: Array<{ title: string; path: string }> = [];

    const findPath = (
      routeList: RouteConfig[],
      targetPath: string,
      currentBreadcrumbs: Array<{ title: string; path: string }> = []
    ) => {
      for (const route of routeList) {
        const newBreadcrumbs = [
          ...currentBreadcrumbs,
          {
            title: route.title || route.path,
            path: route.path
          }
        ];

        if (route.path === targetPath) {
          breadcrumbs.push(...newBreadcrumbs);
          return true;
        }

        if (route.children && findPath(route.children, targetPath, newBreadcrumbs)) {
          return true;
        }
      }
      return false;
    };

    findPath(routes, currentPath);
    return breadcrumbs;
  }
}
