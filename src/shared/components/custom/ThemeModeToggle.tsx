import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/contexts/theme-context/ThemeProvider';

export function ThemeModeToggle() {
  const { themeMode, setThemeMode } = useTheme();

  const switchTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={switchTheme} className='p-2 rounded-lg hover:bg-accent'>
      {themeMode === 'light' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
