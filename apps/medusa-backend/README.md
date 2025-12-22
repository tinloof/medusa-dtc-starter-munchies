# @apps/medusa-backend

Medusa v2 e-commerce backend for the Munchies platform.

## Overview

This is the commerce engine powering the storefront, built with:

- **Medusa v2** – Modern, modular e-commerce framework
- **Admin Dashboard** – Built-in admin UI for managing products, orders, and customers
- **Sanity Sync** – Automatic synchronization of products, collections, and categories to Sanity CMS
- **Stripe Payments** – Secure payment processing

## Getting Started

### Prerequisites

- Node.js >= 20
- PostgreSQL database
- Redis (optional, for caching)
- Stripe account

### Environment Variables

Create a `.env` file in this directory (see `.env.template` for reference):

```env
# Database
DATABASE_URL=postgres://user:password@localhost:5432/medusa

# Redis (optional)
REDIS_URL=

# Security
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret

# Backend URL
MEDUSA_BACKEND_URL=http://localhost:9000

# CORS
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:9000

# Stripe
STRIPE_API_KEY=

# Resend (for emails)
RESEND_API_KEY=

# Medusa Publishable Key (for internal API calls)
MEDUSA_PUBLISHABLE_KEY=

# Sanity
SANITY_API_TOKEN=
SANITY_PROJECT_ID=

# S3 Storage (optional)
S3_FILE_URL=
S3_REGION=
S3_BUCKET=
S3_ENDPOINT=
```

### Database Setup

Run database migrations:

```bash
pnpm medusa db:migrate
```

Seed the database with sample data:

```bash
pnpm seed
```

### Create Admin User

```bash
pnpm add-user
# Creates: admin@medusa.com / supersecret
```

### Development

From the monorepo root:

```bash
pnpm dev --filter=@apps/medusa-backend
```

Or from this directory:

```bash
pnpm dev
```

- **Backend API**: [http://localhost:9000](http://localhost:9000)
- **Admin Dashboard**: [http://localhost:9000/app](http://localhost:9000/app)

## Project Structure

```
├── src/
│   ├── admin/
│   │   ├── hooks/          # Admin React hooks
│   │   ├── lib/            # Admin utilities
│   │   ├── routes/         # Custom admin routes
│   │   └── widgets/        # Admin dashboard widgets
│   │
│   ├── api/
│   │   ├── admin/          # Custom admin API routes
│   │   ├── store/          # Custom storefront API routes
│   │   ├── query/          # GraphQL-like query routes
│   │   └── trigger/        # Webhook triggers
│   │
│   ├── modules/
│   │   └── sanity/         # Sanity integration module
│   │
│   ├── subscribers/        # Event subscribers
│   │   ├── newsletter-sub.ts
│   │   ├── order-created.ts
│   │   ├── order-shipped.ts
│   │   ├── sanity-category-sync.ts
│   │   ├── sanity-collection-sync.ts
│   │   └── sanity-product-sync.ts
│   │
│   ├── workflows/          # Custom workflows
│   │   ├── sanity-full-sync.ts
│   │   ├── sanity-sync-categories.ts
│   │   ├── sanity-sync-collections.ts
│   │   ├── sanity-sync-products.ts
│   │   └── subscribe-to-newsletter.ts
│   │
│   └── scripts/
│       └── seed.ts         # Database seeding script
│
├── integration-tests/      # HTTP integration tests
├── medusa-config.ts        # Medusa configuration
└── jest.config.js          # Test configuration
```

## Sanity Sync

This backend automatically syncs data to Sanity CMS via event subscribers:

| Event                      | Action                          |
| -------------------------- | ------------------------------- |
| Product created/updated    | Syncs product data to Sanity    |
| Collection created/updated | Syncs collection data to Sanity |
| Category created/updated   | Syncs category data to Sanity   |

To trigger a full sync manually, use the workflow in the admin dashboard or run:

```bash
pnpm medusa exec ./src/workflows/sanity-full-sync.ts
```

## Custom Modules

### Sanity Module

Located in `src/modules/sanity/`, this module provides:

- Sanity client configuration
- Type mappings between Medusa and Sanity
- Sync utilities

## Scripts

| Script                       | Description                    |
| ---------------------------- | ------------------------------ |
| `pnpm dev`                   | Start development server       |
| `pnpm build`                 | Build for production           |
| `pnpm start`                 | Start production server        |
| `pnpm seed`                  | Seed database with sample data |
| `pnpm add-user`              | Create admin user              |
| `pnpm test:integration:http` | Run HTTP integration tests     |
| `pnpm test:unit`             | Run unit tests                 |

## API Endpoints

### Store API

Base URL: `http://localhost:9000/store`

Standard Medusa store endpoints plus custom routes in `src/api/store/`.

### Admin API

Base URL: `http://localhost:9000/admin`

Standard Medusa admin endpoints plus custom routes in `src/api/admin/`.

## Useful Links

- [Medusa Documentation](https://docs.medusajs.com/)
- [Medusa v2 Migration Guide](https://docs.medusajs.com/upgrade-guides)
- [Medusa Discord](https://discord.com/invite/medusajs)
