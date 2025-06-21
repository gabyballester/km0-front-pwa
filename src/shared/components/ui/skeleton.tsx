import { combineClassNames } from '@utils';

/**
 * Componente Skeleton para mostrar placeholders durante la carga
 * 
 * @example
 * ```tsx
 * // Skeleton básico
 * <Skeleton className="h-4 w-full" />
 * 
 * // Skeleton para texto
 * <div className="space-y-2">
 *   <Skeleton className="h-4 w-[250px]" />
 *   <Skeleton className="h-4 w-[200px]" />
 * </div>
 * 
 * // Skeleton para avatar
 * <Skeleton className="h-12 w-12 rounded-full" />
 * 
 * // Skeleton para card
 * <div className="space-y-3">
 *   <Skeleton className="h-4 w-3/4" />
 *   <Skeleton className="h-4 w-1/2" />
 *   <Skeleton className="h-4 w-2/3" />
 * </div>
 * 
 * // Skeleton para lista
 * {Array.from({ length: 5 }).map((_, i) => (
 *   <div key={i} className="flex items-center space-x-4">
 *     <Skeleton className="h-12 w-12 rounded-full" />
 *     <div className="space-y-2">
 *       <Skeleton className="h-4 w-[250px]" />
 *       <Skeleton className="h-4 w-[200px]" />
 *     </div>
 *   </div>
 * ))}
 * 
 * // Skeleton para formulario
 * <div className="space-y-4">
 *   <div>
 *     <Skeleton className="h-4 w-20 mb-2" />
 *     <Skeleton className="h-10 w-full" />
 *   </div>
 *   <div>
 *     <Skeleton className="h-4 w-24 mb-2" />
 *     <Skeleton className="h-10 w-full" />
 *   </div>
 * </div>
 * ```
 */
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={combineClassNames('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };

