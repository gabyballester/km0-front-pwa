import type { User } from '@/shared/types/auth.types';

/**
 * Crea un usuario mock con los datos proporcionados
 *
 * @param email - Email del usuario
 * @param name - Nombre del usuario
 * @returns Usuario mock con datos básicos
 */
export const createMockUser = (email: string, name: string): User => ({
  id: '1',
  email,
  name,
  profile: {
    id: '1',
    email,
    name,
    userType: 'individual',
    isVerified: true,
    verificationLevel: 'email'
  }
});

/**
 * Simula una llamada a la API con un delay
 *
 * @param data - Datos a devolver
 * @param delay - Tiempo de espera en ms
 * @returns Promise con los datos
 */
export const mockAuthApiCall = <T>(data?: T, delay = 1000): Promise<T | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delay);
  });
};
