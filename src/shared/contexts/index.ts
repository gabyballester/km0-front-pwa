/**
 * Exporta todos los contextos de la aplicación
 *
 * Permite importar contextos de forma centralizada y con rutas cortas.
 *
 * @example
 * ```tsx
 * // Importar y usar el contexto de autenticación
 * import { useAuth, AuthProvider } from '@contexts';
 *
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <MyRoutes />
 *     </AuthProvider>
 *   );
 * }
 *
 * // Importar y usar el contexto de tema
 * import { useTheme, ThemeProvider } from '@contexts';
 * ```
 */

export * from './auth-context/AuthContext';
export * from './theme-context';
export * from './version-context';

