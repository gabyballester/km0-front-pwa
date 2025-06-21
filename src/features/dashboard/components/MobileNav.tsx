import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import { Menu } from 'lucide-react';

import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@components';

import { useAuth } from '@contexts';

import { PATHS } from '@paths';

import { UserNav } from './UserNav';

/**
 * Componente de navegación móvil
 * 
 * Este componente proporciona un menú de navegación lateral para dispositivos móviles,
 * utilizando un Sheet (panel deslizable) que se activa con un botón de hamburguesa.
 * 
 * Características:
 * - Menú lateral deslizable para móviles
 * - Navegación principal de la aplicación
 * - Integración con el sistema de autenticación
 * - Soporte para i18n
 * - Accesibilidad con screen readers
 * - Responsive (solo visible en móviles)
 * 
 * @example
 * ```tsx
 * // Uso básico en header
 * function DashboardHeader() {
 *   return (
 *     <header className="flex justify-between items-center p-4">
 *       <h1>Dashboard</h1>
 *       <div className="flex items-center gap-2">
 *         <MobileNav />
 *         <LogoutButton />
 *       </div>
 *     </header>
 *   );
 * }
 * 
 * // Con layout responsive
 * function DashboardLayout() {
 *   return (
 *     <div className="min-h-screen">
 *       <header className="border-b">
 *         <div className="flex justify-between items-center p-4">
 *           <div className="hidden md:block">
 *             <DesktopNav />
 *           </div>
 *           <div className="md:hidden">
 *             <MobileNav />
 *           </div>
 *         </div>
 *       </header>
 *       <main className="p-4">
 *         <Outlet />
 *       </main>
 *     </div>
 *   );
 * }
 * ```
 */
export function MobileNav() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
        <SheetTitle className='sr-only'>Menú de navegación</SheetTitle>
        <SheetDescription className='sr-only'>
          Menú de navegación principal de la aplicación
        </SheetDescription>
        <div className='flex flex-col h-full'>
          <div className='px-2 py-6'>
            <Link to={PATHS.DASHBOARD} className='flex items-center'>
              <span className='text-xl font-semibold'>KM0</span>
            </Link>
          </div>
          <div className='flex-1 px-2'>
            <nav className='grid gap-2'>
              <Button variant='ghost' asChild className='justify-start'>
                <Link to={PATHS.DASHBOARD}>{t('navigation.dashboard')}</Link>
              </Button>
              {/* Aquí puedes añadir más enlaces de navegación */}
            </nav>
          </div>
          <div className='border-t px-2 py-4'>{user && <UserNav user={user} />}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
