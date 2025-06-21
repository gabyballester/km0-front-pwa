/**
 * Utilidades de conversión de tipos
 * 
 * Este archivo proporciona funciones auxiliares para convertir valores
 * de un tipo a otro de manera segura y consistente.
 * 
 * @example
 * ```typescript
 * import { toInt, toBool, toStringDefault } from './convertUtils';
 * 
 * // Convertir a entero con valor por defecto
 * const port = toInt('3000', 8080);
 * 
 * // Convertir a booleano
 * const debug = toBool('true', false);
 * 
 * // Convertir a string con valor por defecto
 * const apiUrl = toStringDefault(process.env.API_URL, 'http://localhost:3000');
 * ```
 */

/**
 * Convierte un valor a entero con valor por defecto
 * 
 * @param value - Valor a convertir
 * @param defaultValue - Valor por defecto si la conversión falla
 * @param radix - Base numérica (por defecto 10)
 * @returns El valor convertido a entero o el valor por defecto
 * 
 * @example
 * ```typescript
 * const interval = toInt(import.meta.env.VITE_INTERVAL, 1000);
 * const port = toInt('8080', 3000);
 * ```
 */
export const toInt = (
  value: string | number | undefined | null,
  defaultValue: number,
  radix: number = 10
): number => {
  if (value === undefined || value === null) return defaultValue;
  
  // Si ya es un número, devolverlo
  if (typeof value === 'number') return value;
  
  // Si es string, intentar parsear
  if (typeof value === 'string') {
    const parsed = parseInt(value, radix);
    return Number.isNaN(parsed) ? defaultValue : parsed;
  }
  
  return defaultValue;
};

/**
 * Convierte un valor a booleano
 * 
 * @param value - Valor a convertir
 * @param defaultValue - Valor por defecto si la conversión falla
 * @returns El valor convertido a booleano o el valor por defecto
 * 
 * @example
 * ```typescript
 * const debug = toBool(import.meta.env.VITE_DEBUG, false);
 * const enabled = toBool('true', false);
 * ```
 */
export const toBool = (
  value: string | boolean | number | undefined | null,
  defaultValue: boolean
): boolean => {
  if (value === undefined || value === null) return defaultValue;
  
  // Si ya es booleano, devolverlo
  if (typeof value === 'boolean') return value;
  
  // Si es número, convertir
  if (typeof value === 'number') return value !== 0;
  
  // Si es string, normalizar y comparar
  if (typeof value === 'string') {
    const normalized = value.toLowerCase().trim();
    return normalized === 'true' || normalized === '1' || normalized === 'yes' || normalized === 'on';
  }
  
  return defaultValue;
};

/**
 * Convierte un valor a string con valor por defecto
 * 
 * @param value - Valor a convertir
 * @param defaultValue - Valor por defecto si la conversión falla
 * @returns El valor como string o el valor por defecto
 * 
 * @example
 * ```typescript
 * const apiUrl = toStringDefault(import.meta.env.VITE_API_URL, 'http://localhost:3000');
 * const title = toStringDefault(user.name, 'Usuario');
 * ```
 */
export const toStringDefault = (
  value: string | number | boolean | undefined | null,
  defaultValue: string
): string => {
  if (value === undefined || value === null) return defaultValue;
  
  return String(value).trim() || defaultValue;
};

/**
 * Convierte un valor a entero positivo
 * 
 * @param value - Valor a convertir
 * @param defaultValue - Valor por defecto si la conversión falla
 * @returns El valor convertido a entero positivo o el valor por defecto
 * 
 * @example
 * ```typescript
 * const timeout = toPositiveInt(import.meta.env.VITE_TIMEOUT, 5000);
 * ```
 */
export const toPositiveInt = (
  value: string | number | undefined | null,
  defaultValue: number
): number => {
  const parsed = toInt(value, defaultValue);
  return parsed > 0 ? parsed : defaultValue;
};

/**
 * Convierte un valor a entero dentro de un rango específico
 * 
 * @param value - Valor a convertir
 * @param defaultValue - Valor por defecto si la conversión falla
 * @param min - Valor mínimo permitido
 * @param max - Valor máximo permitido
 * @returns El valor validado o el valor por defecto
 * 
 * @example
 * ```typescript
 * const port = toIntRange(import.meta.env.VITE_PORT, 3000, 1024, 65535);
 * ```
 */
export const toIntRange = (
  value: string | number | undefined | null,
  defaultValue: number,
  min: number,
  max: number
): number => {
  const parsed = toInt(value, defaultValue);
  return parsed >= min && parsed <= max ? parsed : defaultValue;
};

/**
 * Convierte un valor a número decimal (float)
 * 
 * @param value - Valor a convertir
 * @param defaultValue - Valor por defecto si la conversión falla
 * @returns El valor convertido a float o el valor por defecto
 * 
 * @example
 * ```typescript
 * const ratio = toFloat(import.meta.env.VITE_RATIO, 1.0);
 * ```
 */
export const toFloat = (
  value: string | number | undefined | null,
  defaultValue: number
): number => {
  if (value === undefined || value === null) return defaultValue;
  
  // Si ya es un número, devolverlo
  if (typeof value === 'number') return value;
  
  // Si es string, intentar parsear
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? defaultValue : parsed;
  }
  
  return defaultValue;
}; 