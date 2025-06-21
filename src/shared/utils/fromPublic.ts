/**
 * Devuelve una ruta relativa desde 'public/'
 * 
 * IMPORTANTE: Esta utilidad es solo para el frontend. No usa módulos de Node.js
 * como 'path' que no están disponibles en el navegador.
 * 
 * @param {string} relativePath - Ruta relativa desde public/
 * @returns {string} Ruta completa desde public/
 * 
 * @example
 * ```ts
 * fromPublic('images/logo.png'); // 'public/images/logo.png'
 * fromPublic('favicon.ico'); // 'public/favicon.ico'
 * ```
 */
import { joinPath } from './joinPath';

export function fromPublic(relativePath: string): string {
  return joinPath('public', relativePath);
} 