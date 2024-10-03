import definePage from "@/sanity/helpers/define-page";
import {defineField} from "sanity";

export default definePage({
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      group: "content",
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      group: "content",
      name: "sections",
      type: "sectionsBody",
    }),
  ],
  name: "home",
  options: {
    disableCreation: true,
  },
  preview: {
    select: {
      title: "title",
    },
  },
  type: "document",
});
