import * as React from 'react';

import { X } from 'lucide-react';

import { combineClassNames } from '@utils';

import { Button } from './button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogTitle
} from './dialog';

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
  children: React.ReactNode;
  /** Contenido del footer (botones de acción) */
  footer?: React.ReactNode;
  /** Contenido del header (encabezado) */
  header?: React.ReactNode;
  /** Contenido del botón de cerrar */
  closeButton?: React.ReactNode;
  /** Indica si se debe mostrar el botón de cerrar */
  showCloseButton?: boolean;
  /** Indica si el modal está en modo bare (solo backdrop y children) */
  bare?: boolean;
  /** Tamaño del modal */
  size?: 'sm' | 'md' | 'lg';
  /** Clases CSS adicionales para el contenido */
  className?: string;
  /** Indica si se debe prevenir el cierre al hacer clic fuera */
  preventCloseOnClickOutside?: boolean;
  /** Indica si se debe prevenir el cierre al presionar Escape */
  preventCloseOnEscape?: boolean;
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
  header,
  closeButton,
  showCloseButton = true,
  bare = false,
  size = 'md',
  className,
  preventCloseOnClickOutside = false,
  preventCloseOnEscape = false
}: ModalProps) {
  // Función para manejar el cierre
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Si se está cerrando, verificar si está permitido
      if (preventCloseOnClickOutside || preventCloseOnEscape) {
        // En este caso, no permitimos el cierre automático
        return;
      }
    }
    onOpenChange(newOpen);
  };

  // Si bare, solo backdrop y children
  if (bare) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogPortal>
          <DialogOverlay className='z-50 fixed inset-0 bg-black/60' />
          <div className='fixed inset-0 z-50 flex items-center justify-center'>{children}</div>
        </DialogPortal>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className='z-50 fixed inset-0 bg-black/60' />
        <DialogContent
          className={combineClassNames(
            sizeClasses[size],
            'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)]',
            'translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg',
            'bg-background duration-150',
            className
          )}
          showCloseButton={false} // Controlamos manualmente la X
        >
          {/* DialogTitle es requerido para accesibilidad */}
          <DialogTitle className={title ? 'text-lg leading-none font-semibold' : 'sr-only'}>
            {title || 'Modal'}
          </DialogTitle>

          {/* DialogDescription es requerido para accesibilidad */}
          {description ? (
            <DialogDescription className='text-muted-foreground text-sm'>
              {description}
            </DialogDescription>
          ) : (
            <DialogDescription className='sr-only'>Contenido del modal</DialogDescription>
          )}

          {/* Header custom o estándar */}
          {header && <div className='flex flex-col gap-2 text-center sm:text-left'>{header}</div>}

          {/* Botón de cerrar custom o estándar */}
          {closeButton
            ? closeButton
            : showCloseButton && (
                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute right-4 top-4'
                  onClick={() => onOpenChange(false)}
                >
                  <X className='h-4 w-4' />
                  <span className='sr-only'>Cerrar</span>
                </Button>
              )}

          {/* Contenido */}
          {children}

          {/* Footer custom o estándar */}
          {footer && (
            <div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>{footer}</div>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

// Componentes de utilidad para el Modal
Modal.Header = function ModalHeader({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={combineClassNames('flex flex-col gap-2 text-center sm:text-left', className)}>
      {children}
    </div>
  );
};

Modal.Footer = function ModalFooter({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={combineClassNames(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
    >
      {children}
    </div>
  );
};

Modal.Title = function ModalTitle({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogTitle className={combineClassNames('text-lg leading-none font-semibold', className)}>
      {children}
    </DialogTitle>
  );
};

Modal.Description = function ModalDescription({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogDescription className={combineClassNames('text-muted-foreground text-sm', className)}>
      {children}
    </DialogDescription>
  );
};
