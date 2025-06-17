/**
 * Componente para texto (p, span, etc.) con estilos consistentes
 *
 * @example
 * ```tsx
 * // Párrafo normal
 * <Text>Este es un párrafo normal</Text>
 *
 * // Texto en línea con variante
 * <Text as="span" variant="muted">Texto secundario</Text>
 *
 * // Párrafo con alineación
 * <Text align="center">Texto centrado</Text>
 * ```
 */
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/shared/utils';

const textVariants = cva('leading-7', {
  variants: {
    as: {
      p: 'mb-4 last:mb-0',
      span: 'inline',
      div: 'block'
    },
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      subtle: 'text-muted-foreground/80',
      destructive: 'text-destructive'
    },
    size: {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg'
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    }
  },
  defaultVariants: {
    as: 'p',
    variant: 'default',
    size: 'base',
    align: 'left',
    weight: 'normal'
  }
});

interface TextProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div';
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, as = 'p', variant, size, align, weight, ...props }, ref) => {
    const Component = as;

    return (
      <Component
        className={cn(textVariants({ as, variant, size, align, weight, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';

export { Text, textVariants };
