import { visionTool } from "@sanity/vision";
import { withExtends } from "@tinloof/sanity-extends";
import { pages } from "@tinloof/sanity-studio";
import { defineConfig, isDev } from "sanity";
import { structureTool } from "sanity/structure";
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";
import config from "@/config";
import schemas from "@/schema";
import {
  defaultDocumentNode,
  disableCreationDocumentTypes,
  structure,
} from "@/schema/structure";
import {
  singletonActions,
  singletonsTypes,
} from "@/schema/structure/singletons";

export default defineConfig({
  title: config.siteName,
  basePath: config.sanity.studioUrl,
  dataset: config.sanity.dataset,
  projectId: config.sanity.projectId,
  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonsTypes.has(context.schemaType)
        ? input.filter(({ action }) =>
            !isDev && action ? singletonActions.has(action) : true
          )
        : input,
  },
  plugins: [
    pages({
      allowOrigins: isDev ? ["http://localhost:3000"] : undefined,
      previewUrl: {
        origin: isDev ? "http://localhost:3000" : undefined,
        previewMode: {
          enable: "/api/draft",
        },
      },
      creatablePages: ["modular.page", "text.page"],
    }),
    structureTool({
      defaultDocumentNode,
      structure,
      title: "General",
    }),
    visionTool({ defaultApiVersion: config.sanity.apiVersion }),
    imageHotspotArrayPlugin(),
  ],
  schema: {
    templates: (templates) =>
      templates?.filter(
        (template) =>
          !disableCreationDocumentTypes?.includes(template.schemaType)
      ),
    types: withExtends(schemas),
  },
});
