// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_SANITY_STUDIO_PROJECT_ID: envField.string({ context: "server", access: "public", optional: false }),
      PUBLIC_SANITY_STUDIO_DATASET: envField.string({ context: "server", access: "public", optional: false }),
      SANITY_TOKEN: envField.string({ context: "server", access: "secret", optional: false })
    }
  },
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: cloudflare(),
  integrations: [react()],
});
