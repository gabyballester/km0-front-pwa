import { type ReactNode } from 'react';

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import { logger } from '@utils';

import { PATHS } from '@paths';

import { Button } from '@ui';

/**
 * Props del componente ErrorBoundary
 */
interface ErrorBoundaryProps {
  /** Componentes hijos a proteger */
  children: ReactNode;
  /** Componente de fallback personalizado */
  fallback?: ReactNode;
}

/**
 * Props del componente ErrorFallback
 */
interface ErrorFallbackProps {
  /** Error capturado */
  error: Error;
  /** Función para resetear el error boundary */
  resetErrorBoundary: () => void;
}

/**
 * Componente de fallback por defecto para errores
 *
 * Muestra una interfaz amigable cuando ocurre un error,
 * con opciones para reintentar o volver al inicio.
 *
 * @param error - Error capturado
 * @param resetErrorBoundary - Función para resetear el error boundary
 *
 * @example
 * ```tsx
 * // Uso básico
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * // Con fallback personalizado
 * <ErrorBoundary fallback={<CustomErrorPage />}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
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

/**
 * Componente ErrorBoundary para capturar errores de React
 *
 * Este componente envuelve la aplicación o componentes específicos
 * para capturar errores de JavaScript y mostrar una interfaz de error
 * en lugar de que la aplicación se rompa completamente.
 *
 * Características:
 * - Captura errores de JavaScript en componentes hijos
 * - Muestra una interfaz de error amigable
 * - Permite reintentar la operación
 * - Registra errores para debugging
 * - Soporte para fallback personalizado
 *
 * @example
 * ```tsx
 * // Proteger toda la aplicación
 * function App() {
 *   return (
 *     <ErrorBoundary>
 *       <Router>
 *         <Routes>
 *           <Route path="/" element={<HomePage />} />
 *         </Routes>
 *       </Router>
 *     </ErrorBoundary>
 *   );
 * }
 *
 * // Proteger componentes específicos
 * function Dashboard() {
 *   return (
 *     <div>
 *       <Header />
 *       <ErrorBoundary>
 *         <ComplexChart />
 *       </ErrorBoundary>
 *       <Footer />
 *     </div>
 *   );
 * }
 *
 * // Con fallback personalizado
 * function MyApp() {
 *   const CustomError = () => (
 *     <div className="p-4 bg-red-50 border border-red-200 rounded">
 *       <h2>Error personalizado</h2>
 *       <p>Algo salió mal en esta sección</p>
 *     </div>
 *   );
 *
 *   return (
 *     <ErrorBoundary fallback={<CustomError />}>
 *       <MyComponent />
 *     </ErrorBoundary>
 *   );
 * }
 * ```
 */
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
