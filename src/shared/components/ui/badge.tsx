import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { combineClassNames } from '@utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline:
          'text-foreground border-border bg-background hover:bg-accent hover:text-accent-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Componente Badge para mostrar etiquetas, estados o categorías
 *
 * @example
 * ```tsx
 * // Badge básico
 * <Badge>Nuevo</Badge>
 *
 * // Badge con variantes
 * <Badge variant="secondary">En progreso</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="outline">Borrador</Badge>
 *
 * // Badge con icono
 * <Badge>
 *   <CheckCircle className="w-3 h-3 mr-1" />
 *   Completado
 * </Badge>
 *
 * // Badge con contenido personalizado
 * <Badge className="bg-blue-500 text-white">
 *   <span className="font-bold">PRO</span>
 * </Badge>
 *
 * // Badge para estados
 * <Badge variant={status === 'active' ? 'default' : 'secondary'}>
 *   {status === 'active' ? 'Activo' : 'Inactivo'}
 * </Badge>
 * ```
 */
function BadgeComponent({ className, variant, ...props }: BadgeProps) {
  return <div className={combineClassNames(badgeVariants({ variant }), className)} {...props} />;
}

export { BadgeComponent, badgeVariants };
