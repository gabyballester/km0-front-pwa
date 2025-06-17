import { usePageLoading } from '@/shared/hooks/usePageLoading';

import AuthFormSkeleton from '../skeletons/AuthFormSkeleton';

import { LoginForm } from './components/LoginForm';

export default function LoginPage() {
  // Simular carga de datos
  const isLoading = false; // Aquí iría la lógica real de carga
  const showSkeleton = usePageLoading(isLoading);

  if (showSkeleton) {
    return <AuthFormSkeleton />;
  }

  return <LoginForm />;
}
