import { Link } from 'react-router';

import { Button } from '@/shared/components';
import { combineClassNames } from '@/shared/utils';

import { PATHS } from '@paths';

export const AuthButtons = ({ mobile, className }: { mobile?: boolean; className?: string }) => {
  return (
    <div
      className={combineClassNames(
        'items-center gap-6 md:gap-2',
        mobile ? 'flex' : 'md:flex',
        className
      )}
    >
      <Button size='lg' variant='secondary' asChild className='w-full md:w-[5rem]'>
        <Link to={PATHS.LOGIN}>Login2</Link>
      </Button>
      <Button size='lg' asChild className='w-full md:w-[5rem]'>
        <Link to={PATHS.REGISTER}>Registro</Link>
      </Button>
    </div>
  );
};
