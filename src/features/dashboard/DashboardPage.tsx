import { useTranslation } from 'react-i18next';

import { BarChart3, Package, ShoppingCart, Store, TrendingUp } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, ContentLoader } from '@components';

import { useAuth } from '@contexts';

import { LogoutButton } from './components/LogoutButton';
import DashboardPageSkeleton from './pages/skeletons/DashboardPageSkeleton';

/**
 * DashboardPage Component
 * 
 * This component displays the main dashboard for authenticated users.
 * It shows various statistics and action cards for buyers and sellers.
 * 
 * Features:
 * - Displays user statistics (sales, purchases, orders, performance)
 * - Provides action cards for buyer and seller functionalities
 * - Shows logout button
 * - Handles loading states with skeleton
 * 
 * Usage:
 * ```tsx
 * <DashboardPage />
 * ```
 */
export default function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const isLoading = !user;

  return (
    <ContentLoader
      isLoading={isLoading}
      skeleton={<DashboardPageSkeleton />}
      loadingOptions={{ delay: 200, minLoadingTime: 500 }}
    >
      {!user ? null : (
        <div className='container mx-auto p-6 space-y-6'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>{t('dashboard.title')}</h1>
            <LogoutButton />
          </div>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{t('dashboard.stats.totalSales')}</CardTitle>
                <Store className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>0</div>
                <p className='text-xs text-muted-foreground'>{t('dashboard.stats.sinceLastMonth')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{t('dashboard.stats.totalPurchases')}</CardTitle>
                <ShoppingCart className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>0</div>
                <p className='text-xs text-muted-foreground'>{t('dashboard.stats.sinceLastMonth')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{t('dashboard.stats.activeOrders')}</CardTitle>
                <Package className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>0</div>
                <p className='text-xs text-muted-foreground'>{t('dashboard.stats.pending')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{t('dashboard.stats.performance')}</CardTitle>
                <TrendingUp className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>0%</div>
                <p className='text-xs text-muted-foreground'>{t('dashboard.stats.sinceLastMonth')}</p>
              </CardContent>
            </Card>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <ShoppingCart className='w-5 h-5' />
                  {t('dashboard.actions.buyer.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <button
                  className='w-full flex items-center justify-start px-4 py-2 text-sm rounded-lg border hover:bg-gray-50
                    transition-colors'
                >
                  <ShoppingCart className='w-4 h-4 mr-2' />
                  {t('dashboard.actions.buyer.exploreProducts')}
                </button>
                <button
                  className='w-full flex items-center justify-start px-4 py-2 text-sm rounded-lg border hover:bg-gray-50
                    transition-colors'
                >
                  <Package className='w-4 h-4 mr-2' />
                  {t('dashboard.actions.buyer.viewOrders')}
                </button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Store className='w-5 h-5' />
                  {t('dashboard.actions.seller.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-3'>
                <button
                  className='w-full flex items-center justify-start px-4 py-2 text-sm rounded-lg border hover:bg-gray-50
                    transition-colors'
                >
                  <Store className='w-4 h-4 mr-2' />
                  {t('dashboard.actions.seller.addProduct')}
                </button>
                <button
                  className='w-full flex items-center justify-start px-4 py-2 text-sm rounded-lg border hover:bg-gray-50
                    transition-colors'
                >
                  <BarChart3 className='w-4 h-4 mr-2' />
                  {t('dashboard.actions.seller.viewStats')}
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </ContentLoader>
  );
}
