/**
 * Barrel export principal para todos los componentes
 * 
 * Este archivo exporta todos los componentes de la aplicación, tanto UI como custom,
 * proporcionando un punto de entrada único para importar cualquier componente.
 * 
 * REGLAS DE EXPORTACIÓN:
 * - Usar SIEMPRE 'export * from' para evitar errores de exportación
 * - NO usar exportaciones nombradas individuales (export { Component } from './path')
 * - Los componentes default deben ser exportados como nombrados en sus archivos originales
 * - Mantener imports cortos usando alias (@components, @ui, etc.)
 * 
 * @example
 * ```tsx
 * // Importar componentes UI
 * import { Button, Card, Input, Modal } from '@components';
 * 
 * // Importar componentes custom
 * import { AppLoader, ContentLoader, UserAvatar } from '@components';
 * 
 * // Importar componentes mixtos
 * import { 
 *   Button, 
 *   Card, 
 *   AppLoader, 
 *   ContentLoader 
 * } from '@components';
 * 
 * // Uso en componentes
 * function MyPage() {
 *   return (
 *     <div>
 *       <Card>
 *         <CardHeader>
 *           <CardTitle>Mi Página</CardTitle>
 *         </CardHeader>
 *         <CardContent>
 *           <ContentLoader>
 *             <UserAvatar user={currentUser} />
 *             <Button>Acción</Button>
 *           </ContentLoader>
 *         </CardContent>
 *       </Card>
 *     </div>
 *   );
 * }
 * ```
 */

export * from './custom';
export * from './ui';

