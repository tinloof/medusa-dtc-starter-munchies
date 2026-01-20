# Sanity + Astro Starter for Cloudflare

A modern, production-ready starter template for building fast, content-managed websites with [Astro](https://astro.build), [Sanity CMS](https://www.sanity.io), and deployed on [Cloudflare Workers](https://workers.cloudflare.com).

## Features

- **Astro 5** with SSR support for Cloudflare Workers
- **Sanity CMS** for content management
  - Headless CMS with real-time preview
  - GROQ queries for efficient data fetching
- **Cloudflare Workers** deployment for edge performance
- **React** integration for interactive components
- **Turborepo** monorepo structure for optimal DX
- **TypeScript** with auto-generated Sanity types
- **PNPM** as the package manager

## Project Structure

```
├── apps/
│   └── web/                 # Astro frontend application
│       ├── src/
│       │   ├── pages/       # Astro pages
│       │   ├── layouts/     # Layout components
│       │   └── lib/         # Utilities and Sanity client
│       ├── public/          # Static assets (including built Sanity Studio)
│       ├── dist/            # Build output for Cloudflare Workers
│       ├── astro.config.mjs # Astro configuration
│       └── wrangler.jsonc   # Cloudflare Workers configuration
│
├── packages/
│   └── sanity/              # Sanity Studio and schema definitions
│       ├── src/
│       │   ├── schema/      # Content schemas (home, documents, objects)
│       │   └── queries/     # GROQ queries
│       └── sanity.config.ts # Sanity configuration
│
├── turbo.json               # Turborepo task configuration
└── package.json             # Root workspace configuration
```

## Prerequisites

- [Node.js](https://nodejs.org) >= 18
- [PNPM](https://pnpm.io/) >= 10
- A [Sanity](https://www.sanity.io) account and project
- A [Cloudflare](https://www.cloudflare.com) account (for deployment)

## Getting Started

### 1. Create Your Project

```bash
# Clone this repository
git clone <your-repo-url> my-project
cd my-project

# Install dependencies
pnpm install
```

### 2. Configure Environment Variables

The easiest way to set up your environment variables is to use the Sanity CLI. This will automatically create the necessary `.env` files with your project credentials:

```bash
# Navigate to the sanity package and run sanity init
cd packages/sanity
npx sanity@latest init --env

# Then copy the environment variables to the web app
cd ../../apps/web
cp ../../packages/sanity/.env .env.local
```

The `sanity init --env` command will:

- Prompt you to log in to your Sanity account (if not already logged in)
- Let you select an existing project or create a new one
- Write the project ID and dataset to a `.env` file

After running the command, you may need to add additional variables to `apps/web/.env.local`:

```env
NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_STUDIO_DATASET=production
NEXT_PUBLIC_URL=http://localhost:3000
SANITY_API_TOKEN=your_api_token
```

#### Manual Configuration (Alternative)

If you prefer to configure manually, create environment files for both the Sanity package and the web app:

**`packages/sanity/.env`**

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

**`apps/web/.env`**

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_API_VERSION=2026-01-16

# Optional: For server-side authenticated requests
SANITY_TOKEN=your_api_token
```

You can find your Project ID in the [Sanity dashboard](https://www.sanity.io/manage).

### 3. Start Development

```bash
pnpm dev
```

This will start:

- **Astro** at [http://localhost:3000](http://localhost:3000)
- **Sanity Studio** at [http://localhost:3333](http://localhost:3333)

For Cloudflare Workers local development:

```bash
pnpm wrangler:dev
```

## Available Scripts

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `pnpm dev`          | Start all apps in development mode            |
| `pnpm build`        | Build all apps for production                 |
| `pnpm wrangler:dev` | Run Astro with Cloudflare Workers locally     |
| `pnpm preview`      | Preview production build                      |
| `pnpm typegen`      | Generate TypeScript types from Sanity schemas |

---

## Working with Sanity

### Schema Structure

Schemas are organized in `packages/sanity/src/schema/`:

```
schema/
├── home.ts        # Homepage document schema
└── index.ts       # Exports all schema types
```

### Adding New Content Types

1. Create a new schema file in `packages/sanity/src/schema/`:

```typescript
// src/schema/page.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "content",
      type: "text",
      title: "Content",
    }),
  ],
});
```

1. Export it from `packages/sanity/src/schema/index.ts`:

```typescript
import home from "./home";
import page from "./page";

export default [home, page];
```

1. Run `pnpm typegen` to update TypeScript types

### Writing GROQ Queries

Define queries in `packages/sanity/src/queries/index.ts`:

```typescript
export const HOME_QUERY = `*[_type == "home"][0] {
  title,
  description
}`;
```

---

## Deployment

### Cloudflare Workers

1. Build the project:

```bash
pnpm build
```

1. Deploy to Cloudflare:

```bash
cd apps/web
npx wrangler deploy
```

The Sanity Studio is built and deployed as part of the Astro app at `/cms`.

### Environment Variables for Production

Set these in your Cloudflare Workers dashboard:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_API_VERSION=2026-01-16
SANITY_TOKEN=your_api_token
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

---

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers)
- [Turborepo Documentation](https://turbo.build/repo/docs)

## License

MIT
