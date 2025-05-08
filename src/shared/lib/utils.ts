import { type ClassValue, clsx } from 'clsx';
import type { IconOptions, MarkerCluster } from 'leaflet';
import { DivIcon, Icon, point } from 'leaflet';
import { twMerge } from 'tailwind-merge';

import { markerIcon } from '@/assets/png';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export interface CustomIconOptions extends Partial<IconOptions> {
  dimensions?: {
    width?: number;
    height?: number;
  };
}

export const createCustomIcon = (options: CustomIconOptions = {}): Icon => {
  const {
    dimensions = { width: 40, height: 40 },
    iconSize = [dimensions.width ?? 40, dimensions.height ?? 40],
    iconUrl = markerIcon,
    iconAnchor = [12, 41],
    popupAnchor = [1, -34],
    shadowUrl = 'https://example.com/marker-shadow.png',
    shadowSize = [41, 41]
  } = options;

  return new Icon({
    iconUrl,
    iconSize,
    iconAnchor,
    popupAnchor,
    shadowUrl,
    shadowSize,
    ...options
  });
};

export const createCustomClusterIcon = (cluster: MarkerCluster) => {
  const count = cluster.getChildCount();

  return new DivIcon({
    html: `<div class="cluster-icon">${count}</div>`,
    className: 'custom-marker-cluster',
    iconSize: point(40, 40, true)
  });
};

export const createClusterIcon = (cluster: MarkerCluster) => {
  const count = cluster.getChildCount();
  return new DivIcon({
    html: `<div class="cluster-inner">${count}</div>`,
    className: `custom-cluster cluster-${count}`,
    iconSize: point(40 + count * 2, 40 + count * 2, true)
  });
};
