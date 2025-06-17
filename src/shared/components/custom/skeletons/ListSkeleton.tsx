interface ListSkeletonProps {
  items?: number;
  showAvatar?: boolean;
  showSecondaryText?: boolean;
  showActions?: boolean;
}

export function ListSkeleton({
  items = 5,
  showAvatar = true,
  showSecondaryText = true,
  showActions = false
}: ListSkeletonProps) {
  return (
    <div className='space-y-3'>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className='flex items-center space-x-3 p-3 animate-pulse'>
          {showAvatar && <div className='w-10 h-10 bg-gray-200 rounded-full flex-shrink-0' />}

          <div className='flex-1 space-y-2'>
            <div className='h-4 bg-gray-200 rounded w-3/4' />
            {showSecondaryText && <div className='h-3 bg-gray-200 rounded w-1/2' />}
          </div>

          {showActions && (
            <div className='flex space-x-2'>
              <div className='w-8 h-8 bg-gray-200 rounded' />
              <div className='w-8 h-8 bg-gray-200 rounded' />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
