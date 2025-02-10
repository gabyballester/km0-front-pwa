import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true, // Habilita el soporte de PWA en desarrollo
        type: "module", // Usa módulos ES para el service worker en desarrollo
      },
      strategies: "injectManifest", // Usa injectManifest para personalizar el service worker
      srcDir: "src", // Carpeta donde está el archivo sw.ts
      filename: "sw.ts", // Nombre del archivo del service worker
      registerType: "autoUpdate", // Actualización automática del service worker
      injectManifest: {
        swDest: "dist/sw.js", // Archivo de salida del service worker
      },
      manifest: {
        name: "Task Management APP",
        short_name: "Taskio",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        theme_color: "#1a1a1a",
        background_color: "#1a1a1a",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
      },
      workbox: {
        globIgnores: [
          "**/@vite/**", // Ignora archivos de Vite
          "**/node_modules/**", // Ignora node_modules
          "**/src/**", // Ignora la carpeta src (solo para desarrollo)
          "**/*.ts", // Ignora archivos TypeScript
          "**/*.tsx", // Ignora archivos TypeScript JSX
        ],
        runtimeCaching: [
          {
            urlPattern: /\.(png|jpg|jpeg|svg|webp)$/, // Cachear imágenes
            handler: "NetworkFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 50, // Máximo 50 entradas en la caché
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[ext]", // Evita el hash en los nombres de los archivos
      },
    },
  },
});
