# @apps/web

Astro 5 SSR storefront on Cloudflare.

## Tech Stack

- Astro 5.16 + @astrojs/cloudflare
- React 19 + Tailwind CSS 4
- Sanity v5 (visual editing, embedded studio at /cms)
- Medusa JS SDK
- Stripe payments
- Dynamic OG images (Satori)

## Env Vars

```bash
# Sanity
PUBLIC_SANITY_STUDIO_DATASET=
PUBLIC_SANITY_STUDIO_PROJECT_ID=
SANITY_TOKEN=

# Medusa
MEDUSA_BACKEND_URL=
MEDUSA_PUBLISHABLE_KEY=

# Stripe
PUBLIC_STRIPE_KEY=

# Cloudflare
CF_ZONE_ID=
CF_TOKEN=
```

## Project Structure

```
src/
├── actions/medusa/  # Server actions
├── components/      # React + Astro
├── lib/             # Utilities
├── pages/           # Routes
├── sanity/          # CMS config + schema
└── stores/          # State (nanostores)
```

## Scripts

| Command        | Description           |
| -------------- | --------------------- |
| `pnpm dev`     | Dev server on :3000   |
| `pnpm build`   | Build for production  |
| `pnpm deploy`  | Build + deploy to CF  |
| `pnpm typegen` | Generate Sanity types |
