import { Outlet } from 'react-router-dom';

import { MobileNav, UserNav } from '@/features/dashboard/components';

import { useAuth } from '@contexts';

import { InstallButton, SimpleBreadcrumbs } from '@custom-ui';

export function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className='h-full w-full flex flex-col bg-background'>
      {/* Header */}
      <header className='sticky top-0 z-40 w-full border-b bg-background'>
        <div className='container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0'>
          <MobileNav />
          <div className='flex flex-1 items-center justify-end space-x-4'>
            <InstallButton />
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
