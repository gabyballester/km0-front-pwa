import {
  defineConfig,
  minimal2023Preset,
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
  headLinkOptions: {
    preset: "2023",
  },
  images: ["public/test/favicon.svg"],
  preset: {
    ...minimal2023Preset,
  },
});
