/**
 * Componente para cambiar el tema y color de la aplicación
 * Permite cambiar entre tema claro/oscuro y seleccionar diferentes colores de tema
 *
 * @example
 * ```tsx
 * <ThemeAndColorToggle />
 * ```
 */
import { Moon, Palette, Sun, XIcon } from 'lucide-react';
import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger, Text } from '@/shared/components';
import type { ThemeColor } from '@/shared/contexts/theme-context/ThemeProvider';
import { useTheme } from '@/shared/contexts/theme-context/ThemeProvider';
import { capitalize, cn } from '@/shared/utils';

interface AvailableThemeColor {
  name: ThemeColor;
  light: string;
  dark: string;
}

export const availableThemeColors: AvailableThemeColor[] = [
  { name: 'slate', light: 'bg-slate-900', dark: 'bg-slate-700' },
  { name: 'red', light: 'bg-red-500', dark: 'bg-red-700' },
  { name: 'rose', light: 'bg-rose-500', dark: 'bg-rose-700' },
  { name: 'orange', light: 'bg-orange-500', dark: 'bg-orange-700' },
  { name: 'blue', light: 'bg-blue-500', dark: 'bg-blue-700' },
  { name: 'green', light: 'bg-green-500', dark: 'bg-green-700' },
  { name: 'yellow', light: 'bg-yellow-500', dark: 'bg-yellow-700' },
  { name: 'violet', light: 'bg-violet-500', dark: 'bg-violet-700' }
];

export function ThemeAndColorToggle() {
  const { themeMode, setThemeMode, themeColor, setThemeColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <div className='flex items-center gap-2'>
      <Text as='span' variant='muted' size='sm'>
        Cambiar tema:
      </Text>
      <Button variant='ghost' size='icon' onClick={toggleTheme} className='h-8 w-8'>
        <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        <span className='sr-only'>Toggle theme</span>
      </Button>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <Palette className='h-4 w-4' />
            <span className='sr-only'>Cambiar color</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-48 p-2'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between px-2 py-1.5'>
              <Text as='span' variant='muted' size='sm'>
                Color del tema
              </Text>
              <Button
                variant='ghost'
                size='icon'
                className='h-6 w-6'
                onClick={() => setIsOpen(false)}
              >
                <XIcon className='h-4 w-4' />
              </Button>
            </div>
            <div className='grid grid-cols-4 gap-1'>
              {availableThemeColors.map(color => (
                <Button
                  key={color.name}
                  variant='ghost'
                  size='icon'
                  className={cn(
                    'h-8 w-8 rounded-full',
                    themeColor === color.name &&
                      'ring-2 ring-offset-2 ring-offset-background ring-ring'
                  )}
                  onClick={() => {
                    setThemeColor(color.name);
                    setIsOpen(false);
                  }}
                >
                  <div
                    className={cn(
                      'h-4 w-4 rounded-full',
                      themeMode === 'light' ? color.light : color.dark
                    )}
                  />
                  <Text
                    as='span'
                    variant={themeColor === color.name ? 'default' : 'muted'}
                    className={
                      themeColor === color.name ? 'text-foreground' : 'text-muted-foreground'
                    }
                  >
                    {capitalize(color.name)}
                  </Text>
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
