import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { NavigationLinks } from '@/app/layout/components/NavigationLinks';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/components';
import { TextP } from '@/shared/components/custom/TypographyP';

import { AuthButtons } from './AuthButtons';
import { LanguageSection } from './LanguageSection';
import { ThemeAndColorToggle } from './ThemeAndColorToggle';

export const Drawer = ({
  isMenuOpen,
  setIsMenuOpen
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger className=''>
        <Menu className='h-5 w-5' />
      </SheetTrigger>
      <SheetContent side='right' className='gap-6'>
        <nav className='flex h-full flex-col gap-6 pt-6 px-8'>
          <NavigationLinks />
          <div className='mt-auto space-y-4 flex flex-col items-center justify-center'>
            <div className='flex items-center justify-between w-full'>
              <TextP text={`${t('header.changeLanguage')}:`} />
              <LanguageSection />
            </div>
            <div className='flex items-center justify-between w-full'>
              <TextP text='Cambiar tema:' />
              <ThemeAndColorToggle />
            </div>
          </div>
          <AuthButtons mobile className='flex-col' />
        </nav>
      </SheetContent>
    </Sheet>
  );
};
