import * as React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { XIcon } from 'lucide-react';

import { combineClassNames } from '@utils';

/**
 * Componente Dialog base (wrapper de Radix UI Dialog)
 * 
 * @example
 * ```tsx
 * <Dialog open={isOpen} onOpenChange={setIsOpen}>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Confirmar acción</DialogTitle>
 *       <DialogDescription>
 *         ¿Estás seguro de que quieres continuar?
 *       </DialogDescription>
 *     </DialogHeader>
 *     <DialogFooter>
 *       <Button variant="outline" onClick={() => setIsOpen(false)}>
 *         Cancelar
 *       </Button>
 *       <Button onClick={handleConfirm}>
 *         Confirmar
 *       </Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot='dialog' {...props} />;
}

/**
 * Trigger para abrir el dialog
 * 
 * @example
 * ```tsx
 * <DialogTrigger asChild>
 *   <Button>Abrir Dialog</Button>
 * </DialogTrigger>
 * ```
 */
function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />;
}

/**
 * Portal para renderizar el dialog fuera del flujo normal del DOM
 */
function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />;
}

/**
 * Botón para cerrar el dialog
 * 
 * @example
 * ```tsx
 * <DialogClose asChild>
 *   <Button variant="ghost" size="sm">Cerrar</Button>
 * </DialogClose>
 * ```
 */
function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot='dialog-close' {...props} />;
}

/**
 * Overlay del dialog (fondo oscuro)
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot='dialog-overlay'
      className={combineClassNames(
        `data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50`,
        className
      )}
      {...props}
    />
  );
}

/**
 * Contenido principal del dialog
 * 
 * @example
 * ```tsx
 * <DialogContent className="max-w-md">
 *   <DialogHeader>
 *     <DialogTitle>Título</DialogTitle>
 *     <DialogDescription>Descripción</DialogDescription>
 *   </DialogHeader>
 *   <p>Contenido del dialog</p>
 *   <DialogFooter>
 *     <Button>Acción</Button>
 *   </DialogFooter>
 * </DialogContent>
 * ```
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot='dialog-portal'>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot='dialog-content'
        className={combineClassNames(
          `bg-background data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed top-[50%] left-[50%] z-50 grid
          w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6
          shadow-lg duration-200 sm:max-w-lg`,
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot='dialog-close'
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent
              data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70
              transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden
              disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0
              [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className='sr-only'>Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/**
 * Header del dialog (título y descripción)
 * 
 * @example
 * ```tsx
 * <DialogHeader>
 *   <DialogTitle>Título del dialog</DialogTitle>
 *   <DialogDescription>Descripción detallada</DialogDescription>
 * </DialogHeader>
 * ```
 */
function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='dialog-header'
      className={combineClassNames('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

/**
 * Footer del dialog (botones de acción)
 * 
 * @example
 * ```tsx
 * <DialogFooter>
 *   <Button variant="outline">Cancelar</Button>
 *   <Button>Confirmar</Button>
 * </DialogFooter>
 * ```
 */
function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='dialog-footer'
      className={combineClassNames(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  );
}

/**
 * Título del dialog
 * 
 * @example
 * ```tsx
 * <DialogTitle>Confirmar eliminación</DialogTitle>
 * ```
 */
function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot='dialog-title'
      className={combineClassNames('text-lg leading-none font-semibold', className)}
      {...props}
    />
  );
}

/**
 * Descripción del dialog
 * 
 * @example
 * ```tsx
 * <DialogDescription>
 *   Esta acción no se puede deshacer. ¿Estás seguro?
 * </DialogDescription>
 * ```
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot='dialog-description'
      className={combineClassNames('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger
};

