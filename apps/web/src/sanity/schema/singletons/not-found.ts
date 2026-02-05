import { AccessDeniedIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const notFound = defineType({
  extends: [
    "page",
    {
      type: "singleton",
      parameters: {
        id: "notFound",
      },
    },
  ],
  __experimental_formPreviewTitle: false,
  fields: [
    {
      name: "text",
      title: "Text",
      type: "string",
    },
    {
      name: "cta",
      title: "CTA",
      type: "cta",
    },
  ],
  icon: AccessDeniedIcon,
  name: "not.found",
  options: {
    disableCreation: true,
    structureGroup: "Layout",
  },
  preview: {
    prepare: () => ({
      title: "Not Found Page",
    }),
  },
  title: "Not Found Page",
  type: "document",
});
