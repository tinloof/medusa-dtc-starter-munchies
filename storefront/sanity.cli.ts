import config from "@/config";
import {loadEnvConfig} from "@next/env";
import {defineCliConfig} from "sanity/cli";

const dev = process.env.NODE_ENV !== "production";
loadEnvConfig(__dirname, dev, {error: console.error, info: () => null});

const projectId = config.sanity.projectId;
const dataset = config.sanity.dataset;

export default defineCliConfig({
  api: {dataset, projectId},
  typegen: {
    path: "**/*.{ts,tsx,js,jsx}",
    schema: "./types/schema.json",
    generates: "./types/sanity.generated.d.ts",
  },
});
