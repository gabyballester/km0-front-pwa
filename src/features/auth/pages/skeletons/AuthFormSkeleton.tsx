function AuthFormSkeleton() {
  return (
    <div className='w-full space-y-6'>
      {/* Header skeleton */}
      <div className='space-y-2 text-center'>
        <div className='h-7 bg-gray-200 rounded w-1/2 mx-auto animate-pulse' />
        <div className='h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse' />
      </div>

      {/* Form card skeleton */}
      <div className='bg-card rounded-lg border p-6 shadow-sm space-y-4'>
        {/* Form fields skeleton */}
        <div className='space-y-4'>
          <div className='space-y-2'>
            <div className='h-4 bg-gray-200 rounded w-1/4 animate-pulse' />
            <div className='h-10 bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='space-y-2'>
            <div className='h-4 bg-gray-200 rounded w-1/3 animate-pulse' />
            <div className='h-10 bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='space-y-2'>
            <div className='h-4 bg-gray-200 rounded w-1/4 animate-pulse' />
            <div className='h-10 bg-gray-200 rounded animate-pulse' />
          </div>
        </div>

        {/* Submit button skeleton */}
        <div className='h-10 bg-gray-200 rounded animate-pulse' />

        {/* Footer link skeleton */}
        <div className='flex justify-center space-x-1'>
          <div className='h-4 bg-gray-200 rounded w-32 animate-pulse' />
          <div className='h-4 bg-gray-200 rounded w-20 animate-pulse' />
        </div>
      </div>
    </div>
  );
}

export default AuthFormSkeleton;
