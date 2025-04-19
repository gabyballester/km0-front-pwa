import { MainHeaderMenu } from './MainHeaderMenu';

export const MainHeader = () => {
  return (
    <header className='flex flex-row border-b'>
      <MainHeaderMenu />
      <div>Switcher</div>
    </header>
  );
};
