import type { ThemeColors } from '@/contexts/theme-context/ThemeProvider';
import { useTheme } from '@/contexts/theme-context/ThemeProvider';
import { themes } from '@/contexts/theme-context/themes';

export function ThemeColorToggle() {
  const { themeColor, setThemeColor } = useTheme();
  const colors = Object.keys(themes) as ThemeColors[];

  return (
    <select
      value={themeColor}
      onChange={e => setThemeColor(e.target.value as ThemeColors)}
      className='bg-background border rounded-md p-2'
    >
      {colors.map(color => (
        <option key={color} value={color}>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </option>
      ))}
    </select>
  );
}
