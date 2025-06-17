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

/**
 * Componente de formulario de registro
 *
 * @example
 * ```tsx
 * <RegisterForm />
 * ```
 */
export function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  const { showError } = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Usuario Demo',
    email: 'adsf@asfd.es',
    password: 'asdf',
    confirmPassword: 'asdf'
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

    if (formData.password !== formData.confirmPassword) {
      showError(t('auth.passwordMismatch'));
      setIsLoading(false);
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
    } catch (error) {
      console.error('Registration error:', error);
      //todo: aplicar un logger para ver por qué falló
      showError(t('auth.registerError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-sm mx-auto'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl text-center'>{t('auth.register')}</CardTitle>
        <CardDescription className='text-center'>{t('auth.registerDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>{t('auth.name')}</Label>
            <Input
              id='name'
              name='name'
              type='text'
              autoComplete='name'
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={t('auth.namePlaceholder')}
              disabled={isLoading}
            />
          </div>
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
              autoComplete='new-password'
              required
              value={formData.password}
              onChange={handleChange}
              placeholder={t('auth.passwordPlaceholder')}
              disabled={isLoading}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>{t('auth.confirmPassword')}</Label>
            <Input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              autoComplete='new-password'
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t('auth.confirmPasswordPlaceholder')}
              disabled={isLoading}
            />
          </div>
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {isLoading ? t('auth.registering') : t('auth.registerButton')}
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex flex-col space-y-4'>
        <div className='text-sm text-muted-foreground text-center'>
          {t('auth.haveAccount')}{' '}
          <Button
            variant='link'
            className='px-0 font-normal'
            onClick={() =>
              navigate(PATHS.LOGIN, {
                state: location.state,
                replace: true
              })
            }
          >
            {t('auth.loginHere')}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
