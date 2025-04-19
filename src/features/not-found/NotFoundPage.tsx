// pages/NotFoundPage.tsx
// import { Alert } from '@/components/ui/alert';
import { Link } from 'react-router';

import { Button } from '@/shared/components';
import { APP_ROUTES } from '@/shared/constants/routes';

const NotFoundPage = () => {
  return (
    <div className='container mx-auto py-16 text-center'>
      {/* <Alert variant='destructive' className='mx-auto mb-8 max-w-md'>
        <h1 className='mb-4 text-4xl font-bold'>404</h1>
        <p className='text-lg'>Página no encontrada</p>
      </Alert> */}
      <Button asChild>
        <Link to={APP_ROUTES.HOME}>Volver al inicio</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
