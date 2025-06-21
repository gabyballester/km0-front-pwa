import { VERSION_CONFIG, type VersionInfo } from '@/shared/constants';

// Cache para la versión leída
let cachedVersionInfo: VersionInfo | null = null;

/**
 * Lee la versión desde /version.json en el navegador
 * 
 * @returns Promise con la información de versión
 */
async function fetchVersionInfo(): Promise<VersionInfo | null> {
  try {
    const response = await fetch('/version.json');
    if (response.ok) {
      const versionData = await response.json();
      return {
        versionNumber: versionData.versionNumber || 0,
        version: versionData.version || 'v0',
        buildDate: versionData.buildDate || new Date().toISOString().split('T')[0],
        buildTime: versionData.buildTime || '00:00:00',
        environment: import.meta.env.DEV ? 'development' : 'production',
        timestamp: Date.now()
      };
    }
  } catch (error) {
    console.warn('No se pudo leer /version.json:', error);
  }
  return null;
}

/**
 * Genera información de build en tiempo real como fallback
 * 
 * @returns Información de build actual
 */
function generateFallbackBuildInfo(): VersionInfo {
  const now = new Date();
  return {
    versionNumber: 0,
    version: 'v0',
    buildDate: now.toISOString().split('T')[0],
    buildTime: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
    environment: import.meta.env.DEV ? 'development' : 'production',
    timestamp: now.getTime()
  };
}

/**
 * Obtiene la información de build actual
 * 
 * Intenta leer desde /version.json, si no puede, usa información generada.
 * 
 * @returns Información completa del build
 * 
 * @example
 * ```ts
 * const buildInfo = getBuildInfo();
 * console.log(buildInfo.version); // "v1"
 * console.log(buildInfo.versionNumber); // 1
 * ```
 */
export function getBuildInfo(): VersionInfo {
  // Si ya tenemos la versión cacheada, usarla
  if (cachedVersionInfo) {
    return cachedVersionInfo;
  }
  
  // Por defecto, usar fallback
  const fallbackInfo = generateFallbackBuildInfo();
  
  // Intentar cargar la versión desde el archivo
  fetchVersionInfo().then(versionInfo => {
    if (versionInfo) {
      cachedVersionInfo = versionInfo;
    }
  }).catch(() => {
    // Si falla, mantener el fallback
  });
  
  return fallbackInfo;
}

/**
 * Obtiene información de Git si está disponible
 * 
 * @returns Información de Git o undefined si no está disponible
 */
export function getGitInfo(): { commitHash?: string; branch?: string } {
  // En un entorno real, esto se inyectaría durante el build
  // Por ahora retornamos undefined
  return {
    commitHash: undefined,
    branch: undefined
  };
}

/**
 * Genera información completa de build incluyendo Git
 * 
 * @returns Información completa del build
 */
export function getFullBuildInfo(): VersionInfo {
  const buildInfo = getBuildInfo();
  const gitInfo = getGitInfo();
  
  return {
    ...buildInfo,
    ...gitInfo
  };
}

/**
 * Formatea la versión para mostrar
 * 
 * @param versionInfo - Información de versión
 * @returns Versión formateada para mostrar
 * 
 * @example
 * ```ts
 * const buildInfo = getBuildInfo();
 * const displayVersion = formatVersionForDisplay(buildInfo);
 * console.log(displayVersion); // "v1 (dev)"
 * ```
 */
export function formatVersionForDisplay(versionInfo: VersionInfo): string {
  const { version, environment, commitHash } = versionInfo;
  
  let displayVersion = version;
  
  if (environment === 'development') {
    displayVersion += ` (${VERSION_CONFIG.DEV_PREFIX})`;
  }
  
  if (commitHash) {
    displayVersion += ` [${commitHash.substring(0, 7)}]`;
  }
  
  return displayVersion;
}

// Exportar BUILD_INFO para uso directo
export const BUILD_INFO = getBuildInfo(); 