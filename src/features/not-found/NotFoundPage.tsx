// pages/NotFoundPage.tsx
// import { Alert } from '@/components/ui/alert';
import { Link } from 'react-router';

import { Alert, Button } from '@/shared/components';
import { APP_ROUTES } from '@/shared/constants/route.constants';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col justify-center items-center py-16 text-center gap-8'>
      <Alert
        variant='destructive'
        className='flex flex-col justify-center items-center mb-8 max-w-md'
      >
        <h1 className='mb-4 text-4xl font-bold'>404</h1>
        <p className='text-lg'>Página no encontrada</p>
      </Alert>
      <Button asChild>
        <Link to={APP_ROUTES.HOME}>Volver al inicio</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
