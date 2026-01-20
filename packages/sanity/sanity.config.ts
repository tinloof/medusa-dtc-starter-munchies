import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/schema";

export default defineConfig({
  name: "default",
  title: "Munchies CF",
  projectId: process.env["SANITY_STUDIO_PROJECT_ID"] || "",
  dataset: process.env["SANITY_STUDIO_DATASET"] || "",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
