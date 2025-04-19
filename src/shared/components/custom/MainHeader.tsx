import { MainHeaderMenu } from './MainHeaderMenu';
import { ThemeColorToggle } from './ThemeColorToggle';
import { ThemeModeToggle } from './ThemeModeToggle';

export const MainHeader = () => {
  return (
    <header className='flex flex-row border-b'>
      <MainHeaderMenu />
      <ThemeModeToggle />
      <ThemeColorToggle />
    </header>
  );
};
