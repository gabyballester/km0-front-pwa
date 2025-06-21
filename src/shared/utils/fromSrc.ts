/**
 * Devuelve una ruta relativa desde 'src/'
 * 
 * IMPORTANTE: Esta utilidad es solo para el frontend. No usa módulos de Node.js
 * como 'path' que no están disponibles en el navegador.
 * 
 * @param {string} relativePath - Ruta relativa desde src/
 * @returns {string} Ruta completa desde src/
 * 
 * @example
 * ```ts
 * fromSrc('shared/utils'); // 'src/shared/utils'
 * fromSrc('components/Button'); // 'src/components/Button'
 * ```
 */
import { joinPath } from './joinPath';

export function fromSrc(relativePath: string): string {
  return joinPath('src', relativePath);
} 