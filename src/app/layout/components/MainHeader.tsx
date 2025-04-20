import { useState } from 'react';

import { NavigationLinks } from '@/app/layout/components/NavigationLinks';

import { AuthButtons } from './AuthButtons';
import { Drawer } from './Drawer';
import { LanguageSection } from './LanguageSection';
import { ThemeAndColorToggle } from './ThemeAndColorToggle';
import { TitleLogoApp } from './TitleLogoApp';

export const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className='flex items-center justify-between md:grid md:grid-cols-[auto_1fr_auto] w-full border-b bg-background
        px-4 h-full gap-10'
    >
      <div className='flex items-center gap-2 flex-shrink-0'>
        <TitleLogoApp />
      </div>

      <nav className='hidden flex-grow md:flex md:items-center md:justify-center'>
        <NavigationLinks />
      </nav>

      {/* Sección derecha - Acciones */}
      <div className='hidden flex-grow md:flex md:items-center md:justify-center items-center gap-4 flex-shrink-0'>
        <LanguageSection />
        <ThemeAndColorToggle />
        <AuthButtons />
      </div>
      <div className='flex md:hidden'>
        <Drawer isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </div>
  );
};
