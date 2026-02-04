# Munchies

E-commerce platform built with Astro + Cloudflare.

## Tech Stack

- Astro 5 (SSR) + Cloudflare Workers/Pages
- Medusa v2 backend
- Sanity v5 CMS
- Orama search (Cloudflare Workers)
- React 19, Tailwind CSS 4, Stripe

## Prerequisites

- Node.js >= 18
- pnpm 9+
- PostgreSQL
- Redis (optional)

## Quick Start

```bash
pnpm install
# Copy .env files in each app
pnpm dev
```

## Monorepo Structure

```
apps/
├── web/            # Astro storefront
├── medusa-backend/ # E-commerce backend
└── search/         # Search service
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps |
| `pnpm build` | Build all apps |
| `pnpm typegen` | Generate types |
| `pnpm check` | Lint check |
| `pnpm fix` | Auto-fix lint |
