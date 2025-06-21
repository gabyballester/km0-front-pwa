/**
 * Router hooks
 * Hooks personalizados para el manejo del router
 *
 * Permite importar hooks de router de forma centralizada.
 *
 * @example
 * ```tsx
 * // Importar hooks de router
 * import { useRouteType } from '@router/hooks';
 *
 * function MyComponent() {
 *   const routeType = useRouteType();
 * 
 *   return (
 *     <div>
 *       {routeType === 'public' && <PublicContent />}
 *       {routeType === 'protected' && <ProtectedContent />}
 *     </div>
 *   );
 * }
 * ```
 */

export { useRouteType } from './useRouteType';

