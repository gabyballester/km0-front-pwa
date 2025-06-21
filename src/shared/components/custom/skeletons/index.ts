/**
 * Barrel export para componentes skeleton
 * 
 * Este archivo exporta todos los componentes skeleton utilizados para mostrar
 * placeholders mientras se carga el contenido de la aplicación.
 * 
 * @example
 * ```tsx
 * // Importar todos los skeletons
 * import { CardSkeleton, ListSkeleton, MapSkeleton, PageSkeleton } from '@components';
 * 
 * // Uso en componentes de carga
 * function LoadingPage() {
 *   return (
 *     <div>
 *       <PageSkeleton />
 *       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 *         <CardSkeleton />
 *         <CardSkeleton />
 *       </div>
 *       <ListSkeleton />
 *       <MapSkeleton />
 *     </div>
 *   );
 * }
 * 
 * // Uso en listas
 * function CardList() {
 *   const [loading, setLoading] = useState(true);
 * 
 *   if (loading) {
 *     return (
 *       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 *         {Array.from({ length: 6 }).map((_, i) => (
 *           <CardSkeleton key={i} />
 *         ))}
 *       </div>
 *     );
 *   }
 * 
 *   return <ActualCardList />;
 * }
 * ```
 */

export * from './CardSkeleton';
export * from './ListSkeleton';
export * from './MapSkeleton';
export * from './PageSkeleton';

