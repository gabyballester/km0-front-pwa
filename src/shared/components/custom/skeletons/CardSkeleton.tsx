interface CardSkeletonProps {
  showImage?: boolean;
  showHeader?: boolean;
  showContent?: boolean;
  contentLines?: number;
}

export function CardSkeleton({
  showImage = true,
  showHeader = true,
  showContent = true,
  contentLines = 2
}: CardSkeletonProps) {
  return (
    <div className='border rounded-lg p-4 space-y-3 animate-pulse'>
      {showImage && <div className='h-48 bg-gray-200 rounded-md' />}

      {showHeader && (
        <div className='space-y-2'>
          <div className='h-6 bg-gray-200 rounded w-3/4' />
          <div className='h-4 bg-gray-200 rounded w-1/2' />
        </div>
      )}

      {showContent && (
        <div className='space-y-2'>
          {Array.from({ length: contentLines }).map((_, i) => (
            <div key={i} className='h-4 bg-gray-200 rounded' />
          ))}
          <div className='h-4 bg-gray-200 rounded w-2/3' />
        </div>
      )}
    </div>
  );
}
