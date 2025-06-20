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

export function MobileNav() {
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
                <Link to={PATHS.DASHBOARD}>Dashboard</Link>
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
