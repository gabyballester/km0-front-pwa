import { type ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import { PATHS } from '@/router/paths.router';
import { Button } from '@/shared/components/ui/button';
import { logger } from '@/shared/utils/logger';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4'>
      <div className='max-w-md w-full space-y-8 text-center'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold text-foreground'>¡Ups! Algo salió mal</h1>
          <p className='text-muted-foreground'>
            {error?.message || 'Ha ocurrido un error inesperado'}
          </p>
        </div>
        <div className='space-y-4'>
          <Button onClick={resetErrorBoundary} className='w-full'>
            Intentar de nuevo
          </Button>
          <Button
            variant='outline'
            onClick={() => (window.location.href = PATHS.HOME)}
            className='w-full'
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback ? () => <>{fallback}</> : ErrorFallback}
      onError={(error, errorInfo) => {
        logger.error('Application Error:', error, errorInfo);

        // Opcional: enviar a servicio de monitoreo
        // reportError(error, errorInfo);
      }}
      onReset={() => {
        // Limpiar estado si es necesario
        logger.warn('Error boundary reset');
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
