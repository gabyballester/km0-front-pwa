/**
 * Barrel export para componentes UI
 *
 * Este archivo exporta todos los componentes de interfaz de usuario
 * disponibles en la aplicación, organizados por categorías.
 *
 * REGLAS DE EXPORTACIÓN:
 * - Usar SIEMPRE 'export * from' para evitar errores de exportación
 * - NO usar exportaciones nombradas individuales (export { Component } from './path')
 * - Los componentes default deben ser exportados como nombrados en sus archivos originales
 * - Mantener imports cortos usando alias (@ui)
 *
 * Modal y todos los componentes de UI deben importarse desde @ui.
 *
 * @example
 * import { Modal, Button, Card } from '@ui';
 */

// Componentes básicos
export * from './alert';
export * from './avatar';
export * from './badge';
export * from './button';
export * from './card';
export * from './input';
export * from './label';
export * from './skeleton';

// Componentes de diálogo y modal
export * from './confirm-dialog';
export * from './dialog';
export * from './form-modal';
export * from './info-modal';
export * from './modal';

// Componentes de navegación y menú
export * from './dropdown-menu';
export * from './navigation-menu';
export * from './popover';
export * from './select';
export * from './sheet';

// Componentes de utilidad
export * from './loader';
export * from './separator';
export * from './toaster';
export * from './tooltip';
