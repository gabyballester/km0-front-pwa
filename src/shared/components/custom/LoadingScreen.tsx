export function LoadingScreen() {
  return (
    <div className='flex h-screen items-center justify-center bg-background'>
      <div className='space-y-4 text-center'>
        {/* Spinner animado */}
        <div className='mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent' />

        {/* Texto de carga */}
        <div className='space-y-2'>
          <h2 className='text-lg font-semibold text-foreground'>Cargando...</h2>
          <p className='text-sm text-muted-foreground'>Preparando tu experiencia</p>
        </div>
      </div>
    </div>
  );
}
