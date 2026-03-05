import { defineConfig, loadEnv, Modules } from "@medusajs/framework/utils";
import type { SanityModuleOptions } from "@tinloof/medusa-sanity-sync/types";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

export default defineConfig({
  featureFlags: {
    caching: true,
  },
  projectConfig: {
    redisUrl: process.env.REDIS_URL,
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS ?? "",
      adminCors: process.env.ADMIN_CORS ?? "",
      authCors: process.env.AUTH_CORS ?? "",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  plugins: [
    {
      resolve: "@tinloof/medusa-sanity-sync",
      options: {
        api_token: process.env.SANITY_API_TOKEN ?? "",
        project_id: process.env.SANITY_PROJECT_ID ?? "",
        api_version: new Date().toISOString().split("T")[0],
        dataset: "production",
        studio_url: "https://munchies.tinloof.com/cms",
        transformer: (entityType: string, data: Record<string, unknown>) => {
          switch (entityType) {
            case "product":
              return {
                internalTitle: data.title,
                pathname: {
                  _type: "slug",
                  current: `/products/${data.handle}`,
                },
              };
            case "product_category":
              return {
                internalTitle: data.name,
                pathname: {
                  _type: "slug",
                  current: `/categories/${data.handle}`,
                },
              };
            case "product_collection":
              return {
                internalTitle: data.title,
                pathname: {
                  _type: "slug",
                  current: `/collections/${data.handle}`,
                },
              };
            default:
              return data;
          }
        },
        batching: {
          enabled: false
        }
      } satisfies SanityModuleOptions,
    },
  ],
  modules: [
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
