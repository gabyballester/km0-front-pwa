import React, { createContext, useContext, useEffect, useState } from 'react';

import { logger } from '@utils';

import { themes } from './themes';

/**
 * Tipos de colores de tema disponibles
 */
export type ThemeColor =
  | 'slate'
  | 'red'
  | 'rose'
  | 'orange'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'violet';

/**
 * Tipos de modo de tema disponibles
 */
type ThemeMode = 'light' | 'dark';

/**
 * Interfaz del contexto de tema
 */
interface ThemeContextType {
  /** Color actual del tema */
  themeColor: ThemeColor;
  /** Función para cambiar el color del tema */
  setThemeColor: (color: ThemeColor) => void;
  /** Modo actual del tema (claro/oscuro) */
  themeMode: ThemeMode;
  /** Función para cambiar el modo del tema */
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

/**
 * Provider del contexto de tema
 * 
 * Este componente proporciona funcionalidad de tema para toda la aplicación,
 * incluyendo cambio de colores y modo claro/oscuro. Los valores se persisten
 * en localStorage y se aplican automáticamente al DOM.
 * 
 * @example
 * ```tsx
 * // Uso básico en el punto de entrada de la aplicación
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <Router>
 *         <Routes>
 *           <Route path="/" element={<HomePage />} />
 *         </Routes>
 *       </Router>
 *     </ThemeProvider>
 *   );
 * }
 * 
 * // Con otros providers
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <AuthProvider>
 *         <Router>
 *           <AppContent />
 *         </Router>
 *       </AuthProvider>
 *     </ThemeProvider>
 *   );
 * }
 * 
 * // Uso en componentes
 * function ThemeToggle() {
 *   const { themeMode, setThemeMode, themeColor, setThemeColor } = useTheme();
 * 
 *   return (
 *     <div>
 *       <button onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}>
 *         {themeMode === 'light' ? '🌙' : '☀️'}
 *       </button>
 *       <select value={themeColor} onChange={(e) => setThemeColor(e.target.value as ThemeColor)}>
 *         <option value="slate">Slate</option>
 *         <option value="blue">Blue</option>
 *         <option value="green">Green</option>
 *       </select>
 *     </div>
 *   );
 * }
 * ```
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    return (localStorage.getItem('themeColor') as ThemeColor) || 'slate';
  });
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem('themeMode') as ThemeMode) || 'light';
  });

  useEffect(() => {
    const savedColor = (localStorage.getItem('themeColor') as ThemeColor) || 'slate';
    const savedMode = (localStorage.getItem('themeMode') as ThemeMode) || 'light';

    setThemeColor(savedColor);
    setThemeMode(savedMode);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    applyColorTheme(themeColor, themeMode);

    localStorage.setItem('themeColor', themeColor);
    localStorage.setItem('themeMode', themeMode);
  }, [themeColor, themeMode]);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook para usar el contexto de tema
 * 
 * Este hook proporciona acceso al contexto de tema y debe ser usado
 * dentro de un componente envuelto por ThemeProvider.
 * 
 * @returns Objeto con el estado del tema y funciones para cambiarlo
 * @throws Error si se usa fuera de ThemeProvider
 * 
 * @example
 * ```tsx
 * // Uso básico
 * function MyComponent() {
 *   const { themeColor, themeMode, setThemeColor, setThemeMode } = useTheme();
 * 
 *   return (
 *     <div>
 *       <p>Color actual: {themeColor}</p>
 *       <p>Modo actual: {themeMode}</p>
 *       <button onClick={() => setThemeColor('blue')}>
 *         Cambiar a azul
 *       </button>
 *       <button onClick={() => setThemeMode('dark')}>
 *         Modo oscuro
 *       </button>
 *     </div>
 *   );
 * }
 * 
 * // En un componente de configuración
 * function ThemeSettings() {
 *   const { themeColor, themeMode, setThemeColor, setThemeMode } = useTheme();
 * 
 *   const availableColors: ThemeColor[] = ['slate', 'red', 'rose', 'orange', 'blue', 'green', 'yellow', 'violet'];
 * 
 *   return (
 *     <div className="space-y-4">
 *       <div>
 *         <label>Color del tema:</label>
 *         <select value={themeColor} onChange={(e) => setThemeColor(e.target.value as ThemeColor)}>
 *           {availableColors.map(color => (
 *             <option key={color} value={color}>
 *               {color.charAt(0).toUpperCase() + color.slice(1)}
 *             </option>
 *           ))}
 *         </select>
 *       </div>
 *       <div>
 *         <label>Modo del tema:</label>
 *         <button onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}>
 *           {themeMode === 'light' ? 'Cambiar a oscuro' : 'Cambiar a claro'}
 *         </button>
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside the ThemeProvider');
  }
  return context;
};

/**
 * Aplica el tema de color al DOM
 * 
 * @param color - Color del tema a aplicar
 * @param mode - Modo del tema (claro/oscuro)
 */
const applyColorTheme = (color: ThemeColor, mode: ThemeMode) => {
  const theme = themes[color]?.[mode];
  if (!theme) {
    logger.error(`Theme or mode not found for color: ${color}, mode: ${mode}`);
    return;
  }

  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
};
