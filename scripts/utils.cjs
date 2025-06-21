#!/usr/bin/env node

/**
 * Utilidades centralizadas para scripts del proyecto
 * 
 * Este archivo contiene funciones auxiliares que se usan en múltiples scripts
 * para evitar duplicación de código y seguir el principio DRY.
 */

const { resolve } = require('path');

/**
 * Resuelve una ruta desde el directorio raíz del proyecto
 * 
 * Esta función centraliza la lógica de resolución de rutas para scripts,
 * evitando la repetición de `resolve(__dirname, ...)` en todo el proyecto.
 * 
 * @param {string} relativePath - Ruta relativa desde la raíz del proyecto
 * @returns {string} Ruta absoluta resuelta
 * 
 * @example
 * ```js
 * // En scripts:
 * const versionFile = resolveFromRoot('version.json');
 * const srcDir = resolveFromRoot('src');
 * const buildInfoFile = resolveFromRoot('src/shared/utils/build-info.generated.ts');
 * ```
 */
function resolveFromRoot(relativePath) {
  const baseDir = __dirname.includes('scripts') ? '../' : './';
  return resolve(__dirname, baseDir, relativePath);
}

/**
 * Resuelve una ruta desde el directorio src/
 * 
 * @param {string} relativePath - Ruta relativa desde src/
 * @returns {string} Ruta absoluta resuelta
 */
function resolveFromSrc(relativePath) {
  return resolveFromRoot(`src/${relativePath}`);
}

/**
 * Resuelve una ruta desde el directorio public/
 * 
 * @param {string} relativePath - Ruta relativa desde public/
 * @returns {string} Ruta absoluta resuelta
 */
function resolveFromPublic(relativePath) {
  return resolveFromRoot(`public/${relativePath}`);
}

module.exports = {
  resolveFromRoot,
  resolveFromSrc,
  resolveFromPublic
}; 