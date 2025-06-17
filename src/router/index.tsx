import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PageTransition } from '@/shared/components';

import { RouteGuard } from './components/RouteGuard';
import { routes } from './routes';

// Componente de carga simple
const LoadingFallback = () => (
  <div className='flex h-screen w-full items-center justify-center'>
    <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
  </div>
);

/**
 * Componente principal de enrutamiento
 * Utiliza la configuración de rutas definida en routes.tsx
 */
export function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <RouteGuard type={route.type}>
                <PageTransition>{route.element}</PageTransition>
              </RouteGuard>
            }
          >
            {route.children?.map(child => (
              <Route
                key={`${route.path}/${child.path}`}
                path={child.path}
                element={
                  <RouteGuard type={child.type}>
                    <PageTransition>{child.element}</PageTransition>
                  </RouteGuard>
                }
              />
            ))}
          </Route>
        ))}
      </Routes>
    </Suspense>
  );
}
