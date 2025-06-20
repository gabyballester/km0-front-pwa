import { useEffect, useRef, useState } from 'react';

import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { APIProvider, ColorScheme, InfoWindow, Map, useMap } from '@vis.gl/react-google-maps';

import { usePageLoading } from '@/shared/hooks';

import { useTheme } from '@contexts';

import GoogleMapsPageSkeleton from './pages/skeletons/GoogleMapsPageSkeleton';

const markersData = [
  {
    id: 1,
    position: { lat: 38.7937, lng: 0.0344 },
    nombre: 'Tomate',
    descripcion: 'Tomate ecológico, 1kg'
  },
  {
    id: 2,
    position: { lat: 38.795, lng: 0.035 },
    nombre: 'Lechuga',
    descripcion: 'Lechuga fresca, 500g'
  },
  {
    id: 3,
    position: { lat: 38.792, lng: 0.033 },
    nombre: 'Naranja',
    descripcion: 'Naranja valenciana, 2kg'
  }
];

function Markers({ onMarkerClick }: { onMarkerClick: (id: number) => void }) {
  const map = useMap();
  const clustererRef = useRef<MarkerClusterer | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!map) return;

    // Limpia marcadores y clusterer previos
    markersRef.current.forEach(marker => marker.setMap(null));
    clustererRef.current?.clearMarkers();

    // Crea nuevos marcadores
    markersRef.current = markersData.map(point => {
      const marker = new google.maps.Marker({
        position: point.position,
        map
      });
      marker.addListener('click', () => onMarkerClick(point.id));
      return marker;
    });

    // Crea el clusterer
    clustererRef.current = new MarkerClusterer({ markers: markersRef.current, map });

    // Limpieza al desmontar
    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      clustererRef.current?.clearMarkers();
    };
  }, [map, onMarkerClick]);

  return null;
}

const GoogleMapsPage = () => {
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
  const defaultCenter = { lat: 38.7937, lng: 0.0344 };
  const { themeMode } = useTheme();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedMarker = markersData.find(m => m.id === selectedId);

  // Simular carga de datos
  const isLoading = false; // Aquí iría la lógica real de carga
  const showSkeleton = usePageLoading(isLoading);

  if (showSkeleton) {
    return <GoogleMapsPageSkeleton />;
  }

  if (!apiKey) {
    return (
      <div className='flex items-center justify-center h-[calc(100vh-70px)]'>
        <div className='text-center p-4 bg-red-50 text-red-700 rounded-lg'>
          <h2 className='text-xl font-bold mb-2'>Error de Configuración</h2>
          <p>La clave de API de Google Maps no está configurada.</p>
          <p className='text-sm mt-2'>Por favor, verifica:</p>
          <ul className='text-sm mt-2 text-left list-disc list-inside'>
            <li>El archivo .env existe en la raíz del proyecto</li>
            <li>La variable VITE_APP_GOOGLE_MAPS_API_KEY está definida</li>
            <li>El servidor de desarrollo se ha reiniciado después de crear el archivo</li>
            <li>La caché del navegador se ha limpiado</li>
          </ul>
        </div>
      </div>
    );
  }

  if (!apiKey.startsWith('AIza')) {
    return (
      <div className='flex items-center z-0 justify-center h-[calc(100vh-70px)]'>
        <div className='text-center p-4 bg-red-50 text-red-700 rounded-lg'>
          <h2 className='text-xl font-bold mb-2'>Error de Clave de API</h2>
          <p>La clave de API no parece ser válida.</p>
          <p className='text-sm mt-2'>Por favor, verifica:</p>
          <ul className='text-sm mt-2 text-left list-disc list-inside'>
            <li>La clave de API comienza con "AIza"</li>
            <li>La clave de API está correctamente copiada sin espacios extra</li>
            <li>La clave de API está activa en la Google Cloud Console</li>
            <li>La API de Maps JavaScript está habilitada en tu proyecto</li>
            <li>Las restricciones de la API key incluyen tu dominio</li>
            <li>La facturación está habilitada en tu proyecto de Google Cloud</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-[calc(100vh-70px)] relative'>
      <APIProvider apiKey={apiKey}>
        <Map
          id='km0-map'
          mapId={mapId}
          defaultCenter={defaultCenter}
          defaultZoom={12}
          gestureHandling='greedy'
          disableDefaultUI={false}
          colorScheme={themeMode === 'dark' ? ColorScheme.DARK : ColorScheme.LIGHT}
          className='w-full h-full'
          reuseMaps={true}
        >
          <Markers onMarkerClick={setSelectedId} />
          {selectedMarker && (
            <InfoWindow
              headerContent={
                <p className='font-bold text-black text-md'>{selectedMarker.nombre}</p>
              }
              position={selectedMarker.position}
              onCloseClick={() => setSelectedId(null)}
              pixelOffset={[0, -45]}
            >
              <div>
                <p className='text-md text-black'>{selectedMarker.descripcion}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default GoogleMapsPage;
