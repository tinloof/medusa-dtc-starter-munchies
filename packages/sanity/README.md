# @packages/sanity

Sanity Studio configuration, schemas, and shared queries for the Munchies platform.

## Overview

This package contains:

- **Sanity Studio** – Content management interface
- **Content Schemas** – Document and object type definitions
- **GROQ Queries** – Shared queries used by the storefront
- **TypeScript Types** – Auto-generated types from schemas

## Getting Started

### Prerequisites

- Node.js >= 18
- Sanity project (create one at [sanity.io/manage](https://sanity.io/manage))

### Environment Variables

Create a `.env` file in this directory (see `.env.template` for reference):

```env
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=production
```

### Development

From the monorepo root:

```bash
pnpm dev --filter=@packages/sanity
```

Or from this directory:

```bash
pnpm dev
```

Sanity Studio will be available at [http://localhost:3333](http://localhost:3333).

> **Note:** In production, Sanity Studio is embedded in the Next.js app at `/cms`.

## Project Structure

```
├── src/
│   ├── components/         # Custom input components
│   │   └── input-with-characters-count.tsx
│   │
│   ├── helpers/            # Schema helpers
│   │   ├── define-page.ts
│   │   ├── define-schema.ts
│   │   ├── image-with-alt-field.ts
│   │   └── seo-field.ts
│   │
│   ├── queries/            # GROQ queries
│   │   ├── index.ts
│   │   └── section.ts
│   │
│   ├── schema/             # Content schemas
│   │   ├── documents/      # Document types
│   │   ├── objects/        # Object types
│   │   ├── sections/       # Section types
│   │   ├── singletons/     # Singleton documents
│   │   └── structure/      # Studio structure
│   │
│   └── config.ts           # Shared configuration
│
├── sanity.config.ts        # Studio configuration
├── sanity.cli.ts           # CLI configuration
├── sanity.types.ts         # Generated TypeScript types
└── schema.json             # Extracted schema (for typegen)
```

## Type Generation

Generate TypeScript types from your schemas:

```bash
pnpm typegen
```

This creates:

- `schema.json` – Extracted schema definition
- `sanity.types.ts` – TypeScript types for all document and object types

For watch mode during development:

```bash
pnpm typegen:watch
```

## Exported Modules

This package exports the following for use in other apps:

```typescript
// GROQ queries
import { homeQuery, pageQuery, ... } from '@packages/sanity/queries';

// TypeScript types
import type { Product, Collection, Page, ... } from '@packages/sanity/types';
```

## Plugins

The studio is configured with:

- **[@tinloof/sanity-studio](https://github.com/tinloof/sanity-kit)** – Pages plugin for visual editing
- **[@sanity/vision](https://www.sanity.io/plugins/vision)** – GROQ query playground
- **[sanity-plugin-hotspot-array](https://www.sanity.io/plugins/sanity-plugin-hotspot-array)** – Image hotspots

## Scripts

| Script               | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `pnpm dev`           | Start Sanity Studio in development mode                        |
| `pnpm build`         | Build studio for production (outputs to `apps/web/public/cms`) |
| `pnpm typegen`       | Generate TypeScript types from schemas                         |
| `pnpm typegen:watch` | Watch mode for type generation                                 |

## Building for Production

The studio is built as a static site and deployed alongside the Next.js app:

```bash
pnpm build
```

This outputs the built studio to `apps/web/public/cms/`, making it accessible at `/cms` on the storefront.

## Useful Links

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Cheat Sheet](https://www.sanity.io/docs/groq-cheat-sheet)
- [Sanity UI Components](https://www.sanity.io/ui)
- [Tinloof Sanity Kit](https://github.com/tinloof/sanity-kit)
