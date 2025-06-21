#!/usr/bin/env node

/**
 * Script para verificar la cobertura de documentación JSDoc
 * 
 * Este script analiza los archivos del proyecto y verifica:
 * - Componentes con JSDoc
 * - Hooks con JSDoc
 * - Utilidades con JSDoc
 * - Archivos que necesitan documentación
 */

import fs from 'fs';
import globPkg from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';

const { glob } = globPkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función auxiliar para resolver rutas desde la raíz del proyecto
function resolveFromRoot(relativePath) {
  const baseDir = __dirname.includes('scripts') ? '../' : './';
  return path.resolve(__dirname, baseDir, relativePath);
}

// Configuración
const SRC_DIR = resolveFromRoot('src');
const IGNORE_PATTERNS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/*.test.*',
  '**/*.spec.*',
  '**/__test__/**',
  '**/*.d.ts'
];

// Patrones para identificar tipos de archivos
const PATTERNS = {
  components: '**/components/**/*.{tsx,ts}',
  hooks: '**/hooks/**/*.{tsx,ts}',
  utils: '**/utils/**/*.{tsx,ts}',
  contexts: '**/contexts/**/*.{tsx,ts}',
  types: '**/types/**/*.{tsx,ts}'
};

// Función para verificar si un archivo tiene JSDoc
function hasJSDoc(content) {
  const jsdocPatterns = [
    /\/\*\*[\s\S]*?\*\//, // JSDoc básico
    /\/\*\*[\s\S]*?\*\/\s*export/, // JSDoc con export
    /\/\*\*[\s\S]*?\*\/\s*function/, // JSDoc con function
    /\/\*\*[\s\S]*?\*\/\s*const/, // JSDoc con const
    /\/\*\*[\s\S]*?\*\/\s*interface/, // JSDoc con interface
    /\/\*\*[\s\S]*?\*\/\s*type/, // JSDoc con type
  ];
  
  return jsdocPatterns.some(pattern => pattern.test(content));
}

// Función para analizar archivos de un tipo específico
async function analyzeFiles(pattern, type) {
  const files = await glob(pattern, {
    cwd: SRC_DIR,
    ignore: IGNORE_PATTERNS,
    absolute: true
  });

  const results = {
    total: files.length,
    documented: 0,
    undocumented: [],
    documentedFiles: []
  };

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const relativePath = path.relative(SRC_DIR, file);
      
      if (hasJSDoc(content)) {
        results.documented++;
        results.documentedFiles.push(relativePath);
      } else {
        results.undocumented.push(relativePath);
      }
    } catch (error) {
      console.warn(`Error leyendo archivo ${file}:`, error.message);
    }
  }

  return results;
}

// Función para generar reporte
function generateReport(results) {
  console.log('\n📊 REPORTE DE DOCUMENTACIÓN JSDOC\n');
  console.log('=' .repeat(50));

  let totalFiles = 0;
  let totalDocumented = 0;

  for (const [type, result] of Object.entries(results)) {
    const percentage = result.total > 0 ? ((result.documented / result.total) * 100).toFixed(1) : 0;
    const status = percentage >= 80 ? '✅' : percentage >= 50 ? '⚠️' : '❌';
    
    console.log(`\n${status} ${type.toUpperCase()}:`);
    console.log(`   Total: ${result.total} archivos`);
    console.log(`   Documentados: ${result.documented} (${percentage}%)`);
    
    if (result.undocumented.length > 0) {
      console.log(`   Sin documentar: ${result.undocumented.length}`);
      if (result.undocumented.length <= 5) {
        result.undocumented.forEach(file => console.log(`     - ${file}`));
      } else {
        console.log(`     - ${result.undocumented.slice(0, 5).join(', ')}... y ${result.undocumented.length - 5} más`);
      }
    }

    totalFiles += result.total;
    totalDocumented += result.documented;
  }

  const overallPercentage = totalFiles > 0 ? ((totalDocumented / totalFiles) * 100).toFixed(1) : 0;
  console.log('\n' + '=' .repeat(50));
  console.log(`📈 TOTAL GENERAL: ${totalDocumented}/${totalFiles} (${overallPercentage}%)`);
  
  if (overallPercentage >= 80) {
    console.log('🎉 ¡Excelente cobertura de documentación!');
  } else if (overallPercentage >= 50) {
    console.log('⚠️  Cobertura de documentación moderada. Considera mejorar la documentación.');
  } else {
    console.log('❌ Cobertura de documentación baja. Es recomendable documentar más archivos.');
  }
}

// Función principal
async function main() {
  console.log('🔍 Analizando documentación JSDoc...');
  
  const results = {};
  
  for (const [type, pattern] of Object.entries(PATTERNS)) {
    results[type] = await analyzeFiles(pattern, type);
  }
  
  generateReport(results);
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
} 