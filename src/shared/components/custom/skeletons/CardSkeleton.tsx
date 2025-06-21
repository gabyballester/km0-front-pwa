/**
 * Props para el componente CardSkeleton
 */
interface CardSkeletonProps {
  /** Mostrar o no la imagen del skeleton */
  showImage?: boolean;
  /** Mostrar o no el header del skeleton */
  showHeader?: boolean;
  /** Mostrar o no el contenido del skeleton */
  showContent?: boolean;
  /** Número de líneas de contenido a mostrar */
  contentLines?: number;
}

/**
 * Componente CardSkeleton para mostrar un placeholder de tarjeta mientras se carga el contenido
 * 
 * Este componente simula la estructura de una tarjeta con imagen, header y contenido,
 * proporcionando una experiencia de carga más fluida para el usuario.
 * 
 * @example
 * ```tsx
 * // Skeleton básico
 * <CardSkeleton />
 * 
 * // Skeleton sin imagen
 * <CardSkeleton showImage={false} />
 * 
 * // Skeleton con más líneas de contenido
 * <CardSkeleton contentLines={4} />
 * 
 * // Skeleton solo con header
 * <CardSkeleton showImage={false} showContent={false} />
 * 
 * // Skeleton personalizado
 * <CardSkeleton 
 *   showImage={true}
 *   showHeader={true}
 *   showContent={true}
 *   contentLines={3}
 * />
 * 
 * // En una lista de tarjetas
 * function CardList() {
 *   const [loading, setLoading] = useState(true);
 *   const [cards, setCards] = useState([]);
 * 
 *   if (loading) {
 *     return (
 *       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 *         {Array.from({ length: 6 }).map((_, i) => (
 *           <CardSkeleton key={i} />
 *         ))}
 *       </div>
 *     );
 *   }
 * 
 *   return (
 *     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 *       {cards.map(card => (
 *         <Card key={card.id} {...card} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function CardSkeleton({
  showImage = true,
  showHeader = true,
  showContent = true,
  contentLines = 2
}: CardSkeletonProps) {
  return (
    <div className='border rounded-lg p-4 space-y-3 animate-pulse'>
      {showImage && <div className='h-48 bg-gray-200 rounded-md' />}

      {showHeader && (
        <div className='space-y-2'>
          <div className='h-6 bg-gray-200 rounded w-3/4' />
          <div className='h-4 bg-gray-200 rounded w-1/2' />
        </div>
      )}

      {showContent && (
        <div className='space-y-2'>
          {Array.from({ length: contentLines }).map((_, i) => (
            <div key={i} className='h-4 bg-gray-200 rounded' />
          ))}
          <div className='h-4 bg-gray-200 rounded w-2/3' />
        </div>
      )}
    </div>
  );
}
