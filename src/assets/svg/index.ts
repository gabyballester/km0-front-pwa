/**
 * Barrel de assets SVG
 *
 * Exporta todos los archivos SVG de la aplicación para facilitar imports centralizados.
 *
 * @example
 * ```tsx
 * import { favicon, esFlag, gbFlag } from '@assets/svg';
 *
 * <img src={esFlag} alt="Bandera española" />
 * ```
 */
export { default as favicon } from './favicon.svg';
export { default as esFlag } from './flags/es.svg';
export { default as gbFlag } from './flags/gb.svg';
