import type { ReactNode } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { PWAInstallProvider } from './pwa-install-context';

import { AuthProvider, ThemeProvider, VersionProvider } from './index';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Context Aggregator - Agrupa todos los providers de la aplicación
 *
 * Este patrón sigue los principios SOLID:
 * - Single Responsibility: Cada provider tiene una responsabilidad específica
 * - Open/Closed: Fácil agregar nuevos providers sin modificar el código existente
 * - Dependency Inversion: Los providers son independientes entre sí
 *
 * Orden de los providers (importante para el contexto):
 * 1. BrowserRouter - Proporciona contexto de navegación
 * 2. ThemeProvider - Tema global
 * 3. VersionProvider - Información de versión
 * 4. AuthProvider - Autenticación (necesita router)
 * 5. PWAInstallProvider - Instalación PWA
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <VersionProvider>
          <AuthProvider>
            <PWAInstallProvider>{children}</PWAInstallProvider>
          </AuthProvider>
        </VersionProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
