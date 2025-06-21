import type { ReactNode } from 'react';

import { Loader } from '@components';

import { usePageLoading } from '@hooks';

interface ContentLoaderProps {
  /** Estado de carga actual */
  isLoading: boolean;
  /** Componente skeleton a mostrar (prioridad alta) */
  skeleton?: ReactNode;
  /** Contenido a mostrar cuando no está cargando */
  children: ReactNode;
  /** Opciones para el hook usePageLoading */
  loadingOptions?: {
    /** Delay en ms antes de mostrar el loading */
    delay?: number;
    /** Tiempo mínimo en ms que debe mostrarse el loading */
    minLoadingTime?: number;
  };
  /** Qué mostrar si no hay skeleton disponible */
  fallbackVariant?: 'skeleton' | 'loader' | 'none';
  /** Tamaño del loader si se usa */
  loaderSize?: 'sm' | 'md' | 'lg';
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * Componente para cargar contenido con estrategia skeleton-first
 * 
 * Implementa una estrategia de carga inteligente que prioriza skeletons
 * sobre loaders para una mejor experiencia de usuario.
 * 
 * **Estrategia de prioridad:**
 * 1. Si hay skeleton disponible → mostrar skeleton
 * 2. Si no hay skeleton y fallbackVariant es 'loader' → mostrar loader
 * 3. Si fallbackVariant es 'none' → no mostrar nada
 * 
 * @example
 * ```tsx
 * // Uso básico con skeleton
 * function UserProfile() {
 *   const { data: user, isLoading } = useQuery('user', fetchUser);
 * 
 *   return (
 *     <ContentLoader
 *       isLoading={isLoading}
 *       skeleton={<UserProfileSkeleton />}
 *     >
 *       <UserProfileContent user={user} />
 *     </ContentLoader>
 *   );
 * }
 * 
 * // Uso con loader como fallback
 * function SimpleList() {
 *   const { data: items, isLoading } = useQuery('items', fetchItems);
 * 
 *   return (
 *     <ContentLoader
 *       isLoading={isLoading}
 *       fallbackVariant="loader"
 *       loaderSize="lg"
 *     >
 *       <ItemList items={items} />
 *     </ContentLoader>
   );
 * }
 * 
 * // Uso con opciones de loading personalizadas
 * function Dashboard() {
 *   const { data: stats, isLoading } = useQuery('stats', fetchStats);
 * 
 *   return (
 *     <ContentLoader
 *       isLoading={isLoading}
 *       skeleton={<DashboardSkeleton />}
 *       loadingOptions={{
 *         delay: 300,        // Mostrar después de 300ms
 *         minLoadingTime: 800 // Mantener visible al menos 800ms
 *       }}
 *     >
 *       <DashboardContent stats={stats} />
 *     </ContentLoader>
 *   );
 * }
 * 
 * // Uso sin fallback
 * function ModalContent() {
 *   const { data: content, isLoading } = useQuery('modal', fetchModalData);
 * 
 *   return (
 *     <ContentLoader
 *       isLoading={isLoading}
 *       fallbackVariant="none"
 *     >
 *       <ModalBody content={content} />
 *     </ContentLoader>
 *   );
 * }
 * 
 * // Uso con className personalizada
 * function CustomLoader() {
 *   const { data, isLoading } = useQuery('data', fetchData);
 * 
 *   return (
 *     <ContentLoader
 *       isLoading={isLoading}
 *       fallbackVariant="loader"
 *       className="min-h-[200px] bg-gray-50 rounded-lg"
 *     >
 *       <DataContent data={data} />
 *     </ContentLoader>
 *   );
 * }
 * ```
 * 
 * @param props - Propiedades del componente
 * @returns Componente de carga o contenido
 */
export function ContentLoader({
  isLoading,
  skeleton,
  children,
  loadingOptions = {},
  fallbackVariant = 'skeleton',
  loaderSize = 'md',
  className = ''
}: ContentLoaderProps) {
  const showLoading = usePageLoading(isLoading, loadingOptions);

  // Si no está cargando, mostrar children
  if (!showLoading) {
    return <>{children}</>;
  }

  // Prioridad 1: Skeleton si está disponible
  if (skeleton) {
    return <>{skeleton}</>;
  }

  // Prioridad 2: Loader como fallback
  if (fallbackVariant === 'loader') {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <Loader size={loaderSize} />
      </div>
    );
  }

  // Prioridad 3: No mostrar nada
  if (fallbackVariant === 'none') {
    return null;
  }

  // Por defecto, mostrar loader
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <Loader size={loaderSize} />
    </div>
  );
} 