import { DocumentTextIcon } from "@sanity/icons";
import definePage from "@/helpers/define-page";

export const textPage = definePage({
  fields: [
    {
      group: "content",
      name: "title",
      title: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      group: "content",
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      group: "content",
      name: "body",
      title: "Content",
      type: "ptBody",
      validation: (Rule) => Rule.required(),
    },
  ],
  icon: DocumentTextIcon,
  name: "text.page",
  preview: {
    select: {
      title: "title",
    },
  },
  title: "Text Page",
  type: "document",
});
