/**
 * Tipos relacionados con la autenticación
 */

export type UserType = 'individual' | 'company';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  isVerified: boolean;
  verificationLevel: 'email' | 'phone' | 'document';
  companyName?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  profile: UserProfile;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  userType: UserType;
  companyName?: string;
}
