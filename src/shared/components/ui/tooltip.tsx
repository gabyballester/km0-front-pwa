import * as React from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { combineClassNames } from '@utils';

/**
 * Provider del tooltip (necesario para el contexto)
 * 
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>Tooltip content</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot='tooltip-provider'
      delayDuration={delayDuration}
      {...props}
    />
  );
}

/**
 * Componente Tooltip base (wrapper de Radix UI Tooltip)
 * 
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>Hover me</TooltipTrigger>
 *   <TooltipContent>Información adicional</TooltipContent>
 * </Tooltip>
 * ```
 */
function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot='tooltip' {...props} />
    </TooltipProvider>
  );
}

/**
 * Trigger del tooltip (elemento que activa el tooltip)
 * 
 * @example
 * ```tsx
 * // Trigger básico
 * <TooltipTrigger>Hover me</TooltipTrigger>
 * 
 * // Trigger con componente personalizado
 * <TooltipTrigger asChild>
 *   <Button>Botón con tooltip</Button>
 * </TooltipTrigger>
 * 
 * // Trigger con icono
 * <TooltipTrigger asChild>
 *   <InfoIcon className="w-4 h-4" />
 * </TooltipTrigger>
 * ```
 */
function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />;
}

/**
 * Contenido del tooltip
 * 
 * @example
 * ```tsx
 * // Tooltip básico
 * <TooltipContent>
 *   Información adicional sobre este elemento
 * </TooltipContent>
 * 
 * // Tooltip con offset personalizado
 * <TooltipContent sideOffset={10}>
 *   Tooltip con espacio adicional
 * </TooltipContent>
 * 
 * // Tooltip con estilos personalizados
 * <TooltipContent className="bg-blue-500 text-white">
 *   Tooltip con colores personalizados
 * </TooltipContent>
 * ```
 */
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        className={combineClassNames(
          `bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
          data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
          data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit
          origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance`,
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className='bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]' />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };

