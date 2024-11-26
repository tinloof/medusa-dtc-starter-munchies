import { defineConfig, loadEnv, Modules } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV, process.cwd());

export default defineConfig({
  projectConfig: {
    redisUrl: process.env.REDIS_URL,
    databaseUrl: process.env.DATABASE_URL,
    databaseLogging: true,
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    workerMode: process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server",
  },
  admin: {
    // backendUrl: "https://munchies.medusajs.app",
    backendUrl: process.env.BACKEND_URL || "http://localhost:9000",
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    path: (process.env.ADMIN_PATH || `/app`) as `/${string}`,
  },
  modules: [
    {
      resolve: "./modules/sanity",
      options: {
        api_token: process.env.SANITY_API_TOKEN,
        project_id: process.env.SANITY_PROJECT_ID,
        api_version: new Date().toISOString().split("T")[0],
        dataset: process.env.SANITY_DATASET || "production",
        // studio_url: "https://munchies-tinloof.vercel.app/cms",
        studio_url: process.env.SANITY_STUDIO_URL || "http://localhost:9000/cms",
        type_map: {
          collection: "collection",
          category: "category",
          product: "product",
        },
      },
    },
    {
      resolve: "@medusajs/file",
      key: Modules.FILE,
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-s3",
            id: "s3",
            options: {
              authentication_method: "s3-iam-role",
              file_url: process.env.S3_FILE_URL,
              region: process.env.S3_REGION,
              bucket: process.env.S3_BUCKET,
              endpoint: process.env.S3_ENDPOINT,
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/payment",
      key: Modules.PAYMENT,
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY,
            },
          },
        ],
      },
    },
  ],
});
