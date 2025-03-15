import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      registerType: "autoUpdate", // Actualizaciones automáticas
      injectRegister: "auto", // Auto-registro del SW (usa el virtual module)
      manifest: {
        id: "Km0-PWA",
        name: "km0-pwa-react-ts",
        short_name: "km0-pwa-react-ts",
        description: "km0-pwa-react-ts",
        theme_color: "#ffffff",
        display: "standalone",
        background_color: "#ffffff", // Añadir para mejor compatibilidad
        display_override: ["window-controls-overlay"], // Añadir para mejor compatibilidad
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
            form_factor: "wide", // Para escritorio
          },
          {
            src: "screenshot-mobile.png",
            sizes: "496x846",
            type: "image/png",
            form_factor: "narrow", // Para móviles
          },
        ],
      },

      injectManifest: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
      },

      devOptions: {
        enabled: true,
        // navigateFallback: "index.html", // ya se gestiona desde sw.ts
        // suppressWarnings: true, // puedo usarlo para suprimir warnings molestos en consola
        type: "module",
      },
    }),
  ],
});
