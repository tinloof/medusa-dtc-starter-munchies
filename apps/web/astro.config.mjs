// @ts-check
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  env: {
    schema: {
      PUBLIC_SANITY_STUDIO_PROJECT_ID: envField.string({
        context: "server",
        access: "public",
        optional: false,
      }),
      PUBLIC_SANITY_STUDIO_DATASET: envField.string({
        context: "server",
        access: "public",
        optional: false,
      }),
      SANITY_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
    },
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: cloudflare(),
});
