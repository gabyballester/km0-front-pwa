import React, { createContext, useContext, useEffect, useState } from 'react';

import { logger } from '@/shared/utils/logger';

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
    logger.error(`Theme or mode not found for color: ${color}, mode: ${mode}`);
    return;
  }

  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
};
