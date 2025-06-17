/**
 * Componente para títulos (h1-h6) con estilos consistentes
 *
 * @example
 * ```tsx
 * // Título principal
 * <Title as="h1">Título Principal</Title>
 *
 * // Subtítulo centrado
 * <Title as="h2" align="center">Subtítulo</Title>
 * ```
 */
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/shared/utils';

const titleVariants = cva('scroll-m-20 font-semibold tracking-tight', {
  variants: {
    as: {
      h1: 'text-4xl font-extrabold lg:text-5xl',
      h2: 'border-b pb-2 text-3xl first:mt-0',
      h3: 'text-2xl',
      h4: 'text-xl',
      h5: 'text-lg',
      h6: 'text-base'
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right'
    }
  },
  defaultVariants: {
    as: 'h1',
    align: 'left'
  }
});

interface TitleProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, as = 'h1', align, ...props }, ref) => {
    const Component = as;

    return (
      <Component className={cn(titleVariants({ as, align, className }))} ref={ref} {...props} />
    );
  }
);

Title.displayName = 'Title';

export { Title, titleVariants };
