/**
 * Utilidades para manipulación de strings
 * 
 * Este módulo proporciona funciones auxiliares para el manejo
 * y transformación de cadenas de texto.
 * 
 * @example
 * ```tsx
 * import { capitalize } from '@utils';
 * 
 * // Capitalizar nombres
 * const userName = capitalize('john doe'); // "John doe"
 * 
 * // En un componente
 * function UserProfile({ name }) {
 *   return (
 *     <div>
 *       <h1>{capitalize(name)}</h1>
 *     </div>
 *   );
 * }
 * ```
 */

/**
 * Capitaliza la primera letra de una cadena
 * 
 * @param str - La cadena a capitalizar
 * @returns La cadena con la primera letra en mayúscula
 * 
 * @example
 * ```tsx
 * // Uso básico
 * capitalize('hello world'); // "Hello world"
 * capitalize('javascript'); // "Javascript"
 * capitalize(''); // ""
 * 
 * // En un formulario
 * function NameInput({ value, onChange }) {
 *   const handleChange = (e) => {
 *     const capitalized = capitalize(e.target.value);
 *     onChange(capitalized);
 *   };
 * 
 *   return (
 *     <input 
 *       value={value} 
 *       onChange={handleChange}
 *       placeholder="Ingresa tu nombre"
 *     />
 *   );
 * }
 * 
 * // En una lista de usuarios
 * function UserList({ users }) {
 *   return (
 *     <ul>
 *       {users.map(user => (
 *         <li key={user.id}>
 *           {capitalize(user.name)}
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
