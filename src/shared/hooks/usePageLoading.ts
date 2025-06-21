import { useEffect, useState } from 'react';

interface UsePageLoadingOptions {
  /** Delay en ms antes de mostrar el loading (por defecto: 200ms) */
  delay?: number;
  /** Tiempo mínimo en ms que debe mostrarse el loading (por defecto: 500ms) */
  minLoadingTime?: number;
}

/**
 * Hook para manejar estados de carga de página con delay y tiempo mínimo
 * 
 * Este hook evita parpadeos en la UI implementando un delay antes de mostrar
 * el estado de carga y un tiempo mínimo que debe mantenerse visible.
 * 
 * @example
 * ```tsx
 * // Uso básico
 * function MyPage() {
 *   const [data, setData] = useState(null);
 *   const [isLoading, setIsLoading] = useState(true);
 *   const showLoading = usePageLoading(isLoading);
 * 
 *   useEffect(() => {
 *     fetchData().then(setData).finally(() => setIsLoading(false));
 *   }, []);
 * 
 *   if (showLoading) {
 *     return <PageSkeleton />;
 *   }
 * 
 *   return <div>{/* contenido de la página *\/}</div>;
 * }
 * 
 * // Uso con opciones personalizadas
 * function CustomLoadingPage() {
 *   const [isLoading, setIsLoading] = useState(true);
 *   const showLoading = usePageLoading(isLoading, {
 *     delay: 300,        // Mostrar después de 300ms
 *     minLoadingTime: 800 // Mantener visible al menos 800ms
 *   });
 * 
 *   return (
 *     <div>
 *       {showLoading ? (
 *         <div className="flex items-center justify-center p-8">
 *           <Loader size="lg" />
 *           <span className="ml-2">Cargando página...</span>
 *         </div>
 *       ) : (
 *         <PageContent />
 *       )}
 *     </div>
 *   );
 * }
 * 
 * // Uso con ContentLoader
 * function OptimizedPage() {
 *   const { data, isLoading } = useQuery('myData', fetchData);
 *   const showLoading = usePageLoading(isLoading);
 * 
 *   return (
 *     <ContentLoader
 *       isLoading={showLoading}
 *       skeleton={<PageSkeleton />}
 *       loadingOptions={{
 *         delay: 200,
 *         minLoadingTime: 500
 *       }}
 *     >
 *       <PageContent data={data} />
 *     </ContentLoader>
 *   );
 * }
 * ```
 * 
 * @param isLoading - Estado de carga actual
 * @param options - Opciones de configuración del loading
 * @returns `true` si debe mostrarse el estado de carga
 */
export function usePageLoading(isLoading: boolean, options: UsePageLoadingOptions = {}) {
  const { delay = 200, minLoadingTime = 500 } = options;
  const [showLoading, setShowLoading] = useState(false);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  useEffect(() => {
    let delayTimer: NodeJS.Timeout;
    let minTimeTimer: NodeJS.Timeout;

    if (isLoading) {
      // Delay antes de mostrar el skeleton
      delayTimer = setTimeout(() => {
        setShowLoading(true);
        setLoadingStartTime(Date.now());
      }, delay);
    } else if (loadingStartTime) {
      // Asegurar tiempo mínimo de loading
      const elapsed = Date.now() - loadingStartTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);

      minTimeTimer = setTimeout(() => {
        setShowLoading(false);
        setLoadingStartTime(null);
      }, remainingTime);
    } else {
      setShowLoading(false);
    }

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(minTimeTimer);
    };
  }, [isLoading, delay, minLoadingTime, loadingStartTime]);

  return showLoading;
}
