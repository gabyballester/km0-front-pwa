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

/**
 * Constantes para claves de sessionStorage
 */
export const SESSION_KEYS = {
  APP_INITIALIZED: 'app-initialized',
  SW_RELOADED: 'sw-reloaded',
  PWA_INSTALL_MODAL_CLOSED: 'pwa-install-modal-closed'
} as const;

/**
 * Constantes para claves de localStorage
 */
export const STORAGE_KEYS = {
  PWA_UPDATE_PREFERENCES: 'pwa-update-preferences',
  PWA_INSTALL_DECLINED: 'pwa-install-declined',
  THEME_COLOR: 'themeColor',
  THEME_MODE: 'themeMode'
} as const;

/**
 * Constantes para mensajes de versión
 */
export const VERSION_MESSAGES = {
  ERROR: {
    FETCH_VERSION: 'No se pudo leer version.json:',
    LOAD_VERSION: 'Error cargando versión:',
    CONTEXT_ERROR: 'useVersion debe usarse dentro de un VersionProvider'
  },
  LOADING: {
    VERSION: 'Cargando versión...'
  },
  DISPLAY: {
    VERSION_PREFIX: 'Versión: '
  }
} as const;

/**
 * Constantes para mensajes de autenticación
 */
export const AUTH_MESSAGES = {
  DEMO: {
    USER_NAME: 'Usuario Demo'
  },
  ERROR: {
    CONTEXT_ERROR: 'useAuth must be used within an AuthProvider'
  }
} as const;

/**
 * Constantes para mensajes del contexto de tema
 */
export const THEME_MESSAGES = {
  ERROR: {
    CONTEXT_ERROR: 'useTheme must be used inside the ThemeProvider',
    THEME_NOT_FOUND: 'Theme or mode not found for color:'
  },
  LABELS: {
    CHANGE_TO_DARK: 'Cambiar a oscuro',
    CHANGE_TO_LIGHT: 'Cambiar a claro',
    THEME_COLOR: 'Color del tema:',
    THEME_MODE: 'Modo del tema:'
  }
} as const;
