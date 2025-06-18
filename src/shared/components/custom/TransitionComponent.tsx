import type { ReactNode } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { useLocation } from 'react-router-dom';

interface TransitionComponentProps {
  children: ReactNode;
}

/**
 * Componente de transición para páginas
 * Maneja las animaciones de entrada y salida de las páginas
 * usando solo efectos de fade in/out sin movimiento de pantalla
 *
 * @example
 * ```tsx
 * <PageTransition>
 *   <YourPageComponent />
 * </PageTransition>
 * ```
 */
export function TransitionComponent({ children }: TransitionComponentProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
        className='w-full flex justify-center items-center h-full'
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Alias para compatibilidad
 */
export const PageTransition = TransitionComponent;
