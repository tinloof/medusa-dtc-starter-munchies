# Medusa B2C Starter

This monorepo serves as a starter template/example for building B2C e-commerce applications using [Medusa](https://medusajs.com/) for e-commerce functionality, [Next.js](nextjs.org/) for the frontend, and [Sanity](https://sanity.io/) for content management.

## Project Setup

To get started with this project, follow these steps:

1. Clone the repository:

```
git clone --depth 1 https://github.com/tinloof/medusa-b2c-starter
```

2. Install dependencies:

This project utilizes pnpm for package management and monorepo functionality. To install dependencies using pnpm, execute the following command:

```
pnpm install
```

## Sanity Setup

To set up Sanity for your project:

1. `cd` into the `frontend` directory:

```
cd frontend
```

2. Run the `sanity init` command:

```
pnpx sanity init --env
```

3. Make sure to append `NEXT_PUBLIC_` where it makes sense in your `.env` file, you can refer to the `.env.example` file in the `frontend` directory.

4. Set the `NEXT_PUBLIC_SANITY_API_VERSION` in `.env` to today's date in the format `YYYY-MM-DD`.

5. Get the `SANITY_API_TOKEN` by navigating to the [Sanity Manage Dashboard](https://www.sanity.io/manage). Choose your project, access the API section, and generate a token with editor permissions.

## Medusa Setup

To set up Medusa for your project:

Once project is deployed

1. Create a Publishable api key in the dashboard settings and set it to `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`

2. Add the URL of the Medusa project to `NEXT_PUBLIC_MEDUSA_BACKEND_URL`

## Running the Project

After you go through the setup steps, you can run the project using the following command from the root directory:

```
pnpm dev
```
