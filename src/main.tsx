import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { AppRouter } from '@/app/AppRouter';
import { ThemeProvider } from '@/contexts/theme-context/ThemeProvider';
import { PWAInstallComponent } from '@/shared/components';

import './i18n/i18n';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
    <PWAInstallComponent />
  </React.StrictMode>
);
