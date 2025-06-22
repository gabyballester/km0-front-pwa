/**
 * Barrel export para componentes custom
 *
 * Este archivo exporta todos los componentes personalizados de la aplicación,
 * incluyendo componentes de negocio, utilidades y componentes específicos del proyecto.
 *
 * REGLAS DE EXPORTACIÓN:
 * - Usar SIEMPRE 'export * from' para evitar errores de exportación
 * - NO usar exportaciones nombradas individuales (export { Component } from './path')
 * - Los componentes default deben ser exportados como nombrados en sus archivos originales
 * - Mantener imports cortos usando alias (@custom-ui)
 * - Modal NO se exporta desde aquí, solo desde @ui
 *
 * @example
 * import { AppLoader, ContentLoader } from '@custom-ui';
 */

export * from './AppInitializer';
export * from './AppLoader';
export * from './CodeText';
export * from './ContentLoader';
export * from './error-boundary';
export * from './GlobalLayout';
export * from './LanguageSection';
export * from './pwa-install-component';
export * from './pwa-install-modal';
export * from './pwa-update-component';
export * from './SimpleBreadcrumbs';
export * from './skeletons';
export * from './Text';
export * from './ThemeAndColorToggle';
export * from './Title';
export * from './TransitionComponent';
export * from './UserAvatar';
export * from './VersionDisplay';
