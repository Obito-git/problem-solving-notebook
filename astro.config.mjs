import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import pagefind from "astro-pagefind";
import astroExpressiveCode from "astro-expressive-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

export default defineConfig({
  site: "https://kernox.me",
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["heading-permalink"],
            ariaLabel: "Link to this section",
          },
          content: { type: "text", value: "#" },
        },
      ],
    ],
  },
  integrations: [
    astroExpressiveCode({
      themes: ["catppuccin-mocha"],
    }),
    sitemap(),
    tailwind(),
    pagefind(),
  ],
});
