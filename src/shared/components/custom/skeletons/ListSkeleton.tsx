/**
 * Props para el componente ListSkeleton
 */
interface ListSkeletonProps {
  /** Número de elementos de la lista a mostrar */
  items?: number;
  /** Mostrar o no el avatar de cada elemento */
  showAvatar?: boolean;
  /** Mostrar o no el texto secundario de cada elemento */
  showSecondaryText?: boolean;
  /** Mostrar o no las acciones de cada elemento */
  showActions?: boolean;
}

/**
 * Componente ListSkeleton para mostrar un placeholder de lista mientras se carga el contenido
 * 
 * Este componente simula la estructura de una lista con avatares, texto principal,
 * texto secundario y acciones opcionales.
 * 
 * @example
 * ```tsx
 * // Skeleton básico
 * <ListSkeleton />
 * 
 * // Skeleton con más elementos
 * <ListSkeleton items={10} />
 * 
 * // Skeleton sin avatar
 * <ListSkeleton showAvatar={false} />
 * 
 * // Skeleton con acciones
 * <ListSkeleton showActions={true} />
 * 
 * // Skeleton personalizado
 * <ListSkeleton 
 *   items={8}
 *   showAvatar={true}
 *   showSecondaryText={false}
 *   showActions={true}
 * />
 * 
 * // En una lista de usuarios
 * function UserList() {
 *   const [loading, setLoading] = useState(true);
 *   const [users, setUsers] = useState([]);
 * 
 *   if (loading) {
 *     return (
 *       <div className="space-y-4">
 *         <h2 className="text-xl font-semibold">Usuarios</h2>
 *         <ListSkeleton items={6} showActions={true} />
 *       </div>
 *     );
 *   }
 * 
 *   return (
 *     <div className="space-y-4">
 *       <h2 className="text-xl font-semibold">Usuarios</h2>
 *       {users.map(user => (
 *         <UserItem key={user.id} user={user} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function ListSkeleton({
  items = 5,
  showAvatar = true,
  showSecondaryText = true,
  showActions = false
}: ListSkeletonProps) {
  return (
    <div className='space-y-3'>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className='flex items-center space-x-3 p-3 animate-pulse'>
          {showAvatar && <div className='w-10 h-10 bg-gray-200 rounded-full flex-shrink-0' />}

          <div className='flex-1 space-y-2'>
            <div className='h-4 bg-gray-200 rounded w-3/4' />
            {showSecondaryText && <div className='h-3 bg-gray-200 rounded w-1/2' />}
          </div>

          {showActions && (
            <div className='flex space-x-2'>
              <div className='w-8 h-8 bg-gray-200 rounded' />
              <div className='w-8 h-8 bg-gray-200 rounded' />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
