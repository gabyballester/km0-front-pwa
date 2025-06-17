import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { PATHS } from '@/router/paths.router';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label
} from '@/shared/components/ui';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useToast } from '@/shared/hooks/useToast';
import { logger } from '@/shared/utils/logger';

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showError } = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: 'adsf@asfd.es',
    password: 'asdf'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      logger.error('Error en login:', error);
      showError(t('auth.loginError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-sm mx-auto'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl text-center'>{t('auth.login')}</CardTitle>
        <CardDescription className='text-center'>{t('auth.loginCredentials')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>{t('auth.email')}</Label>
            <Input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              value={formData.email}
              onChange={handleChange}
              placeholder={t('auth.emailPlaceholder')}
              disabled={isLoading}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>{t('auth.password')}</Label>
            <Input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
              value={formData.password}
              onChange={handleChange}
              placeholder={t('auth.passwordPlaceholder')}
              disabled={isLoading}
            />
          </div>
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {isLoading ? t('auth.loggingIn') : t('auth.loginButton')}
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex flex-col space-y-4'>
        <div className='text-sm text-muted-foreground text-center'>
          {t('auth.noAccount')}{' '}
          <Button
            variant='link'
            className='px-0 font-normal'
            onClick={() =>
              navigate(PATHS.REGISTER, {
                state: location.state,
                replace: true
              })
            }
          >
            {t('auth.registerHere')}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
