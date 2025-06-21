import { useState } from 'react';

import { Badge, Modal } from '@components';

import { combineClassNames } from '@utils';

import { useVersion } from '@contexts';

import { VERSION_DISPLAY_CONFIG, type VersionPosition } from '@constants';

interface VersionDisplayProps {
  /** Posición del indicador de versión */
  position?: VersionPosition;
  /** Mostrar información detallada al hacer click */
  showDetails?: boolean;
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * Componente VersionDisplay para mostrar información de versión
 * 
 * Muestra la versión actual del build en una esquina de la pantalla usando un Badge.
 * Opcionalmente puede mostrar información detallada al hacer click.
 * 
 * @example
 * ```tsx
 * // Uso básico (esquina inferior izquierda)
 * <VersionDisplay />
 * 
 * // En esquina superior derecha
 * <VersionDisplay position="top-right" />
 * 
 * // Con información detallada
 * <VersionDisplay showDetails />
 * 
 * // En toda la página
 * function MyPage() {
 *   return (
 *     <div className="relative min-h-screen">
 *       // Contenido de la página
 *       <VersionDisplay position="bottom-left" showDetails />
 *     </div>
 *   );
 * }
 * ```
 * 
 * @param props - Propiedades del componente
 * @returns Componente de visualización de versión
 */
export function VersionDisplay({ 
  position = VERSION_DISPLAY_CONFIG.POSITION.BOTTOM_LEFT,
  showDetails = false,
  className = ''
}: VersionDisplayProps) {
  const [showModal, setShowModal] = useState(false);
  const { versionInfo, displayVersion, isLoading } = useVersion();
  
  // Determinar si mostrar basado en configuración y entorno
  const shouldShow = versionInfo.environment === 'development' 
    ? VERSION_DISPLAY_CONFIG.SHOW_IN_DEV 
    : VERSION_DISPLAY_CONFIG.SHOW_IN_PROD;
  
  if (!shouldShow || isLoading) return null;
  
  // Clases de posición
  const positionClasses = {
    [VERSION_DISPLAY_CONFIG.POSITION.BOTTOM_LEFT]: 'bottom-4 left-4',
    [VERSION_DISPLAY_CONFIG.POSITION.BOTTOM_RIGHT]: 'bottom-4 right-4',
    [VERSION_DISPLAY_CONFIG.POSITION.TOP_LEFT]: 'top-4 left-4',
    [VERSION_DISPLAY_CONFIG.POSITION.TOP_RIGHT]: 'top-4 right-4'
  };
  
  const handleClick = () => {
    if (showDetails) {
      setShowModal(true);
    }
  };
  
  return (
    <>
      <Badge 
        variant="secondary" 
        className={combineClassNames(
          'fixed z-50',
          'font-mono',
          'cursor-pointer',
          'transition-all',
          'hover:opacity-100',
          'select-none',
          'bg-blue-500 text-white hover:bg-blue-600',
          'shadow-lg',
          positionClasses[position],
          className
        )}
        onClick={handleClick}
        title={showDetails ? 'Click para ver detalles' : `Versión: ${displayVersion}`}
      >
        {displayVersion}
      </Badge>
      
      {showDetails && showModal && (
        <Modal
          open={showModal}
          onOpenChange={setShowModal}
          title="Información de Build"
          size="sm"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Versión:</span>
                <p className="font-mono">{versionInfo.version}</p>
              </div>
              <div>
                <span className="font-semibold">Entorno:</span>
                <p className="capitalize">{versionInfo.environment}</p>
              </div>
              <div>
                <span className="font-semibold">Fecha:</span>
                <p>{versionInfo.buildDate}</p>
              </div>
              <div>
                <span className="font-semibold">Hora:</span>
                <p>{versionInfo.buildTime}</p>
              </div>
              {versionInfo.commitHash && (
                <div>
                  <span className="font-semibold">Commit:</span>
                  <p className="font-mono text-xs">{versionInfo.commitHash}</p>
                </div>
              )}
              {versionInfo.branch && (
                <div>
                  <span className="font-semibold">Branch:</span>
                  <p className="font-mono text-xs">{versionInfo.branch}</p>
                </div>
              )}
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Timestamp: {new Date(versionInfo.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
} 