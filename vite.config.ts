import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createHash } from "crypto";
import { readFileSync } from "fs";
import { resolve } from "path";

const isDev = process.env.NODE_ENV === "development";

// Función para generar hash MD5

// Calcula la revisión de index.html (útil para evitar problemas de caché en producción)
const htmlRevision = !isDev
  ? createHash("md5")
      .update(readFileSync(resolve(__dirname, "index.html")))
      .digest("hex")
  : "dev-html-revision";

// Función para resolver rutas relativas
const applyToPath = (url: string) => path.resolve(__dirname, url);

export default defineConfig({
  base: "/", // Ajusta si la app está en un subdirectorio
  server: {
    host: "localhost",
    port: 3000,
    strictPort: true,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 3000,
    },
  },
  resolve: {
    alias: {
      "@": applyToPath("./src"),
    },
  },

  plugins: [
    react(),
    VitePWA({
      // Usamos la estrategia de injectManifest para mayor control
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "autoUpdate", // Permite actualizaciones automáticas
      injectRegister: "auto", // Auto-registro del SW mediante el módulo virtual
      manifest: {
        id: "Km0-PWA",
        name: "km0-pwa-react-ts",
        short_name: "km0-pwa-react-ts",
        description: "km0-pwa-react-ts",
        theme_color: "#ffffff",
        display: "standalone",
        background_color: "#ffffff",
        display_override: ["window-controls-overlay"],
        start_url: "/",
        scope: "/",
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
        screenshots: [
          {
            src: "screenshot-desktop.png",
            sizes: "1280x800",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "screenshot-mobile.png",
            sizes: "496x846",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
        globIgnores: [
          "**/@vite/*", // Excluir el core de Vite
          "**/react-refresh/*", // Excluir HMR
          "**/*.map", // Excluir source maps
          "**/sw*.ts", // Excluir el service worker fuente
          "**/workbox-*.js", // Excluir librerías de Workbox
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: { maxEntries: 20 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
        navigateFallbackDenylist: [
          // Excluir rutas de API
          /^\/api\//,
          /^\/auth\//,
          /\.(?:png|jpg|jpeg|svg|json|xml|webp)$/,
        ],
      },
      injectManifest: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,webp,woff2}",
          "offline.html",
        ],
        globIgnores: [
          "**/sw*.ts",
          "**/workbox-*.js",
          "**/node_modules/**",
          "**/__tests__/**",
          "**/coverage/**",
          ...(isDev ? ["**/@vite/**", "**/react-refresh/**"] : []),
        ],
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        manifestTransforms: [
          (manifestEntries) => {
            const indexEntry = manifestEntries.find(
              (e) => e.url === "index.html"
            );
            if (indexEntry && !isDev) {
              indexEntry.revision = htmlRevision;
            }
            return { manifest: manifestEntries, warnings: [] };
          },
        ],
      },
      includeAssets: [
        "**/*.woff2",
        "assets/**/*",
        "/favicon.ico",
        "pwa-192x192.png",
        "screenshot-desktop.png",
        "manifest.webmanifest",
      ],
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        type: "module",
        navigateFallback: "index.html",
      },
    }),
  ],
});
