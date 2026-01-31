import { resolve } from "node:path";
import { defineCliConfig } from "sanity/cli";
import config from "sanity.config";

export default defineCliConfig({
  api: {
    projectId: config.projectId,
    dataset: config.dataset,
  },
  project: {
    basePath: config.basePath,
  },
  typegen: {
    path: "./src/sanity/**/*.{ts,tsx,js,jsx}",
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
