import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { AppRouter } from './AppRouter';
import { PWAInstallComponent } from './components/pwa-install-component/PWAInstallComponent';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
    <PWAInstallComponent />
  </React.StrictMode>
);
