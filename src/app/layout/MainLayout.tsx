import { Outlet } from 'react-router';

import { MainFooter, MainHeader } from './components';

export const MainLayout = () => {
  return (
    <div className='grid h-screen grid-rows-[70px_1fr_auto]'>
      <header className='flex items-center justify-center'>
        <MainHeader />
      </header>

      <main className='overflow-hidden scroll-auto flex flex-col'>
        <Outlet />
        <MainFooter />
      </main>
    </div>
  );
};
