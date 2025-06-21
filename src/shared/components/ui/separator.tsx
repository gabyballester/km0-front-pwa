import * as React from 'react';

import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { combineClassNames } from '@utils';

/**
 * Componente Separator para crear líneas divisorias
 * 
 * @example
 * ```tsx
 * // Separador horizontal básico
 * <Separator />
 * 
 * // Separador con margen
 * <Separator className="my-4" />
 * 
 * // Separador vertical
 * <div className="flex items-center gap-2">
 *   <span>Texto</span>
 *   <Separator orientation="vertical" />
 *   <span>Más texto</span>
 * </div>
 * 
 * // Separador decorativo con color personalizado
 * <Separator className="bg-blue-500" />
 * 
 * // Separador no decorativo (para lectores de pantalla)
 * <Separator decorative={false} aria-label="Separador de sección" />
 * ```
 */
function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot='separator-root'
      decorative={decorative}
      orientation={orientation}
      className={combineClassNames(
        `bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full
        data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px`,
        className
      )}
      {...props}
    />
  );
}

export { Separator };

