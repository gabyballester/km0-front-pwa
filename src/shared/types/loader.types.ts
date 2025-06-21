import type { loaderVariants } from '@components';

import type { VariantProps } from 'class-variance-authority';

/**
 * Tipos relacionados con los componentes de carga
 * 
 * Este archivo define los tipos para los diferentes componentes de carga
 * de la aplicación, incluyendo variantes, tamaños y configuraciones.
 * 
 * @example
 * ```tsx
 * // Uso de tipos en componentes
 * import type { LoaderVariant, LoaderSize } from '@types';
 * 
 * function MyLoader() {
 *   const [variant, setVariant] = useState<LoaderVariant>('spinner');
 *   const [size, setSize] = useState<LoaderSize>('md');
 * 
 *   return <Loader variant={variant} size={size} />;
 * }
 * 
 * // Uso en AppLoader
 * function AppLoader() {
 *   const config: AppLoaderVariantConfig = {
 *     icon: '🚀',
 *     title: 'Iniciando aplicación',
 *     description: 'Cargando recursos...',
 *     loaderVariant: 'spinner',
 *     bgColor: 'bg-background'
 *   };
 * 
 *   return <AppLoader variant="app-init" config={config} />;
 * }
 * ```
 */

/**
 * Variantes disponibles para el componente Loader
 */
export type LoaderVariant = NonNullable<VariantProps<typeof loaderVariants>['variant']>;

/**
 * Tamaños disponibles para el componente Loader
 */
export type LoaderSize = NonNullable<VariantProps<typeof loaderVariants>['size']>;

/**
 * Opción de pantalla completa para el componente Loader
 */
export type LoaderFullScreen = NonNullable<VariantProps<typeof loaderVariants>['fullScreen']>;

/**
 * Variantes disponibles para el componente AppLoader
 * 
 * - app-init: Para la carga inicial de la aplicación
 * - route-load: Para la carga de rutas
 * - error: Para estados de error
 */
export type AppLoaderVariant = 'app-init' | 'route-load' | 'error';

/**
 * Configuración de variantes del AppLoader
 * 
 * Define la configuración visual y de comportamiento para cada
 * variante del AppLoader.
 */
export interface AppLoaderVariantConfig {
  /** Icono a mostrar (emoji o clase CSS) */
  icon: string;
  /** Título principal del loader */
  title: string;
  /** Descripción o mensaje secundario */
  description: string;
  /** Variante del componente Loader interno */
  loaderVariant: LoaderVariant;
  /** Color de fondo del loader */
  bgColor: string;
} 