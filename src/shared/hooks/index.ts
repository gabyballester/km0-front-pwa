/**
 * Exporta todos los hooks personalizados
 *
 * Permite importar hooks de forma centralizada y con rutas cortas.
 *
 * @example
 * ```ts
 * // Importar y usar un hook personalizado
 * import { useToast, useDeviceType } from '@hooks';
 *
 * function MyComponent() {
 *   const { showSuccess } = useToast();
 *   const device = useDeviceType();
 *   // ...
 * }
 * ```
 */

export * from './useConfirmDialog';
export * from './useDeviceType';
export * from './usePageLoading';
export * from './useRequireAuth';
export * from './useServiceWorker';
export * from './useToast';

