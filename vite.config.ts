import { createHash } from 'crypto';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const isDev = process.env.NODE_ENV === 'development';

/**
 * Resuelve una ruta desde el directorio raíz del proyecto
 * Función auxiliar específica para la configuración de Vite
 */
function pathResolver(relativePath: string): string {
  return resolve(__dirname, relativePath);
}

// Calcula la revisión de index.html (útil para evitar problemas de caché en producción)
const htmlRevision = !isDev
  ? createHash('md5')
      .update(readFileSync(pathResolver('index.html')))
      .digest('hex')
  : 'dev-html-revision';

export default defineConfig({
  base: '/',
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 3000
    }
  },
  preview: {
    port: 4173,
    host: 'localhost',
    strictPort: true
  },
  assetsInclude: ['**/*.svg'],
  resolve: {
    alias: {
      '@hooks': pathResolver('./src/shared/hooks'),
      '@components': pathResolver('./src/shared/components'),
      '@utils': pathResolver('./src/shared/utils'),
      '@constants': pathResolver('./src/shared/constants'),
      '@contexts': pathResolver('./src/shared/contexts'),
      '@types': pathResolver('./src/shared/types'),
      '@pages': pathResolver('./src/shared/pages'),
      '@router': pathResolver('./src/router'),
      '@paths': pathResolver('./src/router/paths.router'),
      '@features': pathResolver('./src/features'),
      '@assets': pathResolver('./src/assets'),
      '@': pathResolver('./src')
    }
  },

  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // Configuración para usar service worker personalizado
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      
      // Configuración del manifest
      manifest: {
        id: 'Km0-PWA',
        name: 'km0-pwa-react-ts',
        short_name: 'km0-pwa-react-ts',
        description: 'km0-pwa-react-ts',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: 'screenshot-desktop.png',
            sizes: '1280x800',
            type: 'image/png',
            form_factor: 'wide'
          },
          {
            src: 'screenshot-mobile.png',
            sizes: '496x846',
            type: 'image/png',
            form_factor: 'narrow'
          }
        ]
      },

      // Configuración para desarrollo
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        type: 'module',
        navigateFallback: 'index.html'
      },

      // Configuración de injectManifest para el service worker personalizado
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        globIgnores: [
          '**/node_modules/**',
          '**/@vite/**',
          '**/sw*.js',
          '**/workbox-*.js',
          '**/*.map',
          '**/chunk-*.js',
          '**/*.mjs'
        ],
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        manifestTransforms: [
          manifestEntries => {
            const indexEntry = manifestEntries.find(e => e.url === 'index.html');
            if (indexEntry && !isDev) {
              indexEntry.revision = htmlRevision;
            }
            return { manifest: manifestEntries, warnings: [] };
          }
        ]
      },

      // Assets a incluir
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon-180x180.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'maskable-icon-512x512.png'
      ]
    })
  ],

  build: {
    // Configuraciones adicionales para mejorar la compatibilidad
    rollupOptions: {
      output: {
        // Asegurar que los módulos se sirvan con el MIME type correcto
        format: 'es',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Evitar chunks muy pequeños que pueden causar problemas
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          utils: ['class-variance-authority', 'clsx', 'tailwind-merge']
        }
      }
    },
    // Configuraciones para mejorar la compatibilidad con service workers
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: !isDev,
        pure_funcs: isDev ? [] : ['console.log']
      }
    },
    // Asegurar que los assets se generen correctamente
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000
  }
});
