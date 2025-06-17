import type { ReactNode } from 'react';

/**
 * Tipos de rutas en la aplicación
 * - public: Accesibles sin autenticación
 * - auth: Solo accesibles si NO está autenticado (login, register)
 * - protected: Solo accesibles si está autenticado
 */
export type RouteType = 'public' | 'auth' | 'protected';

/**
 * Configuración de una ruta
 */
export interface RouteConfig {
  /** Ruta relativa */
  path: string;
  /** Tipo de ruta */
  type: RouteType;
  /** Componente a renderizar */
  element: ReactNode;
  /** Rutas hijas (opcional) */
  children?: RouteConfig[];
  /** Título de la página (opcional) */
  title?: string;
  /** Descripción de la página (opcional) */
  description?: string;
  /** Layout específico para esta ruta (opcional) */
  layout?: ReactNode;
  /** Indica si esta ruta es un layout (no renderiza contenido directo) */
  isLayout?: boolean;
  /** Indica si esta ruta debe ser index (ruta por defecto) */
  index?: boolean;
  /** Metadatos adicionales de la ruta (opcional) */
  meta?: {
    /** Roles requeridos para acceder a esta ruta */
    roles?: string[];
    /** Permisos requeridos para acceder a esta ruta */
    permissions?: string[];
    /** Indica si la ruta debe estar oculta en la navegación */
    hidden?: boolean;
    /** Ícono para la navegación */
    icon?: ReactNode;
  };
}
