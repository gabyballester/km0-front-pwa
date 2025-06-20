import { CardSkeleton, PageSkeleton } from '@/shared/components';

function DashboardPageSkeleton() {
  return (
    <div className='container mx-auto p-6 space-y-6'>
      {/* Header skeleton */}
      <div className='flex flex-col gap-4'>
        <div className='h-8 bg-gray-200 rounded w-1/4 animate-pulse' />
        <div className='h-4 bg-gray-200 rounded w-1/2 animate-pulse' />
      </div>

      {/* Dashboard cards grid skeleton */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <CardSkeleton showImage={false} showHeader={true} showContent={true} contentLines={1} />
        <CardSkeleton showImage={false} showHeader={true} showContent={true} contentLines={1} />
        <CardSkeleton showImage={false} showHeader={true} showContent={true} contentLines={1} />
      </div>

      {/* Additional content skeleton */}
      <div className='space-y-4'>
        <PageSkeleton showHeader={false} showSidebar={false} contentRows={2} />
      </div>
    </div>
  );
}

export default DashboardPageSkeleton;
