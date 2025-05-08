import { GroupIcon, UngroupIcon } from 'lucide-react';
import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import { CustomMarker } from '@/shared/components/custom/CustomMarker';
import { Button } from '@/shared/components/ui/button';
import { INITIAL_CENTER, INITIAL_ZOOM, MARKERS } from '@/shared/constants/map.constants';
import { useDeviceType } from '@/shared/hooks/useDeviceType';
import { createClusterIcon, createCustomIcon } from '@/shared/lib/utils';
import type { MarkerInterface } from '@/shared/types/map.types';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  markers?: MarkerInterface[];
  className?: string;
}

export const MapComponent: FC<MapComponentProps> = ({
  markers = MARKERS,
  className = 'h-[500px]'
}) => {
  const [isClusteringEnabled, setIsClusteringEnabled] = useState(true);
  const { isMobile } = useDeviceType();
  const customIcon = createCustomIcon();

  // Optimización de rendimiento
  const renderedMarkers = useMemo(
    () =>
      markers.map((marker, index) => (
        <CustomMarker key={`marker-${index}`} marker={marker} icon={customIcon} />
      )),
    [markers, customIcon]
  );

  const ClusterToggle = () => {
    const map = useMap();
    useMapEvents({
      zoomend: () => setIsClusteringEnabled(e => e && map.getZoom() < 13)
    });
    return null;
  };

  return (
    <div className={`relative z-0 ${className}`}>
      <div className='absolute top-4 right-4 z-[401] space-y-2'>
        <Button
          onClick={() => setIsClusteringEnabled(!isClusteringEnabled)}
          variant={isClusteringEnabled ? 'default' : 'outline'}
          size='sm'
          aria-label={isClusteringEnabled ? 'Desactivar clustering' : 'Activar clustering'}
          className='shadow-lg transition-all hover:scale-105'
        >
          {isClusteringEnabled ? (
            <>
              <GroupIcon className='mr-2 h-4 w-4' />
              {!isMobile && 'Desactivar Cluster'}
            </>
          ) : (
            <>
              <UngroupIcon className='mr-2 h-4 w-4' />
              {!isMobile && 'Activar Cluster'}
            </>
          )}
        </Button>
      </div>

      <div className='h-full w-full rounded-lg border-2 border-gray-200 shadow-xl'>
        <MapContainer
          center={INITIAL_CENTER}
          zoom={INITIAL_ZOOM}
          scrollWheelZoom={true}
          className='h-full w-full'
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            detectRetina
          />

          <ClusterToggle />

          {isClusteringEnabled ? (
            <MarkerClusterGroup
              key={`cluster-${isClusteringEnabled}`}
              chunkedLoading
              maxClusterRadius={40}
              spiderfyDistanceMultiplier={1.5}
              showCoverageOnHover={false}
              zoomToBoundsOnClick
              iconCreateFunction={createClusterIcon}
            >
              {renderedMarkers}
            </MarkerClusterGroup>
          ) : (
            <div className='marker-group-transition'>{renderedMarkers}</div>
          )}
        </MapContainer>
      </div>
    </div>
  );
};
