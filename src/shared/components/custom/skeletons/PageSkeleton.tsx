interface PageSkeletonProps {
  showHeader?: boolean;
  showSidebar?: boolean;
  contentRows?: number;
}

export function PageSkeleton({
  showHeader = true,
  showSidebar = false,
  contentRows = 3
}: PageSkeletonProps) {
  return (
    <div className='animate-pulse space-y-4 p-4'>
      {showHeader && <div className='h-8 bg-gray-200 rounded-md w-1/3' />}

      <div className={`flex gap-4 ${showSidebar ? 'grid-cols-4' : ''}`}>
        {showSidebar && (
          <div className='w-1/4 space-y-2'>
            <div className='h-4 bg-gray-200 rounded' />
            <div className='h-4 bg-gray-200 rounded' />
            <div className='h-4 bg-gray-200 rounded w-3/4' />
          </div>
        )}

        <div className='flex-1 space-y-3'>
          {Array.from({ length: contentRows }).map((_, i) => (
            <div key={i} className='space-y-2'>
              <div className='h-4 bg-gray-200 rounded' />
              <div className='h-4 bg-gray-200 rounded w-5/6' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
