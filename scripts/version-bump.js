#!/usr/bin/env node

/**
 * Script para auto-incrementar la versión del proyecto
 * 
 * Este script:
 * 1. Lee la versión actual desde version.json
 * 2. Incrementa el número de versión
 * 3. Actualiza version.json con la nueva versión
 * 4. Copia version.json a public/ para que esté disponible en el navegador
 * 5. Genera un archivo de build info para el frontend
 * 
 * Uso: node scripts/version-bump.js
 */

import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Rutas de archivos
const VERSION_FILE = resolve(__dirname, '../version.json');
const PUBLIC_VERSION_FILE = resolve(__dirname, '../public/version.json');
const BUILD_INFO_FILE = resolve(__dirname, '../src/shared/utils/build-info.generated.ts');
const PACKAGE_JSON = resolve(__dirname, '../package.json');

/**
 * Lee la versión actual desde version.json
 */
function readCurrentVersion() {
  try {
    if (existsSync(VERSION_FILE)) {
      const versionData = JSON.parse(readFileSync(VERSION_FILE, 'utf8'));
      return versionData.versionNumber || 0;
    }
  } catch (error) {
    console.warn('No se pudo leer version.json, empezando desde 0');
  }
  return 0;
}

/**
 * Escribe la nueva versión en version.json
 */
function writeVersion(versionNumber) {
  const versionData = {
    versionNumber,
    version: `v${versionNumber}`,
    lastUpdated: new Date().toISOString(),
    buildDate: new Date().toISOString().split('T')[0],
    buildTime: new Date().toTimeString().split(' ')[0]
  };

  writeFileSync(VERSION_FILE, JSON.stringify(versionData, null, 2));
  console.log(`✅ Versión actualizada a v${versionNumber}`);
}

/**
 * Copia version.json a la carpeta public
 */
function copyVersionToPublic() {
  try {
    copyFileSync(VERSION_FILE, PUBLIC_VERSION_FILE);
    console.log(`✅ version.json copiado a public/`);
  } catch (error) {
    console.warn('No se pudo copiar version.json a public:', error.message);
  }
}

/**
 * Genera el archivo de build info para el frontend
 */
function generateBuildInfo(versionNumber) {
  const now = new Date();
  const buildInfo = {
    versionNumber,
    version: `v${versionNumber}`,
    buildDate: now.toISOString().split('T')[0],
    buildTime: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
    timestamp: now.getTime(),
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'development'
  };

  const buildInfoContent = `/**
 * Archivo generado automáticamente - NO EDITAR MANUALMENTE
 * 
 * Información de build generada por el script version-bump.js
 */

import type { VersionInfo } from '@constants';

export const BUILD_INFO: VersionInfo = ${JSON.stringify(buildInfo, null, 2)};

export const VERSION_NUMBER = ${versionNumber};
export const VERSION_STRING = '${buildInfo.version}';
export const BUILD_DATE = '${buildInfo.buildDate}';
export const BUILD_TIME = '${buildInfo.buildTime}';
export const BUILD_TIMESTAMP = ${buildInfo.timestamp};
export const BUILD_ENVIRONMENT = '${buildInfo.environment}';
`;

  // Asegurar que el directorio existe
  const buildInfoDir = dirname(BUILD_INFO_FILE);
  if (!existsSync(buildInfoDir)) {
    const { mkdirSync } = require('fs');
    mkdirSync(buildInfoDir, { recursive: true });
  }

  writeFileSync(BUILD_INFO_FILE, buildInfoContent);
  console.log(`✅ Build info generado en ${BUILD_INFO_FILE}`);
}

/**
 * Actualiza package.json con la nueva versión
 */
function updatePackageJson(versionNumber) {
  try {
    const packageJson = JSON.parse(readFileSync(PACKAGE_JSON, 'utf8'));
    packageJson.version = `0.0.${versionNumber}`;
    writeFileSync(PACKAGE_JSON, JSON.stringify(packageJson, null, 2));
    console.log(`✅ package.json actualizado a versión 0.0.${versionNumber}`);
  } catch (error) {
    console.warn('No se pudo actualizar package.json:', error.message);
  }
}

/**
 * Función principal
 */
function main() {
  console.log('🚀 Iniciando bump de versión...');
  
  // Leer versión actual
  const currentVersion = readCurrentVersion();
  const newVersion = currentVersion + 1;
  
  // Escribir nueva versión
  writeVersion(newVersion);
  
  // Copiar a public para que esté disponible en el navegador
  copyVersionToPublic();
  
  // Generar build info
  generateBuildInfo(newVersion);
  
  // Actualizar package.json
  updatePackageJson(newVersion);
  
  console.log(`🎉 Versión incrementada de v${currentVersion} a v${newVersion}`);
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 