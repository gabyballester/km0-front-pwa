import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@contexts';

import { PATHS } from '@paths';

interface UseAuthRedirectOptions {
  /** Si requiere autenticación para acceder a la página */
  requireAuth?: boolean;
  /** Ruta de redirección cuando no se requiere auth pero el usuario está autenticado */
  redirectPath?: string;
  /** Prevenir redirección automática */
  preventRedirect?: boolean;
}

/**
 * Hook para manejar redirecciones basadas en el estado de autenticación
 * 
 * Automáticamente redirige a los usuarios según su estado de autenticación
 * y los requisitos de la página actual.
 * 
 * @example
 * ```tsx
 * // Página que requiere autenticación
 * function ProtectedPage() {
 *   const { isAuthenticated } = useAuthRedirect({ requireAuth: true });
 * 
 *   if (!isAuthenticated) {
 *     return <div>Redirigiendo al login...</div>;
 *   }
 * 
 *   return <div>Contenido protegido</div>;
 * }
 * 
 * // Página pública que redirige usuarios autenticados
 * function PublicPage() {
 *   const { isAuthenticated } = useAuthRedirect({ 
 *     requireAuth: false,
 *     redirectPath: '/dashboard'
 *   });
 * 
 *   if (isAuthenticated) {
 *     return <div>Redirigiendo al dashboard...</div>;
 *   }
 * 
 *   return <div>Contenido público</div>;
 * }
 * 
 * // Página de login con redirección automática
 * function LoginPage() {
 *   const { isAuthenticated } = useAuthRedirect({ 
 *     requireAuth: false,
 *     redirectPath: '/dashboard'
 *   });
 * 
 *   if (isAuthenticated) {
 *     return <div>Ya estás autenticado, redirigiendo...</div>;
 *   }
 * 
 *   return <LoginForm />;
 * }
 * 
 * // Página con redirección personalizada
 * function CustomRedirectPage() {
 *   const { isAuthenticated } = useAuthRedirect({
 *     requireAuth: true,
 *     redirectPath: '/custom-login'
 *   });
 * 
 *   return <div>Página con redirección personalizada</div>;
 * }
 * 
 * // Página que previene redirección automática
 * function NoRedirectPage() {
 *   const { isAuthenticated } = useAuthRedirect({
 *     requireAuth: true,
 *     preventRedirect: true
 *   });
 * 
 *   return (
 *     <div>
 *       {!isAuthenticated ? (
 *         <p>Necesitas iniciar sesión para ver este contenido</p>
 *       ) : (
 *         <p>Contenido protegido</p>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * 
 * @param options - Opciones de configuración del hook
 * @returns Objeto con estado de autenticación y configuración
 */
export const useAuthRedirect = (
  options: UseAuthRedirectOptions = {}
) => {
  const { requireAuth = false, redirectPath, preventRedirect = false } = options;
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (preventRedirect) return;

    if (requireAuth && !isAuthenticated) {
      // Guardar la ubicación original
      navigate(PATHS.LOGIN, {
        state: {
          from: location,
          message: 'Necesitas iniciar sesión para acceder a esta página'
        },
        replace: true
      });
    } else if (!requireAuth && isAuthenticated) {
      navigate(redirectPath || PATHS.HOME, { replace: true });
    }
  }, [isAuthenticated, requireAuth, redirectPath, navigate, location, preventRedirect]);

  return {
    isAuthenticated,
    requireAuth
  };
};
