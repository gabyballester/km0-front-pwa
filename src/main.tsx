import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { PWAInstallComponent } from '@/shared/components';

import { AppRouter } from './AppRouter';

import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
    <PWAInstallComponent />
  </React.StrictMode>
);
