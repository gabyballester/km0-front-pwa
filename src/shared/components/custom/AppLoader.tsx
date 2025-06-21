import { useTranslation } from 'react-i18next';

import type { AppLoaderVariant, AppLoaderVariantConfig } from '@/shared/types/loader.types';

import { Loader } from '@components';

interface AppLoaderProps {
  /** Variante del loader (app-init, route-load, error) */
  variant: AppLoaderVariant;
  /** Título personalizado (opcional) */
  title?: string;
  /** Descripción personalizada (opcional) */
  description?: string;
  /** Icono personalizado (opcional) */
  icon?: string;
  /** Acciones adicionales (botones, enlaces, etc.) */
  actions?: React.ReactNode;
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * Componente AppLoader para estados de carga de la aplicación
 * 
 * Proporciona una pantalla de carga fullscreen con diferentes variantes
 * predefinidas para diferentes estados de la aplicación.
 * 
 * @example
 * ```tsx
 * // Loader de inicialización de la aplicación
 * function AppInitialization() {
 *   const [isInitializing, setIsInitializing] = useState(true);
 * 
 *   useEffect(() => {
 *     initializeApp().finally(() => setIsInitializing(false));
 *   }, []);
 * 
 *   if (isInitializing) {
 *     return <AppLoader variant="app-init" />;
 *   }
 * 
 *   return <App />;
 * }
 * 
 * // Loader de carga de ruta
 * function RouteLoader() {
 *   const [isLoading, setIsLoading] = useState(true);
 * 
 *   useEffect(() => {
 *     loadRouteData().finally(() => setIsLoading(false));
 *   }, []);
 * 
 *   if (isLoading) {
 *     return <AppLoader variant="route-load" />;
 *   }
 * 
 *   return <RouteContent />;
 * }
 * 
 * // Loader de error con acciones
 * function ErrorLoader() {
 *   return (
 *     <AppLoader
 *       variant="error"
 *       actions={
 *         <div className="space-x-2">
 *           <Button onClick={() => window.location.reload()}>
 *             Recargar
 *           </Button>
 *           <Button variant="outline" onClick={() => navigate('/')}>
 *             Ir al inicio
 *           </Button>
 *         </div>
 *       }
 *     />
 *   );
 * }
 * 
 * // Loader personalizado
 * function CustomLoader() {
 *   return (
 *     <AppLoader
 *       variant="app-init"
 *       title="Configurando tu experiencia"
 *       description="Preparando todo para ti..."
 *       icon="⚙️"
 *       className="bg-gradient-to-br from-blue-50 to-indigo-100"
 *     />
 *   );
 * }
 * ```
 * 
 * @param props - Propiedades del componente
 * @returns Componente de carga fullscreen
 */
export function AppLoader({ 
  variant, 
  title, 
  description, 
  icon,
  actions,
  className = ''
}: AppLoaderProps) {
  const { t } = useTranslation();

  const getVariantConfig = (): AppLoaderVariantConfig => {
    switch (variant) {
      case 'app-init':
        return {
          icon: '🚀',
          title: t('loading.appInit.title'),
          description: t('loading.appInit.description'),
          loaderVariant: 'initializing',
          bgColor: 'bg-background'
        };
      case 'route-load':
        return {
          icon: '📄',
          title: t('loading.routeLoad.title'),
          description: t('loading.routeLoad.description'),
          loaderVariant: 'default',
          bgColor: 'bg-background'
        };
      case 'error':
        return {
          icon: '⚠️',
          title: t('loading.error.title'),
          description: t('loading.error.description'),
          loaderVariant: 'error',
          bgColor: 'bg-background'
        };
    }
  };

  const config = getVariantConfig();

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${config.bgColor} ${className}`}>
      <div className='text-center space-y-4'>
        <div className='text-4xl'>{icon || config.icon}</div>
        
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold text-foreground'>
            {title || config.title}
          </h2>
          <p className='text-sm text-muted-foreground'>
            {description || config.description}
          </p>
        </div>
        
        {variant !== 'error' && (
          <Loader variant={config.loaderVariant} size="lg" />
        )}
        
        {actions && (
          <div className='space-y-2'>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
} 