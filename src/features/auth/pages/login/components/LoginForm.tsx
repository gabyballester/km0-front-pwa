import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useLocation, useNavigate } from 'react-router-dom';

import { Loader2 } from 'lucide-react';

import { logger } from '@utils';

import { useToast } from '@hooks';

import { useAuth } from '@contexts';

import { PATHS } from '@paths';

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
} from '@ui';

/**
 * Componente de formulario de inicio de sesión
 * 
 * Este componente proporciona una interfaz completa para el inicio de sesión,
 * incluyendo validación de formulario, manejo de estados de carga y
 * integración con el sistema de autenticación.
 * 
 * Características:
 * - Formulario de login con email y contraseña
 * - Validación de campos requeridos
 * - Estado de carga durante la autenticación
 * - Manejo de errores con notificaciones
 * - Navegación automática tras login exitoso
 * - Redirección a página de registro
 * - Soporte para i18n
 * 
 * @example
 * ```tsx
 * // Uso básico en página de login
 * function LoginPage() {
 *   return (
 *     <div className="min-h-screen flex items-center justify-center">
 *       <LoginForm />
 *     </div>
 *   );
 * }
 * 
 * // Con layout personalizado
 * function AuthLayout() {
 *   return (
 *     <div className="grid grid-cols-1 md:grid-cols-2">
 *       <div className="bg-gradient-to-br from-blue-500 to-purple-600">
 *         <div className="p-8 text-white">
 *           <h1>Bienvenido de vuelta</h1>
 *           <p>Inicia sesión para continuar</p>
 *         </div>
 *       </div>
 *       <div className="flex items-center justify-center p-8">
 *         <LoginForm />
 *       </div>
 *     </div>
 *   );
 * }
 * 
 * // Con redirección personalizada
 * function ProtectedLoginPage() {
 *   const location = useLocation();
 *   
 *   return (
 *     <div>
 *       <h1>Acceso requerido</h1>
 *       <p>Necesitas iniciar sesión para acceder a {location.state?.from?.pathname}</p>
 *       <LoginForm />
 *     </div>
 *   );
 * }
 * ```
 */
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
    <Card className='w-full max-w-sm mx-auto border-2'>
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
