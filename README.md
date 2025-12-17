# Munchies – Medusa DTC Starter

A production-ready monorepo for building modern DTC (Direct-to-Consumer) e-commerce experiences using [Medusa](https://medusajs.com/) for commerce, [Next.js](https://nextjs.org/) for the storefront, and [Sanity](https://sanity.io/) for content management.

Built with [Turborepo](https://turbo.build/repo) for fast, efficient builds across the entire stack.

---

## What's Inside

This monorepo contains the following apps and packages:

### Apps

| App                       | Description                                                                    | Port   |
| ------------------------- | ------------------------------------------------------------------------------ | ------ |
| **`apps/web`**            | Next.js 16 storefront with App Router, Tailwind CSS v4, and Sanity integration | `3000` |
| **`apps/medusa-backend`** | Medusa v2 backend with admin dashboard, Sanity sync, and Stripe payments       | `9000` |

### Packages

| Package               | Description                                              |
| --------------------- | -------------------------------------------------------- |
| **`packages/sanity`** | Sanity Studio configuration, schemas, and shared queries |

---

## Prerequisites

- **Node.js** >= 18 (backend requires >= 20)
- **pnpm** >= 9.0.0
- **PostgreSQL** database
- **Redis** (optional, for caching)
- **Stripe** account (for payments)
- **Sanity** project

---

## Getting Started

### 1. Clone the Repository

```bash
git clone --depth 1 https://github.com/tinloof/medusa-dtc-starter-munchies.git
cd medusa-dtc-starter-munchies
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create `.env` files in each app/package directory. Below are the required variables:

#### `apps/medusa-backend/.env`

```env
# Database
DATABASE_URL=postgres://user:password@localhost:5432/medusa

# Redis (optional)
REDIS_URL=

# Security
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret

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

#### `apps/web/.env`

```env
# Medusa
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_KEY=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=
SANITY_REVALIDATE_SECRET=
```

#### `packages/sanity/.env`

```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

### 4. Set Up Sanity

If starting fresh, initialize Sanity in the `packages/sanity` directory:

```bash
cd packages/sanity
pnpx sanity init --env
```

To get your `SANITY_API_TOKEN`:

1. Go to [Sanity Manage Dashboard](https://www.sanity.io/manage)
2. Select your project
3. Navigate to **API** → **Tokens**
4. Create a token with **Editor** permissions

### 5. Set Up Medusa

Run database migrations and seed data:

```bash
cd apps/medusa-backend
pnpm medusa db:migrate
pnpm seed
```

Create an admin user:

```bash
pnpm add-user
# Creates: admin@medusa.com / supersecret
```

### 6. Set Up Publishable API Key

1. Start the Medusa backend: `pnpm dev --filter=@apps/medusa-backend`
2. Open the admin dashboard at `http://localhost:9000/app`
3. Go to **Settings** → **API Key Management** → **Publishable API Keys**
4. Create a new key and copy it to `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` in `apps/web/.env`

---

## Development

Run all apps and packages in development mode:

```bash
pnpm dev
```

Or run specific apps:

```bash
# Run only the storefront
pnpm dev --filter=@apps/web

# Run only the Medusa backend
pnpm dev --filter=@apps/medusa-backend

# Run only Sanity Studio
pnpm dev --filter=@packages/sanity
```

### Available Scripts

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `pnpm dev`         | Start all apps in development mode |
| `pnpm build`       | Build all apps and packages        |
| `pnpm check-types` | Run TypeScript type checking       |
| `pnpm typegen`     | Generate Sanity TypeScript types   |

---

## Build

Build all apps for production:

```bash
pnpm build
```

Build specific apps:

```bash
pnpm build --filter=@apps/web
pnpm build --filter=@apps/medusa-backend
```

---

## Project Structure

```
├── apps/
│   ├── medusa-backend/     # Medusa v2 e-commerce backend
│   │   ├── src/
│   │   │   ├── admin/      # Admin dashboard customizations
│   │   │   ├── api/        # Custom API routes
│   │   │   ├── modules/    # Custom modules (Sanity sync)
│   │   │   ├── subscribers/# Event subscribers
│   │   │   └── workflows/  # Custom workflows
│   │   └── medusa-config.ts
│   │
│   └── web/                # Next.js 16 storefront
│       ├── app/            # App Router pages
│       ├── components/     # React components
│       ├── data/           # Data fetching (Medusa & Sanity)
│       ├── actions/        # Server actions
│       └── config.ts
│
├── packages/
│   └── sanity/             # Sanity Studio & schemas
│       ├── src/
│       │   ├── schema/     # Content schemas
│       │   └── queries/    # GROQ queries
│       ├── sanity.config.ts
│       └── sanity.types.ts # Generated types
│
├── turbo.json              # Turborepo configuration
├── pnpm-workspace.yaml     # pnpm workspace config
└── package.json            # Root package.json
```

---

## Key Features

- **🛒 Medusa v2** – Modern, modular e-commerce backend
- **⚡ Next.js 16** – App Router, Server Components, Server Actions
- **📝 Sanity CMS** – Flexible content management with live preview
- **🎨 Tailwind CSS v4** – Modern styling with CSS-first configuration
- **💳 Stripe Payments** – Secure payment processing
- **🔄 Sanity Sync** – Automatic product/collection sync to CMS
- **🚀 Turborepo** – Fast, cached builds across the monorepo
- **📦 pnpm** – Efficient package management

---

## Tech Stack

| Layer               | Technology           |
| ------------------- | -------------------- |
| **Commerce**        | Medusa v2.12         |
| **Storefront**      | Next.js 16, React 19 |
| **CMS**             | Sanity v4            |
| **Styling**         | Tailwind CSS v4      |
| **Payments**        | Stripe               |
| **Monorepo**        | Turborepo            |
| **Package Manager** | pnpm                 |

---

## Useful Links

- [Medusa Documentation](https://docs.medusajs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)

---

## License

MIT
