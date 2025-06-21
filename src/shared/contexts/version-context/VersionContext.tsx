import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import type { VersionInfo } from '@constants';

interface VersionContextType {
  /** Información completa de la versión */
  versionInfo: VersionInfo;
  /** Versión formateada para mostrar */
  displayVersion: string;
  /** Indica si está cargando la versión */
  isLoading: boolean;
  /** Función para refrescar la versión */
  refreshVersion: () => void;
}

const VersionContext = createContext<VersionContextType | undefined>(undefined);

interface VersionProviderProps {
  /** Componentes hijos */
  children: ReactNode;
}

/**
 * Diccionario de sufijos por entorno para el formateo de versión
 */
const ENVIRONMENT_SUFFIXES = {
  development: ' (dev)',
  production: ' (prod)'
} as const;

/**
 * Proveedor del contexto de versionado
 * 
 * Maneja la lógica de obtención y cacheo de la información de versión.
 * 
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <VersionProvider>
 *       <Router />
 *       <VersionDisplay />
 *     </VersionProvider>
 *   );
 * }
 * ```
 */
export function VersionProvider({ 
  children
}: VersionProviderProps) {
  const [versionInfo, setVersionInfo] = useState<VersionInfo>({
    versionNumber: 0,
    version: 'v0',
    buildDate: new Date().toISOString().split('T')[0],
    buildTime: `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`,
    environment: import.meta.env.DEV ? 'development' : 'production',
    timestamp: Date.now()
  });
  
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Obtiene la información de versión desde el archivo
   */
  const fetchVersionInfo = async (): Promise<VersionInfo | null> => {
    try {
      const response = await fetch('/version.json');
      if (response.ok) {
        const data = await response.json();
        return {
          versionNumber: data.versionNumber || 0,
          version: data.version || 'v0',
          buildDate: data.buildDate || new Date().toISOString().split('T')[0],
          buildTime: data.buildTime || '00:00:00',
          environment: import.meta.env.DEV ? 'development' : 'production',
          timestamp: Date.now()
        };
      }
    } catch (error) {
      console.warn('No se pudo leer version.json:', error);
    }
    return null;
  };

  /**
   * Genera información de versión por defecto
   */
  const generateDefaultVersionInfo = (): VersionInfo => {
    const now = new Date();
    return {
      versionNumber: 0,
      version: 'v0',
      buildDate: now.toISOString().split('T')[0],
      buildTime: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
      environment: import.meta.env.DEV ? 'development' : 'production',
      timestamp: now.getTime()
    };
  };

  /**
   * Carga la información de versión
   */
  const loadVersionInfo = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const fetchedVersion = await fetchVersionInfo();
      if (fetchedVersion) {
        setVersionInfo(fetchedVersion);
      } else {
        setVersionInfo(generateDefaultVersionInfo());
      }
    } catch (error) {
      console.warn('Error cargando versión:', error);
      setVersionInfo(generateDefaultVersionInfo());
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresca la información de versión
   */
  const refreshVersion = useCallback(() => {
    loadVersionInfo();
  }, [loadVersionInfo]);

  // Cargar versión al montar el componente
  useEffect(() => {
    loadVersionInfo();
  }, [loadVersionInfo]);

  // Formatear versión para mostrar
  const displayVersion = formatVersionForDisplay(versionInfo);

  const value: VersionContextType = {
    versionInfo,
    displayVersion,
    isLoading,
    refreshVersion
  };

  return (
    <VersionContext.Provider value={value}>
      {children}
    </VersionContext.Provider>
  );
}

/**
 * Hook para usar el contexto de versión
 * 
 * @returns Contexto de versión
 * @throws Error si se usa fuera del VersionProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { versionInfo, displayVersion, isLoading } = useVersion();
 * 
 *   if (isLoading) {
 *     return <div>Cargando versión...</div>;
 *   }
 * 
 *   return <div>Versión: {displayVersion}</div>;
 * }
 * ```
 */
export function useVersion(): VersionContextType {
  const context = useContext(VersionContext);
  
  if (context === undefined) {
    throw new Error('useVersion debe usarse dentro de un VersionProvider');
  }
  
  return context;
}

/**
 * Formatea la versión para mostrar
 * 
 * Usa un diccionario de sufijos para simplificar la lógica condicional
 */
function formatVersionForDisplay(versionInfo: VersionInfo): string {
  const { version, environment } = versionInfo;
  
  // Usar el diccionario para obtener el sufijo correspondiente
  const suffix = ENVIRONMENT_SUFFIXES[environment] || '';
  
  return version + suffix;
} 