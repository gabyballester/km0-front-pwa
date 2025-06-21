import type { RouteConfig } from '../types';

/**
 * Constructor de rutas con utilidades para optimizar la creación de rutas
 * 
 * Proporciona métodos estáticos para manipular y validar configuraciones de rutas.
 * Útil para construir sistemas de navegación complejos y validar su estructura.
 * 
 * @example
 * ```tsx
 * // Combinar rutas de diferentes módulos
 * const publicRoutes = RouteBuilder.combineRoutes(
 *   authRoutes,
 *   landingRoutes,
 *   aboutRoutes
 * );
 * 
 * // Filtrar rutas por criterios
 * const visibleRoutes = RouteBuilder.filterRoutes(
 *   allRoutes,
 *   route => !route.meta?.hidden && route.meta?.requiresAuth
 * );
 * 
 * // Encontrar ruta específica
 * const dashboardRoute = RouteBuilder.findRouteByPath(routes, '/dashboard');
 * 
 * // Obtener rutas navegables
 * const navRoutes = RouteBuilder.getNavigableRoutes(routes);
 * 
 * // Validar estructura de rutas
 * const validation = RouteBuilder.validateRoutes(routes);
 * if (!validation.isValid) {
 *   console.error('Errores en rutas:', validation.errors);
 * }
 * 
 * // Generar breadcrumbs
 * const breadcrumbs = RouteBuilder.generateBreadcrumbs(routes, '/dashboard/settings');
 * ```
 */
export class RouteBuilder {
  /**
   * Combina múltiples arrays de rutas en uno solo
   * 
   * Útil para unir rutas de diferentes módulos o features.
   * 
   * @param routeArrays - Arrays de rutas a combinar
   * @returns Array combinado de todas las rutas
   * 
   * @example
   * ```tsx
   * const allRoutes = RouteBuilder.combineRoutes(
   *   publicRoutes,
   *   protectedRoutes,
   *   adminRoutes
   * );
   * ```
   */
  static combineRoutes(...routeArrays: RouteConfig[][]): RouteConfig[] {
    return routeArrays.flat();
  }

  /**
   * Filtra rutas basándose en criterios específicos
   * 
   * Permite filtrar rutas por cualquier criterio personalizado.
   * 
   * @param routes - Array de rutas a filtrar
   * @param filter - Función de filtrado que retorna boolean
   * @returns Array filtrado de rutas
   * 
   * @example
   * ```tsx
   * // Filtrar rutas públicas
   * const publicRoutes = RouteBuilder.filterRoutes(
   *   routes,
   *   route => route.meta?.type === 'public'
   * );
   * 
   * // Filtrar rutas con permisos específicos
   * const adminRoutes = RouteBuilder.filterRoutes(
   *   routes,
   *   route => route.meta?.permissions?.includes('admin')
   * );
   * ```
   */
  static filterRoutes(
    routes: RouteConfig[],
    filter: (route: RouteConfig) => boolean
  ): RouteConfig[] {
    return routes.filter(filter);
  }

  /**
   * Encuentra una ruta por su path
   * 
   * Busca recursivamente en la estructura de rutas anidadas.
   * 
   * @param routes - Array de rutas donde buscar
   * @param path - Path de la ruta a encontrar
   * @returns Configuración de la ruta encontrada o undefined
   * 
   * @example
   * ```tsx
   * const dashboardRoute = RouteBuilder.findRouteByPath(routes, '/dashboard');
   * if (dashboardRoute) {
   *   console.log('Ruta encontrada:', dashboardRoute.title);
   * }
   * 
   * // Buscar en rutas anidadas
   * const settingsRoute = RouteBuilder.findRouteByPath(routes, '/dashboard/settings');
   * ```
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
   * 
   * Filtra rutas que no están marcadas como ocultas.
   * 
   * @param routes - Array de rutas a filtrar
   * @returns Array de rutas navegables
   * 
   * @example
   * ```tsx
   * const navItems = RouteBuilder.getNavigableRoutes(routes).map(route => ({
   *   label: route.title,
   *   href: route.path
   * }));
   * ```
   */
  static getNavigableRoutes(routes: RouteConfig[]): RouteConfig[] {
    return this.filterRoutes(routes, route => !route.meta?.hidden);
  }

  /**
   * Valida la estructura de rutas
   * 
   * Verifica duplicados, rutas index válidas y estructura general.
   * 
   * @param routes - Array de rutas a validar
   * @returns Objeto con resultado de validación y errores
   * 
   * @example
   * ```tsx
   * const validation = RouteBuilder.validateRoutes(routes);
   * 
   * if (!validation.isValid) {
   *   validation.errors.forEach(error => {
   *     console.error('Error en rutas:', error);
   *   });
   * } else {
   *   console.log('Rutas válidas');
   * }
   * ```
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
   * 
   * Construye la ruta de navegación completa hasta la ruta actual.
   * 
   * @param routes - Array de rutas disponibles
   * @param currentPath - Path actual para generar breadcrumbs
   * @returns Array de breadcrumbs con título y path
   * 
   * @example
   * ```tsx
   * const breadcrumbs = RouteBuilder.generateBreadcrumbs(routes, '/dashboard/settings/profile');
   * 
   * // Resultado: [
   * //   { title: 'Dashboard', path: '/dashboard' },
   * //   { title: 'Settings', path: '/dashboard/settings' },
   * //   { title: 'Profile', path: '/dashboard/settings/profile' }
   * // ]
   * 
   * // Renderizar breadcrumbs
   * breadcrumbs.map((crumb, index) => (
   *   <BreadcrumbItem key={crumb.path}>
   *     <BreadcrumbLink href={crumb.path}>
   *       {crumb.title}
   *     </BreadcrumbLink>
   *   </BreadcrumbItem>
   * ))
   * ```
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
