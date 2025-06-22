import type { ReactNode } from 'react';

import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

import { Button, Modal } from '@ui';

export interface InfoModalProps {
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
  /** Texto del botón de cerrar */
  closeText?: string;
  /** Tipo de información (afecta el icono y colores) */
  type?: 'info' | 'warning' | 'success' | 'error';
  /** Función que se ejecuta al cerrar */
  onClose?: () => void;
  /** Indica si se debe prevenir el cierre al hacer clic fuera */
  preventCloseOnClickOutside?: boolean;
  /** Indica si se debe prevenir el cierre al presionar Escape */
  preventCloseOnEscape?: boolean;
  /** Tamaño del modal */
  size?: 'sm' | 'md' | 'lg';
  /** Clases CSS adicionales para el contenido */
  className?: string;
}

const typeConfig = {
  info: {
    icon: Info,
    iconColor: 'text-blue-500'
  },
  warning: {
    icon: AlertCircle,
    iconColor: 'text-yellow-500'
  },
  success: {
    icon: CheckCircle,
    iconColor: 'text-green-500'
  },
  error: {
    icon: XCircle,
    iconColor: 'text-red-500'
  }
};

/**
 * Componente InfoModal para mostrar información en modales
 *
 * Utiliza Modal de @ui para mostrar la información.
 *
 * @example
 * ```tsx
 * <InfoModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Información importante"
 *   description="Este es un mensaje informativo para el usuario"
 *   type="info"
 *   closeText="Entendido"
 * />
 *
 * // Advertencia
 * <InfoModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Advertencia"
 *   description="Esta acción puede tener consecuencias importantes"
 *   type="warning"
 *   closeText="Acepto los riesgos"
 * >
 *   <p className="text-sm text-muted-foreground">
 *     Detalles adicionales sobre los riesgos...
 *   </p>
 * </InfoModal>
 *
 * // Mensaje de éxito
 * <InfoModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Operación exitosa"
 *   description="Los cambios se han guardado correctamente"
 *   type="success"
 *   closeText="Perfecto"
 * />
 *
 * // Mensaje de error
 * <InfoModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Error del sistema"
 *   description="Ha ocurrido un error inesperado"
 *   type="error"
 *   closeText="Entendido"
 * >
 *   <div className="text-sm text-muted-foreground">
 *     <p>Código de error: ERR-001</p>
 *     <p>Contacta al soporte si el problema persiste.</p>
 *   </div>
 * </InfoModal>
 * ```
 */
export function InfoModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  closeText = 'Cerrar',
  type = 'info',
  onClose,
  preventCloseOnClickOutside = false,
  preventCloseOnEscape = false,
  size = 'sm',
  className
}: InfoModalProps) {
  const config = typeConfig[type];
  const IconComponent = config.icon;

  const handleClose = () => {
    onClose?.();
    onOpenChange(false);
  };

  const handleCloseOutside = () => {
    if (preventCloseOnClickOutside) {
      return;
    }
    handleClose();
  };

  const handleCloseEscape = () => {
    if (preventCloseOnEscape) {
      return;
    }
    handleClose();
  };

  const footer = (
    <div className='flex justify-end'>
      <Button onClick={handleClose}>{closeText}</Button>
    </div>
  );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      onCloseOutside={handleCloseOutside}
      onCloseEscape={handleCloseEscape}
      title={title}
      description={description}
      footer={footer}
      size={size}
      className={className}
    >
      <div className='flex items-start gap-3'>
        <IconComponent className={`w-5 h-5 mt-0.5 ${config.iconColor}`} />
        <div className='flex-1'>{children}</div>
      </div>
    </Modal>
  );
}
