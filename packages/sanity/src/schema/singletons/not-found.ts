import { AccessDeniedIcon } from "@sanity/icons";
import definePage from "@/helpers/define-page";

export const notFound = definePage({
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
  },
  preview: {
    prepare: () => ({
      title: "Not Found Page",
    }),
  },
  title: "Not Found Page",
  type: "document",
});
