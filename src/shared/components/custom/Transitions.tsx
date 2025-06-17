import { AnimatePresence, motion, type Transition } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import { combineClassNames } from '@/shared/utils';

// Transiciones predefinidas
export const transitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  },
  slide: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  // Nueva transición directa sin movimiento
  direct: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.15 }
  }
} as const;

// Props para el componente de transición
interface TransitionProps {
  children: React.ReactNode;
  className?: string;
  type?: keyof typeof transitions;
  customTransition?: Transition;
}

/**
 * Componente de transición de página
 *
 * @example
 * ```tsx
 * <PageTransition>
 *   <YourPage />
 * </PageTransition>
 * ```
 */
export function PageTransition({
  children,
  className,
  type = 'direct',
  customTransition
}: TransitionProps) {
  const location = useLocation();
  const transition = transitions[type];

  return (
    <AnimatePresence mode='wait'>
      <motion.main
        key={location.pathname}
        initial={transition.initial}
        animate={transition.animate}
        exit={transition.exit}
        transition={customTransition || transition.transition}
        className={combineClassNames(
          'min-h-[calc(100vh-4rem)] w-full',
          'max-w-7xl mx-auto',
          className
        )}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}

/**
 * Componente de transición para elementos
 *
 * @example
 * ```tsx
 * <TransitionElement type="fade">
 *   <YourComponent />
 * </TransitionElement>
 * ```
 */
export function TransitionElement({
  children,
  className,
  type = 'fade',
  customTransition
}: TransitionProps) {
  const transition = transitions[type];

  return (
    <motion.div
      initial={transition.initial}
      animate={transition.animate}
      exit={transition.exit}
      transition={customTransition || transition.transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Componente de transición para listas
 *
 * @example
 * ```tsx
 * <TransitionList>
 *   {items.map(item => (
 *     <TransitionElement key={item.id}>
 *       <ItemComponent item={item} />
 *     </TransitionElement>
 *   ))}
 * </TransitionList>
 * ```
 */
export function TransitionList({
  children,
  className
}: Omit<TransitionProps, 'type' | 'customTransition'>) {
  return (
    <AnimatePresence mode='popLayout'>
      <motion.div layout className={className}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
