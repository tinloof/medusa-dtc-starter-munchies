# @apps/web

Next.js 16 storefront for the Munchies e-commerce platform.

## Overview

This is the customer-facing storefront built with:

- **Next.js 16** – App Router, Server Components, Server Actions
- **React 19** – Latest React features
- **Tailwind CSS v4** – CSS-first configuration
- **Sanity** – Content management and live preview
- **Medusa JS SDK** – E-commerce functionality

## Getting Started

### Prerequisites

- Node.js >= 18
- Running Medusa backend (on port 9000)
- Sanity project configured

### Environment Variables

Create a `.env` file in this directory:

```env
# Medusa
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your-sanity-token
SANITY_REVALIDATE_SECRET=your-revalidate-secret
```

### Development

From the monorepo root:

```bash
pnpm dev --filter=@apps/web
```

Or from this directory:

```bash
pnpm dev
```

The storefront will be available at [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
```

## Project Structure

```
├── app/
│   ├── [countryCode]/
│   │   ├── (checkout)/     # Checkout flow pages
│   │   ├── (website)/      # Main website pages
│   │   └── layout.tsx
│   ├── api/                # API routes
│   └── globals.css         # Global styles
│
├── actions/                # Server actions
│   ├── medusa/             # Cart, order actions
│   └── newsletter/         # Newsletter subscription
│
├── components/
│   ├── global/             # Header, footer, cookie banner
│   ├── products/           # Product listing, refinement
│   ├── sections/           # Page sections (hero, testimonials, etc.)
│   └── shared/             # Reusable UI components
│
├── data/
│   ├── medusa/             # Medusa API client and data fetching
│   └── sanity/             # Sanity client and queries
│
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript types
├── utils/                  # Utility functions
└── config.ts               # App configuration
```

## Features

### Internationalization

The storefront supports multiple countries/regions with URL-based routing (`/us/`, `/gb/`, `/de/`, etc.). The country code determines:

- Currency and pricing
- Available shipping options
- Regional content

### Sanity CMS Integration

- **Live Preview** – See content changes in real-time with draft mode
- **Visual Editing** – Click-to-edit integration via Sanity Studio
- **Sections** – Modular page builder with reusable sections

### E-commerce

- Product catalog with filtering and search
- Shopping cart with server-side state
- Checkout flow with Stripe integration
- Order tracking and history

## Scripts

| Script           | Description                  |
| ---------------- | ---------------------------- |
| `pnpm dev`       | Start development server     |
| `pnpm build`     | Build for production         |
| `pnpm start`     | Start production server      |
| `pnpm typecheck` | Run TypeScript type checking |
