import {defineType} from "sanity";

export default defineType({
  __experimental_formPreviewTitle: false,
  fields: [
    {
      hidden: true,
      name: "internalTitle",
      title: "Title",
      type: "string",
    },
  ],
  name: "collection",
  options: {
    disableCreation: true,
  },
  preview: {
    select: {
      title: "internalTitle",
    },
  },
  title: "Collection",
  type: "document",
});
