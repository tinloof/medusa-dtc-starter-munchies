// @ts-check
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
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
      PUBLIC_MEDUSA_BACKEND_URL: envField.string({
        context: "server",
        access: "public",
        optional: false,
      }),
      PUBLIC_MEDUSA_PUBLISHABLE_KEY: envField.string({
        context: "server",
        access: "public",
        optional: false,
      }),
    },
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@medusajs/js-sdk"],
    },
  },
  adapter: cloudflare(),
});
