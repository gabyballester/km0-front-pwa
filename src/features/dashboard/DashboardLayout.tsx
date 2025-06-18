import { Link, Outlet } from 'react-router-dom';

import { Bell, Home, Settings } from 'lucide-react';

import { MobileNav } from '@/features/dashboard/components/MobileNav';
import { UserNav } from '@/features/dashboard/components/UserNav';
import { PATHS } from '@/router/paths.router';
import { SimpleBreadcrumbs } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu';
import { useAuth } from '@/shared/contexts/AuthContext';

export function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className='h-full w-full flex flex-col bg-background'>
      {/* Header */}
      <header className='border-b flex-shrink-0'>
        <div className='mx-auto px-4 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <MobileNav />
            <Link to={PATHS.DASHBOARD} className='text-xl font-semibold hidden md:block'>
              KM0
            </Link>
            <nav className='hidden md:flex items-center gap-1'>
              <Button variant='ghost' asChild className='gap-2'>
                <Link to={PATHS.DASHBOARD}>
                  <Home className='h-4 w-4' />
                  <span>Inicio</span>
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='gap-2'>
                    <Settings className='h-4 w-4' />
                    <span>Configuración</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start' className='w-48'>
                  <DropdownMenuItem asChild>
                    <Link to='/settings/profile'>Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to='/settings/account'>Cuenta</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to='/settings/notifications'>Notificaciones</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon' className='relative'>
              <Bell className='h-5 w-5' />
              <span className='absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500' />
              <span className='sr-only'>Notificaciones</span>
            </Button>
            <UserNav user={user} />
          </div>
        </div>
        <SimpleBreadcrumbs />
      </header>
      {/* Main centrado, mobile first, con espacio inferior */}
      {/* <main className='flex-1 flex flex-col items-center justify-start px-4 pb-8 pt-4 w-full max-w-7xl mx-auto'> */}
      <main className=''>
        <Outlet />
      </main>
    </div>
  );
}
