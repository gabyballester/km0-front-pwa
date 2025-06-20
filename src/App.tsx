import { BrowserRouter } from 'react-router-dom';

import { Router } from '@/router';
import {
  AppInitializer,
  ErrorBoundary,
  PWAInstallComponent,
  PWAUpdateComponent,
  Toaster
} from '@/shared/components';

import { AuthProvider, ThemeProvider } from '@contexts';

export const App = () => {
  return (
    <AppInitializer>
      <ErrorBoundary>
        <ThemeProvider>
          <BrowserRouter>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
        <Toaster />
        <PWAInstallComponent />
        <PWAUpdateComponent />
      </ErrorBoundary>
    </AppInitializer>
  );
};
