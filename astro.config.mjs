// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.litlynx.com",
  integrations: [tailwind(), vue(), sitemap()],
  output: "static",
  build: {
    format: "directory",
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});
