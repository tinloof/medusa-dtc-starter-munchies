import { IceCreamIcon, InsertAboveIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const dictionary = defineType({
  extends: [
    {
      type: "singleton",
      parameters: {
        id: "dictionary",
      },
    },
  ],
  __experimental_formPreviewTitle: false,
  fields: [
    {
      group: "products",
      name: "noResultsText",
      title: "No results text",
      type: "string",
    },
    {
      group: "products",
      name: "noResultsDescription",
      title: "No results description",
      type: "string",
    },
  ],
  groups: [
    {
      icon: IceCreamIcon,
      name: "products",
      title: "Products page",
    },
  ],
  icon: InsertAboveIcon,
  name: "dictionary",
  options: {
    disableCreation: true,
    structureGroup: "Layout",
  },
  preview: {
    prepare: () => ({
      title: "Dictionary",
    }),
  },
  title: "dictionary",
  type: "document",
});
