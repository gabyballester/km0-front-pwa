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

// Configuración
const SRC_DIR = path.join(__dirname, '..', 'src');
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

// Función para verificar si tiene ejemplos
function hasExamples(content) {
  return /@example/.test(content);
}

// Función para analizar archivos
function analyzeFiles(pattern, category) {
  const files = glob.sync(pattern, {
    cwd: SRC_DIR,
    ignore: IGNORE_PATTERNS,
    absolute: true
  });

  const results = {
    total: files.length,
    withJSDoc: 0,
    withExamples: 0,
    withoutJSDoc: [],
    withoutExamples: []
  };

  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const relativePath = path.relative(SRC_DIR, file);
      
      if (hasJSDoc(content)) {
        results.withJSDoc++;
        if (hasExamples(content)) {
          results.withExamples++;
        } else {
          results.withoutExamples.push(relativePath);
        }
      } else {
        results.withoutJSDoc.push(relativePath);
      }
    } catch (error) {
      console.error(`Error reading file ${file}:`, error.message);
    }
  });

  return results;
}

// Función principal
function main() {
  console.log('🔍 Analizando documentación JSDoc...\n');

  const categories = {
    'Componentes': analyzeFiles(PATTERNS.components, 'components'),
    'Hooks': analyzeFiles(PATTERNS.hooks, 'hooks'),
    'Utilidades': analyzeFiles(PATTERNS.utils, 'utils'),
    'Contextos': analyzeFiles(PATTERNS.contexts, 'contexts'),
    'Tipos': analyzeFiles(PATTERNS.types, 'types')
  };

  let totalFiles = 0;
  let totalWithJSDoc = 0;
  let totalWithExamples = 0;

  // Mostrar resultados por categoría
  Object.entries(categories).forEach(([category, results]) => {
    if (results.total === 0) return;

    console.log(`📁 ${category}:`);
    console.log(`   Total: ${results.total}`);
    console.log(`   Con JSDoc: ${results.withJSDoc}/${results.total} (${Math.round(results.withJSDoc/results.total*100)}%)`);
    console.log(`   Con ejemplos: ${results.withExamples}/${results.total} (${Math.round(results.withExamples/results.total*100)}%)`);
    
    if (results.withoutJSDoc.length > 0) {
      console.log(`   ❌ Sin JSDoc:`);
      results.withoutJSDoc.forEach(file => {
        console.log(`      - ${file}`);
      });
    }
    
    if (results.withoutExamples.length > 0) {
      console.log(`   ⚠️  Sin ejemplos:`);
      results.withoutExamples.forEach(file => {
        console.log(`      - ${file}`);
      });
    }
    
    console.log('');

    totalFiles += results.total;
    totalWithJSDoc += results.withJSDoc;
    totalWithExamples += results.withExamples;
  });

  // Resumen general
  console.log('📊 Resumen General:');
  console.log(`   Total de archivos: ${totalFiles}`);
  console.log(`   Con JSDoc: ${totalWithJSDoc}/${totalFiles} (${Math.round(totalWithJSDoc/totalFiles*100)}%)`);
  console.log(`   Con ejemplos: ${totalWithExamples}/${totalFiles} (${Math.round(totalWithExamples/totalFiles*100)}%)`);

  // Recomendaciones
  console.log('\n💡 Recomendaciones:');
  
  if (totalWithJSDoc/totalFiles < 0.8) {
    console.log('   ⚠️  Menos del 80% de archivos tienen JSDoc. Considera documentar más archivos.');
  }
  
  if (totalWithExamples/totalFiles < 0.6) {
    console.log('   ⚠️  Menos del 60% de archivos tienen ejemplos. Considera añadir más ejemplos de uso.');
  }

  if (totalWithJSDoc/totalFiles >= 0.8 && totalWithExamples/totalFiles >= 0.6) {
    console.log('   ✅ Excelente cobertura de documentación!');
  }

  console.log('\n📚 Para más información sobre documentación:');
  console.log('   - Ver src/shared/docs/README.md');
  console.log('   - Seguir las convenciones de JSDoc del proyecto');
}

// Ejecutar si es llamado directamente
main(); 