import { BarChart3, Package, ShoppingCart, Store, TrendingUp } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useAuth } from '@/shared/contexts/AuthContext';
import { usePageLoading } from '@/shared/hooks/usePageLoading';

import { LogoutButton } from './components/LogoutButton';
import DashboardPageSkeleton from './pages/skeletons/DashboardPageSkeleton';

/**
 * Componente principal del dashboard
 *
 * @example
 * ```tsx
 * <DashboardPage />
 * ```
 */
export default function DashboardPage() {
  const { user } = useAuth();
  const isLoading = !user;
  const showSkeleton = usePageLoading(isLoading);

  if (showSkeleton) {
    return <DashboardPageSkeleton />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className='container mx-auto p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <LogoutButton />
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Ventas</CardTitle>
            <Store className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0</div>
            <p className='text-xs text-muted-foreground'>+0% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Compras</CardTitle>
            <ShoppingCart className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0</div>
            <p className='text-xs text-muted-foreground'>+0% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pedidos Activos</CardTitle>
            <Package className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0</div>
            <p className='text-xs text-muted-foreground'>0 pendientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Rendimiento</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>0%</div>
            <p className='text-xs text-muted-foreground'>+0% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <ShoppingCart className='w-5 h-5' />
              Acciones de Comprador
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <button
              className='w-full flex items-center justify-start px-4 py-2 text-sm rounded-lg border hover:bg-gray-50
                transition-colors'
            >
              <ShoppingCart className='w-4 h-4 mr-2' />
              Explorar Productos
            </button>
            <button
              className='w-full flex items-center justify-start px-4 py-2 text-sm rounded-lg border hover:bg-gray-50
                transition-colors'
            >
              <Package className='w-4 h-4 mr-2' />
              Ver Mis Pedidos
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Store className='w-5 h-5' />
              Acciones de Vendedor
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <button
              className='w-full flex items-center justify-start px-4 py-2 text-sm rounded-lg border hover:bg-gray-50
                transition-colors'
            >
              <Store className='w-4 h-4 mr-2' />
              Añadir Producto
            </button>
            <button
              className='w-full flex items-center justify-start px-4 py-2 text-sm rounded-lg border hover:bg-gray-50
                transition-colors'
            >
              <BarChart3 className='w-4 h-4 mr-2' />
              Ver Estadísticas
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
