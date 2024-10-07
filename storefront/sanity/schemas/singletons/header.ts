import {InsertAboveIcon} from "@sanity/icons";
import {defineType} from "sanity";

export default defineType({
  __experimental_formPreviewTitle: false,
  fields: [
    {
      hidden: true,
      name: "title",
      title: "Title",
      type: "string",
    },
  ],
  icon: InsertAboveIcon,
  name: "header",
  options: {
    disableCreation: true,
  },
  preview: {
    prepare: () => ({
      title: "Header",
    }),
  },
  title: "Header",
  type: "document",
});
