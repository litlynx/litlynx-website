// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.litlynx.com",
  integrations: [
    tailwind(),
    vue(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      entryLimit: 10000,
      // You can add custom sitemap entries here
      customPages: [
        "https://www.litlynx.com/",
        "https://www.litlynx.com/services/",
        "https://www.litlynx.com/about/",
        "https://www.litlynx.com/contact/",
      ],
    }),
  ],
  output: "static",
  build: {
    format: "directory",
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  // Enhanced SEO and performance
  compressHTML: true,
  scopedStyleStrategy: "class",
});
