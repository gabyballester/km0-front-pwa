import { MapSkeleton } from '@/shared/components';

function GoogleMapsPageSkeleton() {
  return (
    <div className='container mx-auto p-4'>
      <div className='space-y-4'>
        {/* Page title skeleton */}
        <div className='h-8 bg-gray-200 rounded-md w-1/3 animate-pulse' />

        {/* Google Maps specific skeleton */}
        <MapSkeleton />

        {/* Controls panel skeleton */}
        <div className='animate-pulse space-y-2'>
          <div className='h-4 bg-gray-200 rounded w-1/4' />
          <div className='h-4 bg-gray-200 rounded w-1/2' />
          <div className='h-4 bg-gray-200 rounded w-1/3' />
        </div>
      </div>
    </div>
  );
}

export default GoogleMapsPageSkeleton;
