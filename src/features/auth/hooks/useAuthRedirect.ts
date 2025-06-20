import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/shared/contexts';

import { PATHS } from '@paths';

export const useAuthRedirect = (
  options: {
    requireAuth?: boolean;
    redirectPath?: string;
    preventRedirect?: boolean;
  } = {}
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
