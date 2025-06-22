import { useTranslation } from 'react-i18next';

import { Home } from 'lucide-react';

import { Button } from '@ui';

/**
 * Página NotFoundPage
 *
 * Muestra un mensaje 404 y botones para volver atrás o ir al inicio.
 * Utiliza Button de @ui.
 *
 * @example
 * ```tsx
 * import { NotFoundPage } from '@pages';
 *
 * <Route path="*" element={<NotFoundPage />} />
 * ```
 */

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8 text-center'>
        <div>
          <h1 className='text-9xl font-bold text-gray-300'>404</h1>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>{t('notFound.subtitle')}</h2>
          <p className='mt-2 text-sm text-gray-600'>{t('notFound.description')}</p>
        </div>
        <div>
          <Button onClick={() => window.history.back()} className='mr-4' variant='outline'>
            {t('notFound.goBack')}
          </Button>
          <Button asChild>
            <a href='/'>
              <Home className='w-4 h-4 mr-2' />
              {t('notFound.backToHome')}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
