/**
 * Constantes para tipos y mensajes de toast
 */

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const;

export const TOAST_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: 'Has iniciado sesión correctamente',
    LOGOUT_SUCCESS: 'Has cerrado sesión correctamente',
    LOGIN_REQUIRED: 'Debes iniciar sesión para acceder a esta página',
    INVALID_CREDENTIALS: 'Credenciales inválidas',
    REGISTER_SUCCESS: 'Registro exitoso'
  },
  GENERAL: {
    ERROR: 'Ha ocurrido un error',
    SUCCESS: 'Operación exitosa',
    WARNING: 'Advertencia',
    INFO: 'Información'
  }
} as const;
