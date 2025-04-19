import { Button, Card } from '@/shared/components';

const LandingPage = () => {
  return (
    <div className='space-y-8 text-center'>
      <h1 className='text-4xl font-bold tracking-tight lg:text-5xl'>
        Bienvenido a nuestra plataforma
      </h1>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <Card className='p-6'>
          <h2 className='mb-2 text-xl font-semibold'>Característica 1</h2>
          <p className='text-muted-foreground'>Descripción breve de la característica principal</p>
        </Card>

        <Card className='p-6'>
          <h2 className='mb-2 text-xl font-semibold'>Característica 2</h2>
          <p className='text-muted-foreground'>Beneficio clave de la plataforma</p>
        </Card>

        <Card className='p-6'>
          <h2 className='mb-2 text-xl font-semibold'>Característica 3</h2>
          <p className='text-muted-foreground'>Ventaja competitiva destacada</p>
        </Card>
      </div>
      <Button>Botón primario</Button>
    </div>
  );
};

export default LandingPage;
