/**
 * Componente para listas ordenadas y no ordenadas
 *
 * @example
 * ```tsx
 * // Lista no ordenada
 * <List>
 *   <li>Item 1</li>
 *   <li>Item 2</li>
 * </List>
 *
 * // Lista ordenada con variante
 * <List as="ol" variant="muted">
 *   <li>Primer paso</li>
 *   <li>Segundo paso</li>
 * </List>
 * ```
 */
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/shared/lib';

const listVariants = cva('my-6 ml-6', {
  variants: {
    as: {
      ul: 'list-disc [&>li]:mt-2',
      ol: 'list-decimal [&>li]:mt-2'
    },
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      subtle: 'text-muted-foreground/80'
    }
  },
  defaultVariants: {
    as: 'ul',
    variant: 'default'
  }
});

interface ListProps
  extends HTMLAttributes<HTMLUListElement | HTMLOListElement>,
    VariantProps<typeof listVariants> {
  as?: 'ul' | 'ol';
}

const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ className, as = 'ul', variant, ...props }, ref) => {
    const Component = as;

    return (
      <Component className={cn(listVariants({ as, variant, className }))} ref={ref} {...props} />
    );
  }
);

List.displayName = 'List';

export { List, listVariants };
