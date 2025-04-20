import React, { createContext, useContext, useEffect, useState } from 'react';

import { themes } from './themes';

export type ThemeColor =
  | 'slate'
  | 'red'
  | 'rose'
  | 'orange'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'violet';
type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColor] = useState<ThemeColor>('slate');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedColor = (localStorage.getItem('themeColor') as ThemeColor) || 'slate';
    const savedMode = (localStorage.getItem('themeMode') as ThemeMode) || 'light';

    setThemeColor(savedColor);
    setThemeMode(savedMode);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.remove('dark');
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    }

    applyColorTheme(themeColor, themeMode);
    localStorage.setItem('themeColor', themeColor);
    localStorage.setItem('themeMode', themeMode);
  }, [themeColor, themeMode, mounted]);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside the ThemeProvider');
  }
  return context;
};

const applyColorTheme = (color: ThemeColor, mode: ThemeMode) => {
  const theme = themes[color]?.[mode];
  if (!theme) {
    console.error(`Theme or mode not found for color: ${color}, mode: ${mode}`);
    return;
  }
  for (const key in theme) {
    if (Object.prototype.hasOwnProperty.call(theme, key)) {
      document.documentElement.style.setProperty(`--${key}`, theme[key as keyof typeof theme]);
    }
  }
};
