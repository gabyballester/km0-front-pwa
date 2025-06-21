import { useEffect, useState } from 'react';

/**
 * Hook para detectar el tipo de dispositivo basado en el ancho de pantalla
 * 
 * Detecta automáticamente si el dispositivo es móvil (< 768px) y se actualiza
 * cuando cambia el tamaño de la ventana.
 * 
 * @example
 * ```tsx
 * // Uso básico
 * function MyComponent() {
 *   const { isMobile } = useDeviceType();
 * 
 *   return (
 *     <div>
 *       {isMobile ? (
 *         <MobileLayout />
 *       ) : (
 *         <DesktopLayout />
 *       )}
 *     </div>
 *   );
 * }
 * 
 * // Uso con renderizado condicional
 * function ResponsiveComponent() {
 *   const { isMobile } = useDeviceType();
 * 
 *   return (
 *     <div className={isMobile ? 'p-4' : 'p-8'}>
 *       <h1 className={isMobile ? 'text-lg' : 'text-2xl'}>
 *         Título Responsivo
 *       </h1>
 *       {isMobile ? (
 *         <MobileMenu />
 *       ) : (
 *         <DesktopMenu />
 *       )}
 *     </div>
 *   );
 * }
 * 
 * // Uso con efectos
 * function AdaptiveComponent() {
 *   const { isMobile } = useDeviceType();
 * 
 *   useEffect(() => {
 *     if (isMobile) {
 *       // Configuraciones específicas para móvil
 *       document.body.classList.add('mobile-mode');
 *     } else {
 *       document.body.classList.remove('mobile-mode');
 *     }
 *   }, [isMobile]);
 * 
 *   return <div>Contenido adaptativo</div>;
 * }
 * ```
 * 
 * @returns Objeto con `isMobile` que indica si el dispositivo es móvil
 */
export const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile };
};
