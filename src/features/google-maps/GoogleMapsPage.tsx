import type { MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const GoogleMapsPage = () => {
  const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
  const defaultCenter = { lat: 40.416775, lng: -3.70379 };

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
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-[calc(100vh-70px)] z-0'>
      <APIProvider apiKey={apiKey}>
        <Map
          id='km0-map'
          mapId='f139b71987a5806f525f29f4'
          defaultCenter={defaultCenter}
          defaultZoom={12}
          gestureHandling='greedy'
          disableDefaultUI={false}
          className='w-full h-full'
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            // eslint-disable-next-line no-console
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          }
        />
      </APIProvider>
    </div>
  );
};

export default GoogleMapsPage;
