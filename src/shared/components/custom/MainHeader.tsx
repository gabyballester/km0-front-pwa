import { MainHeaderMenu } from './MainHeaderMenu';
import { ThemeToggle } from './ThemeToggle';

export const MainHeader = () => {
  return (
    <header className='grid grid-cols-3 items-center border-b px-4 h-16 bg-background'>
      <div className='flex items-center space-x-4 gap-3'>
        <img src='/pwa-512x512.png' alt='Logo Km0' className='h-8 w-8' />
        <span className='text-lg font-bold text-foreground'>Km0</span>
      </div>

      <div className='flex justify-center'>
        <MainHeaderMenu />
      </div>

      <div className='flex justify-end'>
        <ThemeToggle />
      </div>
    </header>
  );
};
