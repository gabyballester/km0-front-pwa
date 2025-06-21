import { useCallback } from 'react';

import { useAuth } from '@contexts';

interface RequireAuthOptions {
  /** Título del modal de autenticación */
  title?: string;
  /** Descripción del modal de autenticación */
  description?: string;
  /** Icono personalizado para el modal */
  icon?: React.ReactNode;
  /** Función a ejecutar cuando se cancela el modal */
  onCancel?: () => void;
}

/**
 * Hook para verificar autenticación y mostrar modal si es necesario
 * 
 * Proporciona una forma elegante de proteger acciones que requieren
 * autenticación, mostrando automáticamente un modal de login cuando
 * el usuario no está autenticado.
 * 
 * @example
 * ```tsx
 * // Uso básico
 * function MyComponent() {
 *   const { requireAuth, isAuthenticated } = useRequireAuth();
 * 
 *   const handleProtectedAction = () => {
 *     const canExecute = requireAuth(() => {
 *       // Esta función solo se ejecuta si el usuario está autenticado
 *       console.log('Acción protegida ejecutada');
 *     });
 * 
 *     if (!canExecute) {
 *       console.log('Usuario no autenticado, mostrando modal');
 *     }
 *   };
 * 
 *   return (
 *     <Button onClick={handleProtectedAction}>
 *       Acción Protegida
 *     </Button>
 *   );
 * }
 * 
 * // Uso con opciones personalizadas
 * function CustomAuthComponent() {
 *   const { requireAuth } = useRequireAuth({
 *     title: 'Acceso Premium Requerido',
 *     description: 'Esta función solo está disponible para usuarios premium',
 *     icon: <Crown className="w-5 h-5" />
 *   });
 * 
 *   const handlePremiumAction = () => {
 *     requireAuth(() => {
 *       // Acción premium
 *       activatePremiumFeature();
 *     });
 *   };
 * 
 *   return <Button onClick={handlePremiumAction}>Función Premium</Button>;
 * }
 * 
 * // Uso con executeIfAuthenticated
 * function ConditionalComponent() {
 *   const { executeIfAuthenticated, isAuthenticated } = useRequireAuth();
 * 
 *   const handleAction = () => {
 *     executeIfAuthenticated(() => {
 *       // Solo se ejecuta si está autenticado
 *       performProtectedOperation();
 *     });
 *   };
 * 
 *   return (
 *     <div>
 *       <Button onClick={handleAction}>
 *         {isAuthenticated ? 'Ejecutar' : 'Iniciar Sesión'}
 *       </Button>
 *     </div>
 *   );
 * }
 * 
 * // Uso con modal personalizado
 * function AdvancedComponent() {
 *   const { showAuthModal } = useRequireAuth();
 * 
 *   const handleCustomAuth = () => {
 *     showAuthModal({
 *       title: 'Verificación requerida',
 *       description: 'Por favor verifica tu identidad',
 *       onCancel: () => {
 *         console.log('Usuario canceló la verificación');
 *       }
 *     });
 *   };
 * 
 *   return <Button onClick={handleCustomAuth}>Verificar Identidad</Button>;
 * }
 * ```
 * 
 * @param options - Opciones para personalizar el modal de autenticación
 * @returns Objeto con funciones para verificar y ejecutar acciones protegidas
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
