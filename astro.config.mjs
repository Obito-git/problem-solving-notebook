import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";
import astroExpressiveCode from 'astro-expressive-code'

export default defineConfig({
  site: "https://kernox.me",
  integrations: [
    astroExpressiveCode({
      themes: ["catppuccin-mocha"],
    }),
    sitemap(),
    tailwind(),
    pagefind(),
  ],
});
