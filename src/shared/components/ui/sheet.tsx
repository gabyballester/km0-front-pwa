import * as React from 'react';

import * as SheetPrimitive from '@radix-ui/react-dialog';

import { XIcon } from 'lucide-react';

import { combineClassNames } from '@utils';

/**
 * Componente Sheet base (wrapper de Radix UI Dialog)
 * 
 * @example
 * ```tsx
 * <Sheet>
 *   <SheetTrigger>Open Sheet</SheetTrigger>
 *   <SheetContent>
 *     <SheetHeader>
 *       <SheetTitle>Title</SheetTitle>
 *       <SheetDescription>Description</SheetDescription>
 *     </SheetHeader>
 *     Content here
 *   </SheetContent>
 * </Sheet>
 * ```
 */
function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot='sheet' {...props} />;
}

/**
 * Trigger para abrir el sheet
 * 
 * @example
 * ```tsx
 * <SheetTrigger asChild>
 *   <Button>Open Sheet</Button>
 * </SheetTrigger>
 * ```
 */
function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />;
}

/**
 * Botón para cerrar el sheet
 * 
 * @example
 * ```tsx
 * <SheetClose asChild>
 *   <Button variant="ghost">Close</Button>
 * </SheetClose>
 * ```
 */
function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot='sheet-close' {...props} />;
}

/**
 * Portal para renderizar el sheet
 */
function SheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot='sheet-portal' {...props} />;
}

/**
 * Overlay del sheet (fondo oscuro)
 * 
 * @example
 * ```tsx
 * <SheetOverlay className="bg-black/80" />
 * ```
 */
function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot='sheet-overlay'
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
 * Contenido principal del sheet
 * 
 * @example
 * ```tsx
 * // Sheet desde la derecha (por defecto)
 * <SheetContent>
 *   <SheetHeader>
 *     <SheetTitle>Configuración</SheetTitle>
 *     <SheetDescription>Gestiona tus preferencias</SheetDescription>
 *   </SheetHeader>
 *   <div className="p-4">
 *     Contenido del sheet
 *   </div>
 * </SheetContent>
 * 
 * // Sheet desde la izquierda
 * <SheetContent side="left">
 *   <SheetHeader>
 *     <SheetTitle>Navegación</SheetTitle>
 *   </SheetHeader>
 *   <nav className="p-4">
 *     <ul>
 *       <li>Inicio</li>
 *       <li>Perfil</li>
 *     </ul>
 *   </nav>
 * </SheetContent>
 * 
 * // Sheet desde abajo
 * <SheetContent side="bottom">
 *   <SheetHeader>
 *     <SheetTitle>Acciones</SheetTitle>
 *   </SheetHeader>
 *   <SheetFooter>
 *     <Button>Guardar</Button>
 *   </SheetFooter>
 * </SheetContent>
 * ```
 */
function SheetContent({
  className,
  children,
  side = 'right',
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot='sheet-content'
        className={combineClassNames(
          `bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col
          gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300
          data-[state=open]:duration-500`,
          side === 'right' &&
            `data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0
            h-full w-3/4 border-l sm:max-w-sm`,
          side === 'left' &&
            `data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full
            w-3/4 border-r sm:max-w-sm`,
          side === 'top' &&
            `data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto
            border-b`,
          side === 'bottom' &&
            `data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0
            h-auto border-t`,
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          className='ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4
            rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2
            focus:outline-hidden disabled:pointer-events-none'
        >
          <XIcon className='size-4' />
          <span className='sr-only'>Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

/**
 * Header del sheet
 * 
 * @example
 * ```tsx
 * <SheetHeader>
 *   <SheetTitle>Configuración</SheetTitle>
 *   <SheetDescription>Gestiona tus preferencias</SheetDescription>
 * </SheetHeader>
 * ```
 */
function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sheet-header'
      className={combineClassNames('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  );
}

/**
 * Footer del sheet
 * 
 * @example
 * ```tsx
 * <SheetFooter>
 *   <Button variant="outline">Cancelar</Button>
 *   <Button>Guardar</Button>
 * </SheetFooter>
 * ```
 */
function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='sheet-footer'
      className={combineClassNames('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

/**
 * Título del sheet
 * 
 * @example
 * ```tsx
 * <SheetTitle>Configuración de la cuenta</SheetTitle>
 * ```
 */
function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot='sheet-title'
      className={combineClassNames('text-foreground font-semibold', className)}
      {...props}
    />
  );
}

/**
 * Descripción del sheet
 * 
 * @example
 * ```tsx
 * <SheetDescription>
 *   Gestiona tus preferencias y configuración personal
 * </SheetDescription>
 * ```
 */
function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot='sheet-description'
      className={combineClassNames('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
};

