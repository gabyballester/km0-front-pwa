#!/usr/bin/env node

/**
 * Utilidades centralizadas para scripts del proyecto
 * 
 * Este archivo contiene funciones auxiliares que se usan en múltiples scripts
 * para evitar duplicación de código y seguir el principio DRY.
 * 
 * Principios aplicados:
 * - DRY (Don't Repeat Yourself): Funciones centralizadas
 * - Single Responsibility: Cada función tiene una responsabilidad específica
 * - Open/Closed: Fácil de extender sin modificar código existente
 * - Dependency Inversion: Los scripts dependen de abstracciones, no de implementaciones concretas
 * 
 * Estructura de archivos:
 * - scripts/utils.cjs: Utilidades centralizadas para scripts (CommonJS)
 * - scripts/docs-check.cjs: Script de análisis de documentación (CommonJS)
 * - scripts/version-bump.cjs: Script de versionado (CommonJS)
 * - vite.config.ts: Configuración de Vite con pathResolver interno
 * 
 * Separación de responsabilidades:
 * - Scripts: Usan módulos de Node.js (path, fs, etc.) - CommonJS
 * - Frontend: Usa utilidades compatibles con navegador - ESM
 * - Configuración: Funciones específicas para cada herramienta
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
  // __dirname apunta al directorio scripts/, necesitamos ir un nivel arriba
  return resolve(__dirname, '..', relativePath);
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