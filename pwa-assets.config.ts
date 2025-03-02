import {
  defineConfig,
  minimal2023Preset,
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
  headLinkOptions: {
    preset: "2023",
  },
  preset: {
    ...minimal2023Preset,
    transparent: {
      sizes: [128, 256, 512], // Iconos transparentes personalizados
    },
    maskable: {
      sizes: [512], // Iconos maskable personalizados
    },
    apple: {
      sizes: [180, 192], // Iconos para iOS personalizados
    },
  },
  images: ["public/favicon.svg"],
});
