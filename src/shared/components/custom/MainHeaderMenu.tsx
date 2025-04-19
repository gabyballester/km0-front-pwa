import { Link } from 'react-router';

import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  navigationMenuTriggerStyle
} from '@/shared/components';
import { APP_ROUTES } from '@/shared/constants/routes';

export const MainHeaderMenu = () => {
  return (
    <nav className='container mx-auto border-2 border-red-500 px-4 py-3'>
      <NavigationMenu>
        <ul className='flex space-x-4'>
          <NavigationMenuItem>
            <Button asChild variant='ghost'>
              <Link to={APP_ROUTES.HOME} className={navigationMenuTriggerStyle()}>
                Inicio
              </Link>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button asChild variant='ghost'>
              <Link to={APP_ROUTES.ABOUT} className={navigationMenuTriggerStyle()}>
                Sobre Nosotros
              </Link>
            </Button>
          </NavigationMenuItem>
        </ul>
      </NavigationMenu>
    </nav>
  );
};
