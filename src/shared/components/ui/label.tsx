import * as React from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';

import { combineClassNames } from '@utils';

/**
 * Componente Label para etiquetas de formularios
 * 
 * @example
 * ```tsx
 * // Label básico
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" />
 * 
 * // Label con contenido personalizado
 * <Label htmlFor="password">
 *   Contraseña
 *   <span className="text-red-500">*</span>
 * </Label>
 * <Input id="password" type="password" />
 * 
 * // Label con icono
 * <Label htmlFor="username">
 *   <User className="w-4 h-4" />
 *   Nombre de usuario
 * </Label>
 * <Input id="username" />
 * 
 * // Label en grupo de controles
 * <div className="space-y-2">
 *   <Label htmlFor="firstName">Nombre</Label>
 *   <Input id="firstName" />
 *   
 *   <Label htmlFor="lastName">Apellido</Label>
 *   <Input id="lastName" />
 * </div>
 * ```
 */
function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot='label'
      className={combineClassNames(
        `flex items-center gap-2 text-sm leading-none font-medium select-none
        group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50
        peer-disabled:cursor-not-allowed peer-disabled:opacity-50`,
        className
      )}
      {...props}
    />
  );
}

export { Label };

