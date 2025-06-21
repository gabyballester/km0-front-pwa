
import type { ReactNode } from 'react';

import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

import { Button, Modal } from '@components';

import { logger } from '@utils';

export interface ConfirmDialogProps {
  /** Indica si el modal está abierto */
  open: boolean;
  /** Función que se llama cuando cambia el estado del modal */
  onOpenChange: (open: boolean) => void;
  /** Título del modal */
  title: string;
  /** Descripción del modal */
  description?: string;
  /** Contenido adicional del modal */
  children?: ReactNode;
  /** Texto del botón de confirmación */
  confirmText?: string;
  /** Texto del botón de cancelación */
  cancelText?: string;
  /** Variante del botón de confirmación */
  confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Tipo de confirmación (afecta el icono y colores) */
  type?: 'info' | 'warning' | 'success' | 'error';
  /** Función que se ejecuta al confirmar */
  onConfirm: () => void | Promise<void>;
  /** Función que se ejecuta al cancelar */
  onCancel?: () => void;
  /** Indica si el botón de confirmación está cargando */
  isLoading?: boolean;
  /** Indica si se debe prevenir el cierre al hacer clic fuera */
  preventCloseOnClickOutside?: boolean;
  /** Indica si se debe prevenir el cierre al presionar Escape */
  preventCloseOnEscape?: boolean;
  /** Tamaño del modal */
  size?: 'sm' | 'md' | 'lg';
}

const typeConfig = {
  info: {
    icon: Info,
    iconColor: 'text-blue-500',
    confirmVariant: 'default' as const
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
    confirmVariant: 'default' as const
  },
  success: {
    icon: CheckCircle,
    iconColor: 'text-green-500',
    confirmVariant: 'default' as const
  },
  error: {
    icon: XCircle,
    iconColor: 'text-red-500',
    confirmVariant: 'destructive' as const
  }
};

/**
 * Componente ConfirmDialog para confirmaciones de acciones
 *
 * @example
 * ```tsx
 * // Confirmación básica
 * <ConfirmDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Eliminar elemento"
 *   description="¿Estás seguro de que quieres eliminar este elemento?"
 *   onConfirm={handleDelete}
 *   type="warning"
 *   confirmText="Eliminar"
 *   cancelText="Cancelar"
 * />
 *
 * // Confirmación crítica con prevención de cierre
 * <ConfirmDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Restablecer configuración"
 *   description="Todas las configuraciones se restablecerán. ¿Estás seguro?"
 *   type="error"
 *   confirmText="Restablecer"
 *   onConfirm={handleReset}
 *   preventCloseOnClickOutside
 *   preventCloseOnEscape
 * />
 *
 * // Confirmación informativa
 * <ConfirmDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Publicar contenido"
 *   description="¿Quieres publicar este contenido ahora?"
 *   type="info"
 *   confirmText="Publicar"
 *   onConfirm={handlePublish}
 * />
 *
 * // Con hook useConfirmDialog
 * const { confirmDialog, showConfirmDialog } = useConfirmDialog();
 *
 * const handleDelete = () => {
 *   showConfirmDialog({
 *     title: "Eliminar elemento",
 *     description: "¿Estás seguro?",
 *     type: "warning",
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
 * ```
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmVariant,
  type = 'info',
  onConfirm,
  onCancel,
  isLoading = false,
  preventCloseOnClickOutside = false,
  preventCloseOnEscape = false,
  size = 'sm'
}: ConfirmDialogProps) {
  const config = typeConfig[type];
  const IconComponent = config.icon;

  const handleConfirm = async () => {
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      logger.error('Error al confirmar:', error);
      // El error se maneja en la función onConfirm
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const footer = (
    <div className='flex gap-2 justify-end'>
      <Button variant='outline' onClick={handleCancel} disabled={isLoading}>
        {cancelText}
      </Button>
      <Button
        variant={confirmVariant || config.confirmVariant}
        onClick={handleConfirm}
        disabled={isLoading}
      >
        {isLoading ? 'Procesando...' : confirmText}
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      footer={footer}
      size={size}
      preventCloseOnClickOutside={preventCloseOnClickOutside}
      preventCloseOnEscape={preventCloseOnEscape}
    >
      <div className='flex items-start gap-3'>
        <IconComponent className={`w-5 h-5 mt-0.5 ${config.iconColor}`} />
        <div className='flex-1'>{children}</div>
      </div>
    </Modal>
  );
}
