export function MapSkeleton() {
  return (
    <div className='animate-pulse space-y-4'>
      {/* Map header */}
      <div className='h-8 bg-gray-200 rounded-md w-1/3' />

      {/* Map container */}
      <div className='relative bg-gray-200 rounded-lg overflow-hidden' style={{ height: '400px' }}>
        {/* Map placeholder */}
        <div className='absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400' />

        {/* Loading pins simulation */}
        <div className='absolute top-1/4 left-1/3 w-4 h-4 bg-gray-500 rounded-full' />
        <div className='absolute top-1/2 right-1/3 w-4 h-4 bg-gray-500 rounded-full' />
        <div className='absolute bottom-1/3 left-1/2 w-4 h-4 bg-gray-500 rounded-full' />

        {/* Loading text */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-gray-600 text-lg font-medium'>Cargando mapa...</div>
        </div>
      </div>

      {/* Map controls simulation */}
      <div className='flex justify-between items-center'>
        <div className='h-6 bg-gray-200 rounded w-24' />
        <div className='h-6 bg-gray-200 rounded w-32' />
      </div>
    </div>
  );
}
