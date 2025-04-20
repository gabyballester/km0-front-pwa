import { cn } from '@/shared/lib/utils';

export function TextP({ text, className }: { text: string; className?: string }) {
  return <p className={cn('leading-7 [&:not(:first-child)]:mt-6, className', className)}>{text}</p>;
}
