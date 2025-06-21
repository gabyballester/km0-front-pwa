import { Link } from 'react-router-dom';

import { LogOut, Settings, User as UserIcon } from 'lucide-react';

import type { User } from '@/shared/types/auth.types';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@components';

import { useAuth } from '@contexts';

import { PATHS } from '@paths';

/**
 * Props del componente UserNav
 */
interface UserNavProps {
  /** Usuario autenticado */
  user: User | null;
}

/**
 * Componente de navegación de usuario
 * 
 * Este componente proporciona un menú desplegable con información del usuario
 * y opciones de navegación relacionadas con la cuenta del usuario.
 * 
 * Características:
 * - Avatar del usuario con iniciales como fallback
 * - Menú desplegable con información del usuario
 * - Enlaces a perfil y configuración
 * - Opción de cerrar sesión
 * - Integración con el sistema de autenticación
 * - Manejo de usuarios no autenticados
 * 
 * @example
 * ```tsx
 * // Uso básico en header
 * function DashboardHeader() {
 *   const { user } = useAuth();
 *   
 *   return (
 *     <header className="flex justify-between items-center p-4">
 *       <h1>Dashboard</h1>
 *       <UserNav user={user} />
 *     </header>
 *   );
 * }
 * 
 * // Con layout responsive
 * function DashboardLayout() {
 *   const { user } = useAuth();
 *   
 *   return (
 *     <div className="min-h-screen">
 *       <header className="border-b">
 *         <div className="flex justify-between items-center p-4">
 *           <div className="hidden md:block">
 *             <DesktopNav />
 *           </div>
 *           <div className="flex items-center gap-2">
 *             <MobileNav />
 *             <UserNav user={user} />
 *           </div>
 *         </div>
 *       </header>
 *       <main className="p-4">
 *         <Outlet />
 *       </main>
 *     </div>
 *   );
 * }
 * 
 * // En sidebar móvil
 * function MobileSidebar() {
 *   const { user } = useAuth();
 *   
 *   return (
 *     <aside className="p-4">
 *       <div className="border-t pt-4">
 *         <UserNav user={user} />
 *       </div>
 *     </aside>
 *   );
 * }
 * ```
 */
export function UserNav({ user }: UserNavProps) {
  const { logout } = useAuth();

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/default-avatar.png' alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user.name}</p>
            <p className='text-xs leading-none text-muted-foreground'>{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={PATHS.DASHBOARD} className='flex items-center'>
            <UserIcon className='mr-2 h-4 w-4' />
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to='/settings' className='flex items-center'>
            <Settings className='mr-2 h-4 w-4' />
            <span>Configuración</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-600 focus:text-red-600' onClick={logout}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
