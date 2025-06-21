import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utilidades para manejo de clases CSS
 */

/**
 * Combina clases CSS de forma inteligente usando clsx y tailwind-merge
 * 
 * Esta función combina las capacidades de clsx (para manejo condicional de clases)
 * con tailwind-merge (para resolución inteligente de conflictos de Tailwind CSS).
 * 
 * @example
 * ```tsx
 * // Clases básicas
 * const className = combineClassNames(
 *   'base-class',
 *   'another-class'
 * );
 * // Resultado: "base-class another-class"
 * 
 * // Clases condicionales
 * const className = combineClassNames(
 *   'base-class',
 *   isActive && 'active',
 *   variant === 'primary' && 'text-blue-500'
 * );
 * // Resultado: "base-class active text-blue-500" (si isActive=true y variant='primary')
 * 
 * // Resolución de conflictos de Tailwind
 * const className = combineClassNames(
 *   'text-red-500',
 *   isError && 'text-red-600' // Sobrescribe text-red-500
 * );
 * // Resultado: "text-red-600" (no "text-red-500 text-red-600")
 * 
 * // Arrays y objetos
 * const className = combineClassNames(
 *   ['class1', 'class2'],
 *   { 'conditional-class': isVisible },
 *   isDisabled && 'disabled'
 * );
 * 
 * // Uso en componentes
 * function Button({ variant, size, className, ...props }) {
 *   return (
 *     <button
 *       className={combineClassNames(
 *         'base-button',
 *         variant === 'primary' && 'bg-blue-500 text-white',
 *         variant === 'secondary' && 'bg-gray-500 text-black',
 *         size === 'lg' && 'px-6 py-3',
 *         size === 'sm' && 'px-3 py-1',
 *         className // Permite override desde props
 *       )}
 *       {...props}
 *     />
 *   );
 * }
 * 
 * // Uso con estados complejos
 * function Card({ isSelected, isHovered, isDisabled, className }) {
 *   return (
 *     <div
 *       className={combineClassNames(
 *         'card-base',
 *         'p-4 rounded-lg border',
 *         isSelected && 'ring-2 ring-blue-500 bg-blue-50',
 *         isHovered && !isDisabled && 'shadow-lg transform scale-105',
 *         isDisabled && 'opacity-50 cursor-not-allowed',
 *         className
 *       )}
 *     >
 *       Contenido de la tarjeta
 *     </div>
 *   );
 * }
 * 
 * // Uso con variantes dinámicas
 * function Alert({ type, className }) {
 *   return (
 *     <div
 *       className={combineClassNames(
 *         'alert-base',
 *         'p-4 rounded-md',
 *         type === 'success' && 'bg-green-100 text-green-800 border-green-200',
 *         type === 'error' && 'bg-red-100 text-red-800 border-red-200',
 *         type === 'warning' && 'bg-yellow-100 text-yellow-800 border-yellow-200',
 *         type === 'info' && 'bg-blue-100 text-blue-800 border-blue-200',
 *         className
 *       )}
 *     >
 *       Mensaje de alerta
 *     </div>
 *   );
 * }
 * 
 * // Uso con responsive design
 * function ResponsiveComponent({ className }) {
 *   return (
 *     <div
 *       className={combineClassNames(
 *         'w-full',
 *         'sm:w-auto sm:max-w-md',
 *         'md:w-auto md:max-w-lg',
 *         'lg:w-auto lg:max-w-xl',
 *         className
 *       )}
 *     >
 *       Contenido responsivo
 *     </div>
 *   );
 * }
 * ```
 * 
 * @param inputs - Clases CSS a combinar (strings, objetos, arrays, booleanos)
 * @returns String con las clases combinadas y conflictos resueltos
 */
export function combineClassNames(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
