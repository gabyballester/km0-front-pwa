import { PageSkeleton } from '@/shared/components';

function AboutPageSkeleton() {
  return (
    <div className='container mx-auto p-4'>
      <PageSkeleton showHeader={true} showSidebar={false} contentRows={4} />
    </div>
  );
}

export default AboutPageSkeleton;
