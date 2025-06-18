import type { ReactNode } from 'react';

import { XIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle
} from '@/shared/components/ui/dialog';
import { combineClassNames } from '@/shared/utils';

export interface ModalProps {
  /** Indica si el modal está abierto */
  open: boolean;
  /** Función que se llama cuando cambia el estado del modal */
  onOpenChange: (open: boolean) => void;
  /** Título del modal */
  title?: string;
  /** Descripción del modal */
  description?: string;
  /** Contenido del modal */
  children: ReactNode;
  /** Contenido del footer (botones de acción) */
  footer?: ReactNode;
  /** Clases CSS adicionales para el contenido */
  className?: string;
  /** Tamaño del modal */
  size?: 'sm' | 'md' | 'lg';
  /** Indica si se debe mostrar el botón de cerrar */
  showCloseButton?: boolean;
  /** Indica si se debe prevenir el cierre al hacer clic fuera */
  preventCloseOnClickOutside?: boolean;
  /** Indica si se debe prevenir el cierre al presionar Escape */
  preventCloseOnEscape?: boolean;
  /** Función que se llama antes de cerrar el modal */
  onBeforeClose?: () => boolean | Promise<boolean>;
}

const sizeClasses = {
  sm: 'sm:max-w-[425px]',
  md: 'sm:max-w-[600px]',
  lg: 'sm:max-w-[800px]'
};

/**
 * Componente Modal personalizado que encapsula la lógica común del Dialog
 *
 * @example
 * ```tsx
 * // Modal básico
 * <Modal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Título del Modal"
 *   description="Descripción del modal"
 *   size="md"
 * >
 *   <p>Contenido del modal</p>
 *   <Modal.Footer>
 *     <Button onClick={() => setIsOpen(false)}>Cerrar</Button>
 *   </Modal.Footer>
 * </Modal>
 *
 * // Modal con prevención de cierre
 * <Modal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Confirmación requerida"
 *   preventCloseOnClickOutside
 *   preventCloseOnEscape
 *   onBeforeClose={async () => {
 *     return window.confirm("¿Estás seguro?");
 *   }}
 * >
 *   <p>Contenido importante que requiere confirmación</p>
 * </Modal>
 *
 * // Modal con formulario
 * <Modal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Editar Perfil"
 *   size="lg"
 * >
 *   <form onSubmit={handleSubmit}>
 *     <Input name="name" placeholder="Nombre" />
 *     <Input name="email" placeholder="Email" />
 *     <Modal.Footer>
 *       <Button type="submit">Guardar</Button>
 *     </Modal.Footer>
 *   </form>
 * </Modal>
 * ```
 */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  size = 'md',
  showCloseButton = true,
  preventCloseOnClickOutside = false,
  preventCloseOnEscape = false,
  onBeforeClose
}: ModalProps) {
  const handleOpenChange = async (newOpen: boolean) => {
    if (!newOpen && onBeforeClose) {
      const shouldClose = await onBeforeClose();
      if (!shouldClose) return;
    }

    if (!newOpen && (preventCloseOnClickOutside || preventCloseOnEscape)) {
      return;
    }

    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay
          className={combineClassNames(
            'data-[state=open]:animate-none data-[state=closed]:animate-none',
            'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
            'duration-200'
          )}
        />
        <DialogContent
          className={combineClassNames(
            sizeClasses[size],
            // Eliminar completamente las animaciones de movimiento
            'data-[state=open]:animate-none data-[state=closed]:animate-none',
            'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
            // Asegurar que no hay transformaciones
            'data-[state=open]:translate-x-0 data-[state=closed]:translate-x-0',
            'data-[state=open]:translate-y-0 data-[state=closed]:translate-y-0',
            'data-[state=open]:scale-100 data-[state=closed]:scale-100',
            // Duración rápida para la aparición
            'duration-150',
            className
          )}
          onPointerDownOutside={e => {
            if (preventCloseOnClickOutside) {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={e => {
            if (preventCloseOnEscape) {
              e.preventDefault();
            }
          }}
        >
          {(title || description) && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && <DialogDescription>{description}</DialogDescription>}
              {showCloseButton && (
                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute right-4 top-4'
                  onClick={() => onOpenChange(false)}
                >
                  <XIcon className='h-4 w-4' />
                  <span className='sr-only'>Cerrar</span>
                </Button>
              )}
            </DialogHeader>
          )}
          {children}
          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

/**
 * Componente Footer para el Modal
 */
Modal.Footer = function ModalFooter({ children }: { children: ReactNode }) {
  return <DialogFooter>{children}</DialogFooter>;
};

/**
 * Componente Header para el Modal
 */
Modal.Header = function ModalHeader({
  title,
  description,
  onClose
}: {
  title?: string;
  description?: string;
  onClose?: () => void;
}) {
  return (
    <DialogHeader>
      {title && <DialogTitle>{title}</DialogTitle>}
      {description && <DialogDescription>{description}</DialogDescription>}
      {onClose && (
        <Button variant='ghost' size='icon' className='absolute right-4 top-4' onClick={onClose}>
          <XIcon className='h-4 w-4' />
          <span className='sr-only'>Cerrar</span>
        </Button>
      )}
    </DialogHeader>
  );
};
