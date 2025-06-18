import { Link } from 'react-router-dom';

import { Home, Search } from 'lucide-react';

import { PATHS } from '@/router/paths.router';
import { Button } from '@/shared/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <div className='text-center space-y-6 p-8'>
        <div className='space-y-2'>
          <Search className='mx-auto h-16 w-16 text-muted-foreground' />
          <h1 className='text-4xl font-bold'>404</h1>
          <h2 className='text-2xl font-semibold'>Página no encontrada</h2>
          <p className='text-muted-foreground max-w-md'>
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild>
            <Link to={PATHS.HOME}>
              <Home className='h-4 w-4 mr-2' />
              Volver al inicio
            </Link>
          </Button>
          <Button variant='outline' onClick={() => window.history.back()}>
            Volver atrás
          </Button>
        </div>
      </div>
    </div>
  );
}
