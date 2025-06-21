import { cva, type VariantProps } from 'class-variance-authority';

import { combineClassNames } from '@utils';

export const loaderVariants = cva(
  'flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'text-primary',
        verifying: 'text-blue-600',
        initializing: 'text-green-600',
        error: 'text-red-600'
      },
      size: {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12'
      },
      fullScreen: {
        true: 'fixed inset-0 z-50 bg-background',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullScreen: false
    }
  }
);

interface LoaderProps extends VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Componente Loader para mostrar estados de carga
 * 
 * @example
 * ```tsx
 * // Loader básico
 * <Loader />
 * 
 * // Loader con diferentes tamaños
 * <Loader size="sm" />
 * <Loader size="lg" />
 * <Loader size="xl" />
 * 
 * // Loader con variantes
 * <Loader variant="verifying" />
 * <Loader variant="initializing" />
 * <Loader variant="error" />
 * 
 * // Loader fullscreen
 * <Loader fullScreen variant="initializing" />
 * 
 * // Loader con contenido adicional
 * <Loader>
 *   <span className="ml-2">Cargando...</span>
 * </Loader>
 * 
 * // Loader en botón
 * <Button disabled={isLoading}>
 *   {isLoading && <Loader size="sm" />}
 *   Guardar
 * </Button>
 * 
 * // Loader con texto personalizado
 * <Loader variant="verifying" size="lg">
 *   <div className="ml-3 text-center">
 *     <p className="text-sm font-medium">Verificando...</p>
 *     <p className="text-xs text-muted-foreground">Por favor espera</p>
 *   </div>
 * </Loader>
 * ```
 */
export function Loader({ 
  variant, 
  size, 
  fullScreen, 
  className,
  children 
}: LoaderProps) {
  return (
    <div className={combineClassNames(loaderVariants({ variant, size, fullScreen }), className)}>
      <div className={`animate-spin rounded-full border-2 border-current border-t-transparent ${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-6 w-6' : size === 'lg' ? 'h-8 w-8' : 'h-12 w-12'}`} />
      {children}
    </div>
  );
} 