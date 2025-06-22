import { AppProviders } from '@contexts';

import { Router } from '@router';

import { AppInitializer, ErrorBoundary, GlobalLayout } from '@custom-ui';

import './styles/global.css';

/**
 * Componente principal de la aplicación
 *
 * Utiliza el patrón Context Aggregator para manejar todos los providers
 * y el GlobalLayout para elementos que deben estar presentes en toda la app.
 *
 * Estructura limpia siguiendo principios SOLID:
 * - Single Responsibility: App solo se encarga de la composición
 * - Open/Closed: Fácil agregar nuevos providers sin modificar App
 * - Dependency Inversion: Depende de abstracciones (AppProviders, GlobalLayout)
 */
export const App = () => {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppInitializer>
          <GlobalLayout>
            <Router />
          </GlobalLayout>
        </AppInitializer>
      </AppProviders>
    </ErrorBoundary>
  );
};
