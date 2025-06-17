import type { ReactNode } from 'react';

import { cn } from '@/shared/utils';

interface BaseLayoutProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  mainClassName?: string;
}

export function BaseLayout({
  children,
  header,
  footer,
  className,
  mainClassName
}: BaseLayoutProps) {
  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      {header && <header className='flex-shrink-0'>{header}</header>}

      <main className={cn('flex-1 container mx-auto px-4 py-6', mainClassName)}>{children}</main>

      {footer && <footer className='flex-shrink-0'>{footer}</footer>}
    </div>
  );
}
