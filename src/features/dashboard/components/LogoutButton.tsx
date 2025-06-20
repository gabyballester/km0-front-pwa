// import { Button } from '@/shared/components';
// import { useAuth } from '@contexts/AuthContext';
import { LogOut } from 'lucide-react';

import { Button } from '@components';

import { useAuth } from '@contexts';

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showIcon?: boolean;
  showText?: boolean;
}

export function LogoutButton({
  variant = 'outline',
  size = 'default',
  showIcon = true,
  showText = true
}: LogoutButtonProps) {
  const { logout } = useAuth();

  return (
    <Button variant={variant} size={size} onClick={logout} className='flex items-center gap-2'>
      {showIcon && <LogOut className='h-4 w-4' />}
      {showText && 'Cerrar Sesión'}
    </Button>
  );
}
