/**
 * Barrel de componentes del dashboard
 *
 * Exporta todos los componentes específicos del dashboard para facilitar
 * imports centralizados y rutas cortas.
 *
 * @example
 * ```tsx
 * // Importar componentes del dashboard
 * import { LogoutButton, UserNav, MobileNav } from '@features/dashboard/components';
 *
 * function DashboardHeader() {
 *   return (
 *     <header className="flex justify-between items-center p-4">
 *       <UserNav />
 *       <div className="flex items-center gap-2">
 *         <MobileNav />
 *         <LogoutButton />
 *       </div>
 *     </header>
 *   );
 * }
 * ```
 */
export * from './LogoutButton';
export * from './MobileNav';
export * from './UserNav';

