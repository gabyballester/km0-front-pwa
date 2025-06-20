import type { ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@contexts';

import { PATHS } from '@paths';

import type { RouteType } from '../types';

/**
 * Props para el componente RouteGuard
 */
interface RouteGuardProps {
  /** Contenido a proteger */
  children: ReactNode;
  /** Tipo de ruta */
  type: RouteType;
}

/**
 * Componente que protege rutas basándose en su tipo y el estado de autenticación
 * Utiliza un mapeo de funciones para mejor performance y mantenibilidad
 *
 * @example
 * ```tsx
 * // Ruta pública
 * <RouteGuard type="public">
 *   <PublicComponent />
 * </RouteGuard>
 *
 * // Ruta de autenticación
 * <RouteGuard type="auth">
 *   <LoginComponent />
 * </RouteGuard>
 *
 * // Ruta protegida
 * <RouteGuard type="protected">
 *   <ProtectedComponent />
 * </RouteGuard>
 * ```
 */
export function RouteGuard({ children, type }: RouteGuardProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Mapeo de guardias para cada tipo de ruta
  const routeGuards = {
    // Rutas públicas: siempre accesibles
    public: () => children,

    // Rutas de auth: solo accesibles si NO está autenticado
    auth: () => (isAuthenticated ? <Navigate to={PATHS.DASHBOARD} replace /> : children),

    // Rutas protegidas: solo accesibles si está autenticado
    protected: () =>
      !isAuthenticated ? <Navigate to={PATHS.LOGIN} state={{ from: location }} replace /> : children
  } as const;

  // Ejecutar el guardia correspondiente
  const guard = routeGuards[type];
  return guard ? guard() : null;
}
