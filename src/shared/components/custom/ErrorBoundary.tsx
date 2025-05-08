import type { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      fallback={fallback || <div className='map-error'>Error al cargar el mapa</div>}
      onError={(error, info) => {
        console.error('Map Error:', error, info);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
