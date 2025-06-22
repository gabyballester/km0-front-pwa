import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useLocation, useNavigate } from 'react-router-dom';

import { LogIn, Shield, UserPlus } from 'lucide-react';

import { useToast } from '@hooks';

import { AUTH_MESSAGES, AUTH_STORAGE_KEYS, EXPIRATION_TIMES } from '@constants';

import { PATHS } from '@paths';

import type { User } from '@types';

import { Button, Modal } from '@ui';

import { createMockUser } from './auth.mock';

/**
 * Interfaz del contexto de autenticación
 */
interface AuthContextType {
  /** Usuario actual autenticado */
  user: User | null;
  /** Indica si el usuario está autenticado */
  isAuthenticated: boolean;
  /** Indica si hay una operación de autenticación en progreso */
  isLoading: boolean;
  /** Función para iniciar sesión */
  login: (email: string, password: string) => Promise<void>;
  /** Función para registrar un nuevo usuario */
  register: (name: string, email: string, password: string) => Promise<void>;
  /** Función para cerrar sesión */
  logout: () => void;
  /** Función para mostrar modal de autenticación */
  showAuthModal: (options?: AuthModalOptions) => void;
  /** Indica si hubo un logout reciente */
  isRecentLogout: boolean;
}

/**
 * Opciones para el modal de autenticación
 */
interface AuthModalOptions {
  /** Título del modal */
  title?: string;
  /** Descripción del modal */
  description?: string;
  /** Icono del modal */
  icon?: React.ReactNode;
  /** Función a ejecutar al cancelar */
  onCancel?: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook para manejar estados de autenticación y operaciones de usuario
 *
 * Proporciona funcionalidades completas de autenticación incluyendo login, registro,
 * logout, persistencia de sesión y modal de autenticación.
 *
 * @example
 * ```tsx
 * // Uso básico en componente
 * function MyComponent() {
 *   const { user, isLoading, login, logout } = useAuth();
 *
 *   if (isLoading) return <Loader />;
 *   if (!user) return <LoginForm onLogin={login} />;
 *
 *   return (
 *     <div>
 *       <p>Bienvenido, {user.name}!</p>
 *       <Button onClick={logout}>Cerrar sesión</Button>
 *     </div>
 *   );
 * }
 *
 * // Uso con modal de autenticación
 * function ProtectedComponent() {
 *   const { user, showAuthModal } = useAuth();
 *
 *   const handleProtectedAction = () => {
 *     if (!user) {
 *       showAuthModal({
 *         title: "Acceso requerido",
 *         description: "Necesitas iniciar sesión para continuar"
 *       });
 *       return;
 *     }
 *     // Realizar acción protegida
 *   };
 *
 *   return <Button onClick={handleProtectedAction}>Acción protegida</Button>;
 * }
 *
 * // Uso con redirección
 * function LoginPage() {
 *   const { login, isLoading } = useAuth();
 *
 *   const handleSubmit = async (email: string, password: string) => {
 *     try {
 *       await login(email, password);
 *       // Redirección automática al dashboard
 *     } catch (error) {
 *       // Error manejado por el contexto
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <Input disabled={isLoading} />
 *       <Button disabled={isLoading}>
 *         {isLoading && <Loader size="sm" />}
 *         Iniciar sesión
 *       </Button>
 *     </form>
 *   );
 * }
 * ```
 *
 * @returns Objeto con estado de autenticación y métodos
 * @throws Error si se usa fuera de AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Props del AuthProvider
 */
interface AuthProviderProps {
  /** Componentes hijos */
  children: ReactNode;
}

/**
 * Provider del contexto de autenticación
 *
 * Este componente proporciona funcionalidad de autenticación para toda la aplicación,
 * incluyendo login, registro, logout, persistencia de sesión y modal de autenticación.
 *
 * Características:
 * - Gestión de estado de usuario
 * - Persistencia en localStorage
 * - Modal de autenticación integrado
 * - Redirección automática
 * - Notificaciones de toast
 * - Detección de logout reciente
 *
 * @example
 * ```tsx
 * // Uso básico en el punto de entrada de la aplicación
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <Router>
 *         <Routes>
 *           <Route path="/" element={<HomePage />} />
 *           <Route path="/login" element={<LoginPage />} />
 *         </Routes>
 *       </Router>
 *     </AuthProvider>
 *   );
 * }
 *
 * // Con otros providers
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <AuthProvider>
 *         <Router>
 *           <AppContent />
 *         </Router>
 *       </AuthProvider>
 *     </ThemeProvider>
 *   );
 * }
 *
 * // Con configuración personalizada
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <ThemeProvider>
 *         <ToastProvider>
 *           <Router>
 *             <AppLayout>
 *               <Routes>
 *                 <Route path="/" element={<HomePage />} />
 *                 <Route path="/dashboard" element={<DashboardPage />} />
 *               </Routes>
 *             </AppLayout>
 *           </Router>
 *         </ToastProvider>
 *       </ThemeProvider>
 *     </AuthProvider>
 *   );
 * }
 * ```
 */
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
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
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

      const mockUser = createMockUser(email, AUTH_MESSAGES.DEMO.USER_NAME);

      localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(mockUser));
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

      localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(mockUser));
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
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
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
        onCloseOutside={() => {
          // Si hay función de cancelación, ejecutarla
          if (onCancel) {
            onCancel();
          }
          setAuthModalOpen(false);
        }}
        onCloseEscape={() => {
          // Si hay función de cancelación, ejecutarla
          if (onCancel) {
            onCancel();
          }
          setAuthModalOpen(false);
        }}
        title={title}
        description={description}
        size='sm'
      >
        {authContent}
      </Modal>
    </AuthContext.Provider>
  );
}
