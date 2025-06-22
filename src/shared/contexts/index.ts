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
 *
 * // Usar el Context Aggregator para todos los providers
 * import { AppProviders } from '@contexts';
 *
 * function App() {
 *   return (
 *     <AppProviders>
 *       <MyRoutes />
 *     </AppProviders>
 *   );
 * }
 *
 * // Importar y usar el contexto PWA
 * import { usePWAInstall, PWAInstallProvider } from '@contexts';
 * ```
 */

export * from './AppProviders';
export * from './auth-context/AuthContext';
export * from './pwa-install-context';
export * from './theme-context';
export * from './version-context';
