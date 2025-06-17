import { useCallback } from 'react';

import { useAuth } from '@/shared/contexts/AuthContext';

interface RequireAuthOptions {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onCancel?: () => void;
}

/**
 * Hook para verificar autenticación y mostrar modal si es necesario
 *
 * @param options Opciones para personalizar el modal
 * @returns función para verificar y ejecutar acciones protegidas
 */
export function useRequireAuth(options: RequireAuthOptions = {}) {
  const { isAuthenticated, showAuthModal } = useAuth();

  const requireAuth = useCallback(
    (action?: () => void) => {
      if (!isAuthenticated) {
        showAuthModal({
          title: options.title || 'Autenticación requerida',
          description: options.description || 'Para realizar esta acción necesitas iniciar sesión.',
          icon: options.icon,
          onCancel: options.onCancel
        });

        return false; // Indica que la acción no se ejecutó
      }

      // Usuario autenticado, ejecutar acción si se proporciona
      action?.();
      return true; // Indica que la acción se ejecutó
    },
    [isAuthenticated, showAuthModal, options]
  );

  const executeIfAuthenticated = useCallback(
    (action: () => void) => {
      return requireAuth(action);
    },
    [requireAuth]
  );

  return {
    isAuthenticated,
    requireAuth,
    executeIfAuthenticated,
    // Helper directo para mostrar modal personalizado
    showAuthModal: (customOptions?: RequireAuthOptions) =>
      showAuthModal({
        ...options,
        ...customOptions,
        onCancel: customOptions?.onCancel || options.onCancel
      })
  };
}
