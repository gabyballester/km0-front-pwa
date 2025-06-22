import { LogOut } from 'lucide-react';

import { useAuth } from '@contexts';

import { Button } from '@ui';

/**
 * Props del componente LogoutButton
 */
interface LogoutButtonProps {
  /** Variante visual del botón */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Tamaño del botón */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /** Mostrar icono de logout */
  showIcon?: boolean;
  /** Mostrar texto del botón */
  showText?: boolean;
}

/**
 * Componente de botón para cerrar sesión
 *
 * Este componente proporciona un botón configurable para cerrar sesión,
 * con opciones de personalización visual y comportamiento.
 *
 * Características:
 * - Integración automática con el contexto de autenticación
 * - Personalización de variante y tamaño
 * - Control sobre icono y texto
 * - Manejo automático del logout
 *
 * @example
 * ```tsx
 * // Uso básico
 * function Header() {
 *   return (
 *     <header className="flex justify-between items-center p-4">
 *       <h1>Mi App</h1>
 *       <LogoutButton />
 *     </header>
 *   );
 * }
 *
 * // Con variante personalizada
 * function Sidebar() {
 *   return (
 *     <aside className="p-4">
 *       <nav className="space-y-2">
 *         <a href="/dashboard">Dashboard</a>
 *         <a href="/profile">Perfil</a>
 *         <LogoutButton variant="destructive" />
 *       </nav>
 *     </aside>
 *   );
 * }
 *
 * // Solo icono
 * function CompactHeader() {
 *   return (
 *     <header className="flex justify-between items-center p-2">
 *       <h1>App</h1>
 *       <LogoutButton showText={false} size="icon" />
 *     </header>
 *   );
 * }
 *
 * // Solo texto
 * function Footer() {
 *   return (
 *     <footer className="p-4 text-center">
 *       <LogoutButton showIcon={false} variant="link" />
 *     </footer>
 *   );
 * }
 * ```
 */
export function LogoutButton({
  variant = 'outline',
  size = 'default',
  showIcon = true,
  showText = true
}: LogoutButtonProps) {
  const { logout } = useAuth();

  return (
    <Button variant={variant} size={size} onClick={logout} className='flex items-center gap-2'>
      {showIcon && <LogOut className='h-4 w-4' />}
      {showText && 'Cerrar Sesión'}
    </Button>
  );
}
