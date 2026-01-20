import config from "@/config";
import { resolve } from "node:path";
import { defineCliConfig } from "sanity/cli";

const dev = process.env.NODE_ENV !== "production";

const projectId = config.sanity.projectId;
const dataset = config.sanity.dataset;

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  project: {
    basePath: config.sanity.studioUrl,
  },
  typegen: {
    path: "**/*.{ts,tsx,js,jsx}",
    schema: "./schema.json",
    generates: "./sanity.types.ts",
  },
  vite: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
  },
});
