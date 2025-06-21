import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { combineClassNames } from '@utils';

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

/**
 * Componente Alert para mostrar mensajes informativos, de advertencia o error
 * 
 * @example
 * ```tsx
 * // Alert básico
 * <Alert>
 *   <AlertTitle>Información importante</AlertTitle>
 *   <AlertDescription>
 *     Este es un mensaje informativo para el usuario.
 *   </AlertDescription>
 * </Alert>
 * 
 * // Alert con icono y variante destructiva
 * <Alert variant="destructive">
 *   <AlertCircle className="w-4 h-4" />
 *   <AlertTitle>Error crítico</AlertTitle>
 *   <AlertDescription>
 *     Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
 *   </AlertDescription>
 * </Alert>
 * 
 * // Alert con contenido personalizado
 * <Alert>
 *   <CheckCircle className="w-4 h-4 text-green-500" />
 *   <AlertTitle>Operación exitosa</AlertTitle>
 *   <AlertDescription>
 *     Los cambios se han guardado correctamente.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot='alert'
      role='alert'
      className={combineClassNames(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

/**
 * Título del componente Alert
 * 
 * @example
 * ```tsx
 * <Alert>
 *   <AlertTitle>Este es el título</AlertTitle>
 *   <AlertDescription>Y esta es la descripción</AlertDescription>
 * </Alert>
 * ```
 */
function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-title'
      className={combineClassNames(
        'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
        className
      )}
      {...props}
    />
  );
}

/**
 * Descripción del componente Alert
 * 
 * @example
 * ```tsx
 * <Alert>
 *   <AlertTitle>Título del alert</AlertTitle>
 *   <AlertDescription>
 *     Esta es la descripción detallada del mensaje.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-description'
      className={combineClassNames(
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };

