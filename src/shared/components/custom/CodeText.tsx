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
import { forwardRef, type HTMLAttributes } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { combineClassNames } from '@/shared/utils';

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

const CodeText = forwardRef<HTMLElement, CodeProps>(
  ({ className, as = 'code', variant, ...props }, ref) => {
    if (as === 'pre') {
      return (
        <pre
          className={combineClassNames(codeVariants({ as, variant, className }))}
          ref={ref as React.Ref<HTMLPreElement>}
          {...(props as HTMLAttributes<HTMLPreElement>)}
        />
      );
    }

    return (
      <code
        className={combineClassNames(codeVariants({ as, variant, className }))}
        ref={ref as React.Ref<HTMLElement>}
        {...(props as HTMLAttributes<HTMLElement>)}
      />
    );
  }
);

CodeText.displayName = 'Code';

export { CodeText as Code, codeVariants };
