import { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import { RouteGuard } from '../components/RouteGuard';
import { routes } from '../routes';

import type { RouteConfig } from '../types';

// Componente de carga optimizado
const LoadingFallback = () => (
  <div className='flex h-screen w-full items-center justify-center'>
    <div className='flex flex-col items-center gap-4'>
      <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      <p className='text-sm text-muted-foreground'>Cargando...</p>
    </div>
  </div>
);

/**
 * Renderiza una ruta individual con su configuración
 */
const renderRoute = (route: RouteConfig): JSX.Element => {
  const routeElement = <RouteGuard type={route.type}>{route.element}</RouteGuard>;

  // Rutas index (no pueden tener children)
  if (route.index) {
    return <Route key={`${route.path}-index`} index element={routeElement} />;
  }

  // Rutas normales
  return (
    <Route key={route.path} path={route.path} element={routeElement}>
      {/* Renderizar children recursivamente */}
      {route.children?.map(child => renderRoute(child))}
    </Route>
  );
};

/**
 * Componente principal del router
 *
 * Características:
 * - Sistema modular de rutas
 * - Lazy loading automático
 * - Protección de rutas integrada
 * - Manejo optimizado de layouts
 * - Validación automática en desarrollo
 *
 * @example
 * ```tsx
 * // En App.tsx
 * import { Router } from '@/router';
 *
 * function App() {
 *   return <Router />;
 * }
 * ```
 */
export function Router() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>{routes.map(route => renderRoute(route))}</Routes>
    </Suspense>
  );
}
