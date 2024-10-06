import definePage from "@/sanity/helpers/define-page";
import {defineField} from "sanity";

export default definePage({
  fields: [
    defineField({
      group: "content",
      name: "sections",
      type: "sectionsBody",
    }),
  ],
  name: "categories",
  options: {
    disableCreation: true,
    hideInternalTitle: true,
    hideSeo: true,
    localized: false,
  },
  preview: {
    select: {
      title: "title",
    },
  },
  title: "Category Page",
  type: "document",
});
