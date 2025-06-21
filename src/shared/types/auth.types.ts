/**
 * Tipos relacionados con la autenticación
 * 
 * Este archivo define todas las interfaces y tipos relacionados con el sistema
 * de autenticación de la aplicación, incluyendo usuarios, perfiles y credenciales.
 * 
 * @example
 * ```tsx
 * // Uso de tipos en componentes
 * import type { User, LoginCredentials } from '@types';
 * 
 * function LoginForm() {
 *   const [credentials, setCredentials] = useState<LoginCredentials>({
 *     email: '',
 *     password: ''
 *   });
 * 
 *   const handleLogin = (user: User) => {
 *     console.log('Usuario autenticado:', user.name);
 *   };
 * }
 * 
 * // Uso en contextos
 * interface AuthContextType {
 *   user: User | null;
 *   login: (credentials: LoginCredentials) => Promise<void>;
 *   register: (data: RegisterCredentials) => Promise<void>;
 * }
 * ```
 */

/**
 * Tipos de usuario disponibles
 */
export type UserType = 'individual' | 'company';

/**
 * Perfil completo del usuario
 * 
 * Contiene información detallada del usuario incluyendo verificación
 * y datos específicos según el tipo de usuario.
 */
export interface UserProfile {
  /** Identificador único del perfil */
  id: string;
  /** Email del usuario */
  email: string;
  /** Nombre completo del usuario */
  name: string;
  /** Tipo de usuario (individual o empresa) */
  userType: UserType;
  /** Indica si el usuario está verificado */
  isVerified: boolean;
  /** Nivel de verificación alcanzado */
  verificationLevel: 'email' | 'phone' | 'document';
  /** Nombre de la empresa (solo para usuarios tipo company) */
  companyName?: string;
  /** URL del avatar del usuario */
  avatar?: string;
}

/**
 * Usuario autenticado
 * 
 * Representa un usuario completo con su perfil asociado.
 */
export interface User {
  /** Identificador único del usuario */
  id: string;
  /** Email del usuario */
  email: string;
  /** Nombre del usuario */
  name: string;
  /** Perfil completo del usuario */
  profile: UserProfile;
}

/**
 * Estado de autenticación
 * 
 * Representa el estado actual del sistema de autenticación.
 */
export interface AuthState {
  /** Usuario actual autenticado */
  user: User | null;
  /** Indica si hay un usuario autenticado */
  isAuthenticated: boolean;
  /** Indica si hay una operación de autenticación en progreso */
  isLoading: boolean;
}

/**
 * Credenciales para iniciar sesión
 */
export interface LoginCredentials {
  /** Email del usuario */
  email: string;
  /** Contraseña del usuario */
  password: string;
}

/**
 * Credenciales para registro
 * 
 * Incluye información adicional necesaria para crear una nueva cuenta.
 */
export interface RegisterCredentials {
  /** Nombre completo del usuario */
  name: string;
  /** Email del usuario */
  email: string;
  /** Contraseña del usuario */
  password: string;
  /** Tipo de usuario */
  userType: UserType;
  /** Nombre de la empresa (opcional, solo para usuarios tipo company) */
  companyName?: string;
}
