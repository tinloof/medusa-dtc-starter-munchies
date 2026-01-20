import { visionTool } from "@sanity/vision";
import { documentOptions } from '@tinloof/sanity-document-options';
import { withExtends } from '@tinloof/sanity-extends';
import { pages } from "@tinloof/sanity-studio";
import { defineConfig, isDev } from "sanity";
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array';

import config from "@/config";
import schemas from "./src/schema";
import "./globals.css"



export default defineConfig({
  title: config.siteName,
  dataset: config.sanity.dataset,
  projectId: config.sanity.projectId,
  plugins: [
    pages({
      allowOrigins: isDev ? ["http://localhost:3000"] : undefined,
      previewUrl: {
        origin: isDev ? "http://localhost:3000" : undefined,
      },
      creatablePages: ["modular.page", "text.page"],
    }),
    documentOptions({
      structure: {
        hide: ["modular.page", "home", "testimonial", "text.page"],
        toolTitle: "Structure",
      },
    }),
    visionTool({ defaultApiVersion: config.sanity.apiVersion }),
    imageHotspotArrayPlugin(),
  ],
  schema: {
    types: withExtends(schemas),
  },
});
