import { Moon, Palette, Sun, X } from 'lucide-react';
import { useState } from 'react';

import type { ThemeColor } from '@/contexts/theme-context/ThemeProvider';
import { useTheme } from '@/contexts/theme-context/ThemeProvider';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/components';
import { capitalizeFirstLetter, cn } from '@/shared/lib/utils';

import { TextP } from './TypographyP';

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

export const ThemeToggle = () => {
  const { themeMode, setThemeMode, themeColor, setThemeColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const setLight = () => {
    setThemeMode('light');
  };

  const setDark = () => {
    setThemeMode('dark');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Palette className='h-6 w-6 cursor-pointer' />
      </PopoverTrigger>
      <PopoverContent
        side='left'
        align='end'
        className='w-56 p-4 space-y-6 bg-background flex flex-col gap-6 pt-6'
      >
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm font-medium text-foreground'>Elige el tema: </h3>
            <X className='cursor-pointer' onClick={() => setIsOpen(false)} />
          </div>
          <div className='grid grid-cols-2 gap-2'>
            {[
              { mode: 'light', Icon: Sun, label: 'light', action: setLight },
              { mode: 'dark', Icon: Moon, label: 'dark', action: setDark }
            ].map(({ mode, Icon, label, action }) => (
              <Button
                size='sm'
                key={mode}
                onClick={action}
                className={cn(
                  'rounded-md border-1 border-accent-foreground cursor-pointer flex justify-center gap-2',
                  themeMode === mode
                    ? 'bg-background hover:bg-accent'
                    : 'bg-muted/50 opacity-50 hover:bg-accent text-foreground hover:opacity-100'
                )}
              >
                <Icon
                  size={20}
                  className={themeMode === mode ? 'text-foreground' : 'text-muted-foreground'}
                />
                <TextP
                  text={capitalizeFirstLetter(label)}
                  className={themeMode === mode ? 'text-foreground' : 'text-muted-foreground'}
                />
              </Button>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <h3 className='text-sm font-medium text-foreground'>Elige el color: </h3>
          <div className='grid grid-cols-2 gap-2'>
            {availableThemeColors.map(color => (
              <Button
                size='sm'
                key={color.name}
                onClick={() => setThemeColor(color.name)}
                className={cn(
                  'rounded-md border-1 border-accent-foreground cursor-pointer flex justify-start p-2',
                  themeColor === color.name
                    ? 'bg-background hover:bg-accent'
                    : 'bg-muted/50 opacity-50 hover:bg-accent text-foreground hover:opacity-100'
                )}
              >
                {' '}
                <div
                  className={`h-4 w-4 rounded-full ${themeMode === 'light' ? color.light : color.dark}`}
                />
                <TextP
                  text={capitalizeFirstLetter(color.name)}
                  className={
                    themeColor === color.name ? 'text-foreground' : 'text-muted-foreground'
                  }
                />
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
