// app/AppRouter.tsx
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
//todo: tengo 2 AppRouter.tsx

// import { LandingPage } from '@/features/landing/LandingPage';
import { APP_ROUTES } from '@/shared/constants/route.constants';

import { MainLayout } from './layout/MainLayout';

const NotFoundPage = lazy(() => import('@/features/not-found/NotFoundPage'));
const AboutPage = lazy(() => import('@/features/about/AboutPage'));
const LandingPage = lazy(() => import('@/features/landing/LandingPage'));
const GoogleMapsPage = lazy(() => import('@/features/google-maps/GoogleMapsPage'));
const LoadingScreen = lazy(() => import('@/shared/pages/LoadingScreen'));

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path={APP_ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={APP_ROUTES.GOOGLE_MAPS} element={<GoogleMapsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
