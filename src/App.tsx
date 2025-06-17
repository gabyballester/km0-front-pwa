import { BrowserRouter } from 'react-router-dom';

import { Router } from '@/router';
import { ErrorBoundary, PWAInstallComponent, Toaster } from '@/shared/components';
import { ThemeProvider } from '@/shared/contexts';
import { AuthProvider } from '@/shared/contexts/AuthContext';

export const App = () => {
  return (
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
    </ErrorBoundary>
  );
};
