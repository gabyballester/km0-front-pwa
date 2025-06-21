import { BrowserRouter } from 'react-router-dom';

import { Router } from '@/router';
import {
  AppInitializer,
  ErrorBoundary,
  PWAInstallComponent,
  PWAUpdateComponent,
  Toaster,
  VersionDisplay
} from '@/shared/components';

import { AuthProvider, ThemeProvider, VersionProvider } from '@contexts';

import './styles/global.css';

export const App = () => {
  return (
    <AppInitializer>
      <ErrorBoundary>
        <VersionProvider>
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
          <VersionDisplay position="bottom-left" showDetails />
        </VersionProvider>
      </ErrorBoundary>
    </AppInitializer>
  );
};
