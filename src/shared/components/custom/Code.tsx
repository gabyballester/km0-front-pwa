/**
 * Componente para mostrar código inline o en bloques
 *
 * @example
 * ```tsx
 * // Código inline
 * <Code>const x = 1;</Code>
 *
 * // Bloque de código
 * <Code as="pre" className="p-4">
 *   {`
 *     function example() {
 *       return "Hello World";
 *     }
 *   `}
 * </Code>
 * ```
 */
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/shared/utils';

const codeVariants = cva('relative rounded bg-muted font-mono', {
  variants: {
    as: {
      code: 'px-1.5 py-0.5 text-sm',
      pre: 'block w-full overflow-x-auto p-4 text-sm'
    },
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      destructive: 'text-destructive'
    }
  },
  defaultVariants: {
    as: 'code',
    variant: 'default'
  }
});

interface CodeProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof codeVariants> {
  as?: 'code' | 'pre';
}

const Code = forwardRef<HTMLElement, CodeProps>(
  ({ className, as = 'code', variant, ...props }, ref) => {
    const Component = as;

    return (
      <Component className={cn(codeVariants({ as, variant, className }))} ref={ref} {...props} />
    );
  }
);

Code.displayName = 'Code';

export { Code, codeVariants };
