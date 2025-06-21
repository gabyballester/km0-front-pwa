import * as React from 'react';

import * as PopoverPrimitive from '@radix-ui/react-popover';

import { combineClassNames } from '@utils';

/**
 * Componente Popover base (wrapper de Radix UI Popover)
 * 
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline">Abrir Popover</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <div className="space-y-2">
 *       <h4 className="font-medium">Información</h4>
 *       <p className="text-sm text-muted-foreground">
 *         Contenido del popover
 *       </p>
 *     </div>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot='popover' {...props} />;
}

/**
 * Trigger para abrir el popover
 * 
 * @example
 * ```tsx
 * <PopoverTrigger asChild>
 *   <Button>Abrir</Button>
 * </PopoverTrigger>
 * ```
 */
function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />;
}

/**
 * Contenido del popover
 * 
 * @example
 * ```tsx
 * <PopoverContent className="w-80">
 *   <div className="space-y-2">
 *     <h4 className="font-medium">Título</h4>
 *     <p className="text-sm text-muted-foreground">
 *       Descripción detallada
 *     </p>
 *     <div className="flex gap-2">
 *       <Button size="sm">Acción 1</Button>
 *       <Button size="sm" variant="outline">Acción 2</Button>
 *     </div>
 *   </div>
 * </PopoverContent>
 * ```
 */
function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot='popover-content'
        align={align}
        sideOffset={sideOffset}
        className={combineClassNames(
          `bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
          data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2
          data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
          data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin)
          rounded-md border p-4 shadow-md outline-hidden`,
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

/**
 * Anchor del popover para posicionamiento personalizado
 */
function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot='popover-anchor' {...props} />;
}

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };

