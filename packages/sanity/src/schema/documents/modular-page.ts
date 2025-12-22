import { defineType } from "sanity";

export default defineType({
  extends: "page",
  fields: [
    {
      group: "content",
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      group: "content",
      name: "sections",
      type: "sectionsBody",
    },
  ],
  name: "modular.page",
  preview: {
    select: {
      title: "title",
    },
  },
  title: "Modular Page",
  type: "document",
});
