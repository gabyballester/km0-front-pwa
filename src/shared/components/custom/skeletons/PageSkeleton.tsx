/**
 * Props para el componente PageSkeleton
 */
interface PageSkeletonProps {
  /** Mostrar o no el header de la página */
  showHeader?: boolean;
  /** Mostrar o no la barra lateral */
  showSidebar?: boolean;
  /** Número de filas de contenido a mostrar */
  contentRows?: number;
}

/**
 * Componente PageSkeleton para mostrar un placeholder de página completa mientras se carga
 * 
 * Este componente simula la estructura de una página completa con header opcional,
 * barra lateral opcional y contenido principal, proporcionando una experiencia
 * de carga coherente para páginas completas.
 * 
 * @example
 * ```tsx
 * // Skeleton básico
 * <PageSkeleton />
 * 
 * // Skeleton sin header
 * <PageSkeleton showHeader={false} />
 * 
 * // Skeleton con sidebar
 * <PageSkeleton showSidebar={true} />
 * 
 * // Skeleton con más contenido
 * <PageSkeleton contentRows={5} />
 * 
 * // Skeleton personalizado
 * <PageSkeleton 
 *   showHeader={true}
 *   showSidebar={true}
 *   contentRows={4}
 * />
 * 
 * // En una página de dashboard
 * function DashboardPage() {
 *   const [loading, setLoading] = useState(true);
 *   const [data, setData] = useState(null);
 * 
 *   if (loading) {
 *     return (
 *       <div className="min-h-screen bg-gray-50">
 *         <PageSkeleton showSidebar={true} contentRows={6} />
 *       </div>
 *     );
 *   }
 * 
 *   return (
 *     <div className="min-h-screen bg-gray-50">
 *       <DashboardLayout data={data} />
 *     </div>
 *   );
 * }
 * 
 * // En una página de blog
 * function BlogPage() {
 *   const [loading, setLoading] = useState(true);
 * 
 *   return (
 *     <div className="container mx-auto">
 *       {loading ? (
 *         <PageSkeleton showHeader={true} contentRows={8} />
 *       ) : (
 *         <BlogContent />
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function PageSkeleton({
  showHeader = true,
  showSidebar = false,
  contentRows = 3
}: PageSkeletonProps) {
  return (
    <div className='animate-pulse space-y-4 p-4'>
      {showHeader && <div className='h-8 bg-gray-200 rounded-md w-1/3' />}

      <div className={`flex gap-4 ${showSidebar ? 'grid-cols-4' : ''}`}>
        {showSidebar && (
          <div className='w-1/4 space-y-2'>
            <div className='h-4 bg-gray-200 rounded' />
            <div className='h-4 bg-gray-200 rounded' />
            <div className='h-4 bg-gray-200 rounded w-3/4' />
          </div>
        )}

        <div className='flex-1 space-y-3'>
          {Array.from({ length: contentRows }).map((_, i) => (
            <div key={i} className='space-y-2'>
              <div className='h-4 bg-gray-200 rounded' />
              <div className='h-4 bg-gray-200 rounded w-5/6' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
