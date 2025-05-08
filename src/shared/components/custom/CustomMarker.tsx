import type { Icon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

import type { MarkerInterface } from '@/shared/types/map.types';

interface CustomMarkerProps {
  marker: MarkerInterface;
  icon: Icon;
}

export const CustomMarker = ({ marker, icon }: CustomMarkerProps) => (
  <Marker position={marker.geocode} icon={icon}>
    <Popup>{marker.popUp}</Popup>
  </Marker>
);
