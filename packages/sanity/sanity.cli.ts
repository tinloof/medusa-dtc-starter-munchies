import { resolve } from "node:path";
import { loadEnvConfig } from "@next/env";
import { defineCliConfig } from "sanity/cli";
import config from "@/config";

const dev = process.env.NODE_ENV !== "production";
loadEnvConfig(__dirname, dev, { error: console.error, info: () => null });

const projectId = config.sanity.projectId;
const dataset = config.sanity.dataset;

export default defineCliConfig({
  api: { dataset, projectId },
  typegen: {
    path: "**/*.{ts,tsx,js,jsx}",
    schema: "./schema.json",
    generates: "./sanity.types.ts",
  },
  project: {
    basePath: config.sanity.studioUrl,
  },
  vite: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
  },
});
