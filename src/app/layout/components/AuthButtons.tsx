import { Link } from 'react-router';

import { Button } from '@/shared/components';
import { APP_ROUTES } from '@/shared/constants/route.constants';
import { cn } from '@/shared/lib/utils';

export const AuthButtons = ({ mobile, className }: { mobile?: boolean; className?: string }) => {
  return (
    <div className={cn('items-center gap-6 md:gap-2', mobile ? 'flex' : 'md:flex', className)}>
      <Button size='lg' variant='secondary' asChild className='w-full md:w-[5rem]'>
        <Link to={APP_ROUTES.LOGIN}>Login</Link>
      </Button>
      <Button size='lg' asChild className='w-full md:w-[5rem]'>
        <Link to={APP_ROUTES.REGISTER}>Registro</Link>
      </Button>
    </div>
  );
};
