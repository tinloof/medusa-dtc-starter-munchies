# @apps/search

Cloudflare Workers search service using Orama.

## Overview

- Orama 3.1 search engine
- Product search from Medusa
- Deployed as Cloudflare Worker

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Local dev server |
| `pnpm build` | Build (dry-run deploy) |
| `pnpm deploy` | Sync + deploy to CF |
| `pnpm sync` | Sync products from Medusa |

## Config

See `wrangler.jsonc` for worker configuration.
