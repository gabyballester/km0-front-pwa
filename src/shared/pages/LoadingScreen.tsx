import { Skeleton } from '../components/ui';

const LoadingScreen = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='space-y-4'>
        <Skeleton className='h-12 w-12 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
