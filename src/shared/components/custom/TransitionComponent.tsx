import type { ReactNode } from 'react';

import { AnimatePresence, type Easing, motion } from 'framer-motion';

import { useLocation } from 'react-router-dom';

interface TransitionComponentProps {
  children: ReactNode;
  /** Duración personalizada de la transición */
  duration?: number;
  /** Tipo de easing personalizado */
  ease?: Easing;
}

/**
 * Componente de transición para páginas
 * Maneja las animaciones de entrada y salida de las páginas
 * usando solo efectos de fade in/out sin movimiento de pantalla
 * Optimizado para layouts y rutas anidadas
 *
 * @example
 * ```tsx
 * <TransitionComponent>
 *   <YourPageComponent />
 * </TransitionComponent>
 *
 * // Con configuración personalizada
 * <TransitionComponent duration={0.2} ease="easeOut">
 *   <YourPageComponent />
 * </TransitionComponent>
 * ```
 */
export function TransitionComponent({
  children,
  duration = 0.3,
  ease = 'easeInOut'
}: TransitionComponentProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration,
          ease
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
