import { visionTool } from "@sanity/vision";
import { documentOptions } from "@tinloof/sanity-document-options";
import { withExtends } from "@tinloof/sanity-extends";
import { pages } from "@tinloof/sanity-studio";
import { defineConfig, isDev } from "sanity";
import {
  type DocumentLocationResolvers,
  defineLocations,
} from "sanity/presentation";
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";
import config from "@/sanity/config";
import { schemaTypes } from "./src/sanity/schema";

// Resolve document locations for presentation tool navigation
const locations: DocumentLocationResolvers = {
  home: defineLocations({
    select: { pathname: "pathname.current" },
    resolve: (doc) => ({
      locations: [{ title: "Home", href: doc?.pathname || "/" }],
    }),
  }),
  page: defineLocations({
    select: { pathname: "pathname.current" },
    resolve: (doc) => ({
      locations: doc?.pathname
        ? [{ title: doc.pathname, href: doc.pathname }]
        : [],
    }),
  }),
};

export default defineConfig({
  title: config.siteName,
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
  basePath: config.sanity.studioUrl,
  plugins: [
    pages({
      allowOrigins: isDev ? ["http://localhost:3000"] : undefined,
      previewUrl: {
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        locations,
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
    types: withExtends(schemaTypes),
  },
});
