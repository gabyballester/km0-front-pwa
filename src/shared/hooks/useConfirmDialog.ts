import { useCallback, useState } from 'react';

export interface ConfirmDialogOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'success' | 'error';
  preventCloseOnClickOutside?: boolean;
  preventCloseOnEscape?: boolean;
}

export interface ConfirmDialogState {
  isOpen: boolean;
  options: ConfirmDialogOptions;
  onConfirm: (() => void | Promise<void>) | null;
  onCancel: (() => void) | null;
}

/**
 * Hook para manejar modales de confirmación de manera fácil
 *
 * @example
 * ```tsx
 * // Uso básico
 * const { confirmDialog, showConfirmDialog } = useConfirmDialog();
 *
 * const handleDelete = () => {
 *   showConfirmDialog({
 *     title: "Eliminar elemento",
 *     description: "¿Estás seguro?",
 *     onConfirm: () => deleteItem(id)
 *   });
 * };
 *
 * return (
 *   <>
 *     <Button onClick={handleDelete}>Eliminar</Button>
 *     <ConfirmDialog {...confirmDialog} />
 *   </>
 * );
 *
 * // Con diferentes tipos
 * const handlePublish = () => {
 *   showConfirmDialog({
 *     title: "Publicar contenido",
 *     description: "¿Quieres publicar ahora?",
 *     type: "info",
 *     confirmText: "Publicar",
 *     onConfirm: () => publishContent()
 *   });
 * };
 *
 * const handleReset = () => {
 *   showConfirmDialog({
 *     title: "Restablecer configuración",
 *     description: "¿Estás seguro? Esta acción no se puede deshacer.",
 *     type: "error",
 *     confirmText: "Restablecer",
 *     preventCloseOnClickOutside: true,
 *     onConfirm: () => resetConfig()
 *   });
 * };
 *
 * // Con manejo de errores
 * const handleCriticalAction = () => {
 *   showConfirmDialog({
 *     title: "Acción crítica",
 *     description: "Esta acción es irreversible",
 *     type: "warning",
 *     onConfirm: async () => {
 *       try {
 *         await criticalOperation();
 *         showSuccess("Operación exitosa");
 *       } catch (error) {
 *         showError("Error en la operación");
 *       }
 *     }
 *   });
 * };
 * ```
 */
export function useConfirmDialog() {
  const [state, setState] = useState<ConfirmDialogState>({
    isOpen: false,
    options: {},
    onConfirm: null,
    onCancel: null
  });

  const showConfirmDialog = useCallback(
    (
      options: ConfirmDialogOptions & {
        onConfirm: () => void | Promise<void>;
        onCancel?: () => void;
      }
    ) => {
      const { onConfirm, onCancel, ...dialogOptions } = options;
      setState({
        isOpen: true,
        options: dialogOptions,
        onConfirm,
        onCancel: onCancel || null
      });
    },
    []
  );

  const hideConfirmDialog = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const confirmDialog = {
    open: state.isOpen,
    onOpenChange: (open: boolean) => {
      if (!open) {
        hideConfirmDialog();
      }
    },
    title: state.options.title || 'Confirmar acción',
    description: state.options.description,
    confirmText: state.options.confirmText || 'Confirmar',
    cancelText: state.options.cancelText || 'Cancelar',
    type: state.options.type || 'warning',
    preventCloseOnClickOutside: state.options.preventCloseOnClickOutside,
    preventCloseOnEscape: state.options.preventCloseOnEscape,
    onConfirm: state.onConfirm || (() => {}),
    onCancel: state.onCancel || (() => {})
  };

  return {
    confirmDialog,
    showConfirmDialog,
    hideConfirmDialog
  };
}
