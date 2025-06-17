import { LogIn, Shield, UserPlus } from 'lucide-react';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { PATHS } from '@/router/paths.router';
import { Button } from '@/shared/components/ui/button';
import { Modal } from '@/shared/components/ui/modal';
import { EXPIRATION_TIMES, STORAGE_KEYS } from '@/shared/constants';
import { useToast } from '@/shared/hooks/useToast';
import type { User } from '@/shared/types/auth.types';

import { createMockUser } from './mock/auth.mock';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  // Auth modal helpers
  showAuthModal: (options?: AuthModalOptions) => void;
  // Logout detection
  isRecentLogout: boolean;
}

interface AuthModalOptions {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onCancel?: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecentLogout, setIsRecentLogout] = useState(false);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const logoutTimeoutRef = useRef<NodeJS.Timeout>();
  const { t } = useTranslation();

  const isAuthenticated = Boolean(user);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
      }
    };
  }, []);

  // Restaurar sesión al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string) => {
    try {
      setIsLoading(true);
      // Simular delay de red
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });

      const mockUser = createMockUser(email, 'Usuario Demo');

      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
      setUser(mockUser);
      showSuccess(t('toast.auth.loginSuccess'));

      const from = location.state?.from?.pathname || PATHS.DASHBOARD;
      navigate(from, { replace: true });
    } catch (error) {
      showError(t('toast.auth.invalidCredentials'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string) => {
    try {
      setIsLoading(true);
      // Simular delay de red
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });

      const mockUser = createMockUser(email, name);

      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
      setUser(mockUser);
      showSuccess(t('toast.auth.registerSuccess'));

      const from = location.state?.from?.pathname || PATHS.DASHBOARD;
      navigate(from, { replace: true });
    } catch (error) {
      showError(t('toast.general.error'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
    setIsRecentLogout(true);
    showSuccess(t('toast.auth.logoutSuccess'));
    logoutTimeoutRef.current = setTimeout(() => {
      setIsRecentLogout(false);
    }, EXPIRATION_TIMES.LOGOUT);
    navigate(PATHS.HOME, { replace: true });
  };

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalOptions, setAuthModalOptions] = useState<AuthModalOptions>({});

  const showAuthModal = (options: AuthModalOptions = {}) => {
    setAuthModalOptions(options);
    setAuthModalOpen(true);
  };

  const {
    title = t('auth.loginRequired'),
    description = t('auth.loginRequiredDescription'),
    icon = <Shield className='w-5 h-5 text-blue-500' />,
    onCancel
  } = authModalOptions;

  const authContent = (
    <div className='space-y-6'>
      {/* Icon and message */}
      <div className='text-center space-y-3'>
        <div className='flex justify-center'>{icon}</div>
        <p className='text-gray-600 text-sm'>{description}</p>
      </div>

      {/* Auth buttons */}
      <div className='space-y-3'>
        <Button
          onClick={() => {
            setAuthModalOpen(false);
            navigate(PATHS.LOGIN);
          }}
          className='w-full'
          size='lg'
        >
          <LogIn className='w-4 h-4 mr-2' />
          {t('auth.login')}
        </Button>

        <Button
          onClick={() => {
            setAuthModalOpen(false);
            navigate(PATHS.REGISTER);
          }}
          variant='outline'
          className='w-full'
          size='lg'
        >
          <UserPlus className='w-4 h-4 mr-2' />
          {t('auth.register')}
        </Button>
      </div>

      {/* Cancel button */}
      {onCancel && (
        <div className='text-center pt-2'>
          <Button
            onClick={() => {
              setAuthModalOpen(false);
              onCancel();
            }}
            variant='ghost'
            className='text-gray-500 hover:text-gray-700'
          >
            {t('auth.cancelAndGoBack')}
          </Button>
        </div>
      )}
    </div>
  );

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    showAuthModal,
    isRecentLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <Modal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        title={title}
        description={description}
        size='sm'
      >
        {authContent}
      </Modal>
    </AuthContext.Provider>
  );
}
