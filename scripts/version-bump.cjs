#!/usr/bin/env node

/**
 * Script para auto-incrementar la versión del proyecto (CommonJS)
 *
 * 1. Lee la versión actual desde version.json
 * 2. Incrementa el número de versión en 1
 * 3. Actualiza version.json con la nueva versión
 * 4. Copia version.json al directorio public para acceso del frontend
 * 5. Genera un archivo de build info para el frontend
 *
 * Uso: node scripts/version-bump.cjs
 */

const { existsSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } = require('fs');
const { dirname } = require('path');
const { resolveFromRoot } = require('./utils.cjs');

// Rutas de archivos usando la función auxiliar centralizada
const VERSION_FILE = resolveFromRoot('version.json');
const PUBLIC_VERSION_FILE = resolveFromRoot('public/version.json');
const BUILD_INFO_FILE = resolveFromRoot('src/shared/utils/build-info.generated.ts');

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
  
  // Copiar el archivo al directorio public para acceso del frontend
  try {
    copyFileSync(VERSION_FILE, PUBLIC_VERSION_FILE);
    console.log(`✅ Versión copiada a ${PUBLIC_VERSION_FILE}`);
  } catch (error) {
    console.warn('No se pudo copiar version.json al directorio public:', error);
  }
}

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
    mkdirSync(buildInfoDir, { recursive: true });
  }

  writeFileSync(BUILD_INFO_FILE, buildInfoContent);
  console.log(`✅ Build info generado en ${BUILD_INFO_FILE}`);
}

function main() {
  try {
    console.log('🚀 Iniciando bump de versión...');
    const currentVersion = readCurrentVersion();
    const newVersion = currentVersion + 1;
    writeVersion(newVersion);
    generateBuildInfo(newVersion);
    console.log(`🎉 Versión incrementada de v${currentVersion} a v${newVersion}`);
  } catch (error) {
    console.error('❌ Error al incrementar la versión:', error);
    process.exit(1);
  }
}

main(); 