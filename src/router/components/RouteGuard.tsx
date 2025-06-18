import type { ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/shared/contexts/AuthContext';

import { PATHS } from '../paths.router';

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

  // Rutas públicas: siempre accesibles
  if (type === 'public') {
    return <>{children}</>;
  }

  // Rutas de auth: solo accesibles si NO está autenticado
  if (type === 'auth') {
    if (isAuthenticated) {
      return <Navigate to={PATHS.DASHBOARD} replace />;
    }
    return <>{children}</>;
  }

  // Rutas protegidas: solo accesibles si está autenticado
  if (type === 'protected') {
    if (!isAuthenticated) {
      return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />;
    }
    return <>{children}</>;
  }

  return null;
}
