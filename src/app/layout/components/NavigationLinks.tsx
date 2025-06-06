import { Link, useLocation } from 'react-router';

import { Button } from '@/shared/components/ui';
import { APP_ROUTES } from '@/shared/constants/route.constants';
import { cn } from '@/shared/lib/utils';

const items = [
  { text: 'Inicio', to: APP_ROUTES.HOME },
  { text: 'Nosotros', to: APP_ROUTES.ABOUT },
  { text: 'Google Maps', to: APP_ROUTES.GOOGLE_MAPS }
];

export const NavigationLinks = () => {
  const { pathname } = useLocation();

  return (
    <ul className='flex flex-col items-center justify-center md:flex-row gap-4'>
      {items.map(item => {
        const isActive = pathname === item.to;

        return (
          <li key={item.to} className='mb-2'>
            <Button
              asChild
              variant={isActive ? 'link' : 'link'}
              className={cn('w-full justify-start md:w-auto md:justify-center')}
            >
              <Link
                to={item.to}
                className={cn(
                  'text-sm font-medium text-foreground hover:underline',
                  isActive && 'underline'
                )}
              >
                {item.text}
              </Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
};
