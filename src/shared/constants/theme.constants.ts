/**
 * Constantes relacionadas con el tema de la aplicación
 */

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;

export const THEME_COLORS = {
  DEFAULT: 'default',
  RED: 'red',
  ROSE: 'rose',
  GREEN: 'green',
  BLUE: 'blue',
  YELLOW: 'yellow',
  PURPLE: 'purple'
} as const;

export const THEME_STORAGE_KEYS = {
  MODE: 'theme-mode',
  COLOR: 'theme-color'
} as const;

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];
export type ThemeColor = (typeof THEME_COLORS)[keyof typeof THEME_COLORS];
