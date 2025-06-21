import * as React from 'react';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { combineClassNames } from '@utils';

/**
 * Componente Avatar para mostrar imágenes de perfil de usuario
 * 
 * @example
 * ```tsx
 * // Avatar básico con imagen
 * <Avatar>
 *   <AvatarImage src="/path/to/image.jpg" alt="Usuario" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * 
 * // Avatar con fallback (iniciales)
 * <Avatar>
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * 
 * // Avatar con imagen y fallback personalizado
 * <Avatar>
 *   <AvatarImage src="/path/to/image.jpg" alt="Usuario" />
 *   <AvatarFallback>
 *     <User className="w-4 h-4" />
 *   </AvatarFallback>
 * </Avatar>
 * 
 * // Avatar con tamaño personalizado
 * <Avatar className="w-12 h-12">
 *   <AvatarImage src="/path/to/image.jpg" alt="Usuario" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot='avatar'
      className={combineClassNames(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  );
}

/**
 * Imagen del avatar
 * 
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/path/to/image.jpg" alt="Usuario" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot='avatar-image'
      className={combineClassNames('aspect-square size-full', className)}
      {...props}
    />
  );
}

/**
 * Fallback del avatar (se muestra cuando la imagen no carga)
 * 
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/path/to/image.jpg" alt="Usuario" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * 
 * // Con icono
 * <AvatarFallback>
 *   <User className="w-4 h-4" />
 * </AvatarFallback>
 * ```
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot='avatar-fallback'
      className={combineClassNames(
        'bg-muted flex size-full items-center justify-center rounded-full',
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };

