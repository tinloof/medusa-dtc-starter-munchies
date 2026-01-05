import { drizzle } from "drizzle-orm/node-postgres";

const medusaDatabaseUrl = process.env.MEDUSA_DATABASE_URL;

if (!medusaDatabaseUrl) {
  throw new Error("Missing MEDUSA_DATABASE_URL env var");
}

export const medusaDb = drizzle(medusaDatabaseUrl);
