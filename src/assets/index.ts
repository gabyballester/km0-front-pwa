/**
 * Barrel principal de assets
 *
 * Exporta todos los assets de la aplicación desde un punto centralizado.
 * Permite imports cortos y organizados por tipo de asset.
 *
 * @example
 * ```tsx
 * // Importar desde el barrel principal
 * import { introVideoEN, esFlag, markerIcon } from '@assets';
 *
 * // O importar por tipo específico
 * import { introVideoEN, introVideoES } from '@assets/videos';
 * import { esFlag, gbFlag } from '@assets/svg';
 * import { markerIcon } from '@assets/png';
 * ```
 */

// Re-exportar todos los assets organizados por tipo
export * from './png';
export * from './svg';
export * from './videos';
