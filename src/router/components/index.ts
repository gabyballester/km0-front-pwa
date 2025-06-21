/**
 * Exporta todos los componentes relacionados con el enrutamiento
 *
 * Permite importar componentes de router de forma centralizada.
 *
 * @example
 * ```tsx
 * // Importar componentes de router
 * import { RouteGuard } from '@router/components';
 *
 * function App() {
 *   return (
 *     <Router>
 *       <RouteGuard>
 *         <Routes>
 *           <Route path="/" element={<HomePage />} />
 *         </Routes>
 *       </RouteGuard>
 *     </Router>
 *   );
 * }
 * ```
 */

export { RouteGuard } from './RouteGuard';

