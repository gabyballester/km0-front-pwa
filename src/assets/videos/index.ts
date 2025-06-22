/**
 * Barrel de assets de video
 *
 * Exporta todos los videos de la aplicación para facilitar imports centralizados.
 *
 * @example
 * ```tsx
 * import { introVideoEN, introVideoES } from '@assets/videos';
 *
 * const video = currentLanguage === 'es' ? introVideoES : introVideoEN;
 * ```
 */
export { default as introVideoEN } from './landing/intro-en.mp4';
export { default as introVideoES } from './landing/intro-es.mp4';
