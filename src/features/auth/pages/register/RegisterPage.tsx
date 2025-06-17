import { usePageLoading } from '@/shared/hooks/usePageLoading';

import AuthFormSkeleton from '../skeletons/AuthFormSkeleton';

import { RegisterForm } from './components/RegisterForm';

export default function RegisterPage() {
  // Simular carga de datos
  const isLoading = false; // Aquí iría la lógica real de carga
  const showSkeleton = usePageLoading(isLoading);

  if (showSkeleton) {
    return <AuthFormSkeleton />;
  }

  return <RegisterForm />;
}
