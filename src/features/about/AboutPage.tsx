import { usePageLoading } from '@hooks';

import { Card } from '@ui';

import AboutPageSkeleton from './pages/skeletons/AboutPageSkeleton';

const AboutPage = () => {
  // Simular carga de datos
  const isLoading = false; // Aquí iría la lógica real de carga
  const showSkeleton = usePageLoading(isLoading);

  if (showSkeleton) {
    return <AboutPageSkeleton />;
  }

  return (
    <div className='mx-auto max-w-3xl space-y-6'>
      <h1 className='text-3xl font-bold'>Sobre Nosotros</h1>

      <Card className='p-6'>
        <h2 className='mb-4 text-xl font-semibold'>Nuestra Misión</h2>
        <p className='text-muted-foreground'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </Card>

      <Card className='p-6'>
        <h2 className='mb-4 text-xl font-semibold'>El Equipo</h2>
        <p className='text-muted-foreground'>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </Card>
    </div>
  );
};

export default AboutPage;
