import { Link, Route, Routes } from 'react-router';

import { APP_ROUTES } from './shared/constants/route.constants';
//todo: tengo 2 AppRouter.tsx
export const AppRouter = () => {
  return (
    <>
      <Menu />

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/auth/register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} /> {/* Fallback */}
      </Routes>
    </>
  );
};

function LandingPage() {
  return <h1>Bienvenido a la Landing Page</h1>;
}

function AboutPage() {
  return <h1>Sobre Nosotros</h1>;
}

function LoginPage() {
  return <h1>Iniciar Sesión</h1>;
}

function RegisterPage() {
  return <h1>Regístrate</h1>;
}

function NotFoundPage() {
  return <h1>404: Página no encontrada</h1>;
}

// Componente Menu movido al MainLayout
const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={APP_ROUTES.HOME}>Inicio</Link>
        </li>
        <li>
          <Link to={APP_ROUTES.ABOUT}>Sobre Nosotros</Link>
        </li>
        <li>
          <Link to={APP_ROUTES.LOGIN}>Iniciar Sesión</Link>
        </li>
        <li>
          <Link to={APP_ROUTES.REGISTER}>Regístrate</Link>
        </li>
      </ul>
    </nav>
  );
};
