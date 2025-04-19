// layouts/MainLayout/MainLayout.tsx
import { Outlet } from 'react-router';

import { MainHeader } from '@/shared/components';

export const MainLayout = () => {
  return (
    <div className='flex h-screen flex-col'>
      <MainHeader />

      <main className='container mx-auto flex-1 px-4 py-8'>
        <Outlet />
      </main>
    </div>
  );
};
