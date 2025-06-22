import { Link, useLocation } from 'react-router-dom';

import { combineClassNames } from '@utils';

import { PATHS } from '@paths';

import { Button } from '@ui';

const items = [
  { text: 'Inicio', to: PATHS.HOME },
  { text: 'Nosotros', to: PATHS.ABOUT }
  // { text: 'Google Maps', to: PATHS.GOOGLE_MAPS }
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
              className={combineClassNames('w-full justify-start md:w-auto md:justify-center')}
            >
              <Link
                to={item.to}
                className={combineClassNames(
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
