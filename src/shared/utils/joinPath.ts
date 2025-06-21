/**
 * Une partes de una ruta usando '/' (sin path.resolve)
 * 
 * IMPORTANTE: Esta utilidad es solo para el frontend. No usa módulos de Node.js
 * como 'path' que no están disponibles en el navegador.
 * 
 * @param {...string} parts - Partes de la ruta a unir
 * @returns {string} Ruta unida
 * 
 * @example
 * ```ts
 * joinPath('src', 'shared', 'utils'); // 'src/shared/utils'
 * joinPath('/src/', '/shared/', '/utils/'); // 'src/shared/utils'
 * joinPath('src', '', 'utils'); // 'src/utils'
 * ```
 */
export function joinPath(...parts: string[]): string {
  return parts
    .map((part, i) => {
      if (i === 0) return part.replace(/\/+$/, '');
      return part.replace(/^\/+|\/+$/g, '');
    })
    .filter(Boolean)
    .join('/');
} 