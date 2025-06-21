import * as React from 'react';

import { combineClassNames } from '@utils';

/**
 * Componente Input para campos de entrada de texto
 * 
 * @example
 * ```tsx
 * // Input básico
 * <Input placeholder="Escribe tu nombre" />
 * 
 * // Input con label
 * <div>
 *   <Label htmlFor="email">Email</Label>
 *   <Input id="email" type="email" placeholder="tu@email.com" />
 * </div>
 * 
 * // Input con validación
 * <Input 
 *   type="email" 
 *   placeholder="Email" 
 *   aria-invalid={!isValidEmail}
 *   required 
 * />
 * 
 * // Input deshabilitado
 * <Input 
 *   placeholder="Campo deshabilitado" 
 *   disabled 
 * />
 * 
 * // Input con valor controlado
 * <Input 
 *   value={value} 
 *   onChange={(e) => setValue(e.target.value)}
 *   placeholder="Valor controlado" 
 * />
 * 
 * // Input de archivo
 * <Input 
 *   type="file" 
 *   accept="image/*"
 *   onChange={handleFileChange} 
 * />
 * ```
 */
function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={combineClassNames(
        `file:text-foreground placeholder:text-muted-foreground selection:bg-primary
        selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md
        border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none
        file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium
        disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        `aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
        aria-invalid:border-destructive`,
        className
      )}
      {...props}
    />
  );
}

export { Input };

