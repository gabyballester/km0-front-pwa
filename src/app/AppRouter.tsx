// app/AppRouter.tsx
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

// import { LandingPage } from '@/features/landing/LandingPage';
import { APP_ROUTES } from '@/shared/constants/routes';

import { MainLayout } from './layout/MainLayout';

const NotFoundPage = lazy(() => import('@/features/not-found/NotFoundPage'));
const AboutPage = lazy(() => import('@/features/about/AboutPage'));
const LandingPage = lazy(() => import('@/features/landing/LandingPage'));
const LoadingScreen = lazy(() => import('@/app/LoadingScreen'));

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path={APP_ROUTES.ABOUT} element={<AboutPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
