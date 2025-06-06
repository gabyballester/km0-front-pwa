import { ErrorBoundary } from '@/shared/components/custom/ErrorBoundary';

import { MapComponent } from './components/MapComponent';

// import { Button, Card } from '@/shared/components';

const LandingPage = () => {
  return (
    <ErrorBoundary fallback={<div className='map-error'>Error al cargar el mapa</div>}>
      <h1>Mapa de Valencia</h1>
      <MapComponent />
    </ErrorBoundary>
  );
};

export default LandingPage;
