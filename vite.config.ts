import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  IconResource,
  ManifestOptions,
  VitePWA,
  VitePWAOptions,
} from "vite-plugin-pwa";

type ScreenshotType = {
  src: string;
  sizes: string;
  label?: string;
  platform?:
    | "android"
    | "ios"
    | "kaios"
    | "macos"
    | "windows"
    | "windows10x"
    | "chrome_web_store"
    | "play"
    | "itunes"
    | "microsoft-inbox"
    | "microsoft-store"
    | string;
  form_factor?: "narrow" | "wide";
  type?: string;
};

const icons: IconResource[] = [
  {
    src: "pwa-64x64.png",
    sizes: "64x64",
    type: "image/png",
  },
  {
    src: "pwa-128x128.png",
    sizes: "128x128",
    type: "image/png",
  },
  {
    src: "pwa-192x192.png",
    sizes: "192x192",
    type: "image/png",
  },
  {
    src: "pwa-256x256.png",
    sizes: "256x256",
    type: "image/png",
  },
  {
    src: "/pwa-512x512.png",
    sizes: "512x512",
    type: "image/png",
  },
  {
    src: "maskable-icon-512x512.png",
    sizes: "512x512",
    type: "image/png",
    purpose: "maskable",
  },
];

const screenshots: ScreenshotType[] = [
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
];

const manifest: Partial<ManifestOptions> = {
  id: "/", // Usa el start_url como id
  theme_color: "#f69435",
  background_color: "#f69435",
  display: "standalone",
  scope: "/",
  start_url: "/",
  short_name: "Km0 PWA",
  description: "Km0 PWA Demo",
  name: "Km0 PWA",
  icons,
  screenshots,
  display_override: ["window-controls-overlay"],
};

const vitePWAconfig: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  devOptions: {
    enabled: true,
  },
  workbox: {
    globPatterns: ["**/*"],
  },
  includeAssets: ["**/*"],
  manifest,
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(vitePWAconfig)],
  // server: {
  //   https: true, // Habilita HTTPS en local
  // },
});
