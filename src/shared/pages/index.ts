/**
 * Barrel de páginas compartidas
 *
 * Exporta todas las páginas compartidas de la aplicación para facilitar imports centralizados.
 * Se recomienda importar desde @pages.
 *
 * @example
 * ```tsx
 * import { NotFoundPage } from '@pages';
 *
 * function App() {
 *   return (
 *     <Routes>
 *       <Route path="*" element={<NotFoundPage />} />
 *     </Routes>
 *   );
 * }
 * ```
 */
export * from './NotFoundPage';
