/**
 * Exporta todos los componentes y hooks relacionados con la autenticación
 */

// Layouts
export * from './layouts/AuthLayout';

// Páginas
export { default as LoginPage } from './pages/login/LoginPage';
export { default as RegisterPage } from './pages/register/RegisterPage';

// Skeletons
export * from './pages/skeletons';

// Hooks
export * from './hooks/useAuthRedirect';
