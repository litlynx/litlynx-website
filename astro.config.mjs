// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mixpanel from "astrojs-mixpanel";

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
      customPages: ["https://www.litlynx.com/"],
    }),
    mixpanel({
      token: "1e6f55002711b864d0c412b8509f7726",
      config: {
        track_pageview: true,
        persistence: "localStorage",
        batch_requests: true,
        debug: process.env.NODE_ENV === "development",
      },
      autoTrack: true, // Enable automatic page view tracking
      globalProperties: {
        record_sessions_percent: 1, // Session Replay enabled, recording 1% of all sessions
        record_heatmap_data: true, // Enable Heatmap data collection
        ignore_dnt: true,
        app_version: process.env.npm_package_version,
        environment: process.env.NODE_ENV,
      },
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
