import { Building2, LogOut, Settings, Shield, User as UserIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu';
import type { User } from '@/shared/types/auth.types';

interface UserAvatarProps {
  user: User | null;
  size?: 'sm' | 'md' | 'lg';
}

export function UserAvatar({ user, size = 'md' }: UserAvatarProps) {
  if (!user) return null;

  const profile = user.profile;
  const userTypeInfo = {
    individual: {
      icon: <UserIcon className='w-3 h-3' />,
      label: 'Persona Física'
    },
    company: {
      icon: <Building2 className='w-3 h-3' />,
      label: 'Empresa'
    }
  }[profile.userType];

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className={sizeClasses[size]}>
            {profile.avatar && <AvatarImage src={profile.avatar} alt={profile.name} />}
            <AvatarFallback>
              {profile.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-72' align='end' forceMount>
        {/* Información del usuario */}
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-2'>
            <div className='flex items-center gap-2'>
              <p className='text-sm font-medium leading-none'>{profile.name}</p>
              <div className='flex items-center gap-1'>
                {userTypeInfo.icon}
                <span className='text-xs text-muted-foreground'>{userTypeInfo.label}</span>
              </div>
            </div>

            <p className='text-xs leading-none text-muted-foreground'>{profile.email}</p>

            {profile.companyName && (
              <p className='text-xs leading-none text-muted-foreground'>{profile.companyName}</p>
            )}

            {/* Estado de verificación */}
            {profile.isVerified && (
              <Badge
                variant='outline'
                className='text-xs bg-green-50 text-green-700 border-green-200'
              >
                <Shield className='w-3 h-3 mr-1' />
                Verificado
              </Badge>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Acciones */}
        <DropdownMenuItem>
          <Settings className='w-4 h-4 mr-2' />
          <span>Configuración</span>
        </DropdownMenuItem>

        <DropdownMenuItem className='text-red-600'>
          <LogOut className='w-4 h-4 mr-2' />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
