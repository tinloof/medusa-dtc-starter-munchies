import { defineType } from "sanity";

export default defineType({
  extends: "page",
  fields: [
    {
      hidden: true,
      name: "internalTitle",
      title: "Title",
      description:
        "This title is only used internally in Sanity, it won't be displayed on the website.",
      type: "string",
      group: "settings",
    },
    {
      group: "content",
      name: "specs",
      of: [
        {
          fields: [
            { name: "title", title: "Title", type: "string" },
            {
              name: "content",
              rows: 3,
              title: "Content",
              type: "text",
            },
          ],
          name: "spec",
          type: "object",
        },
      ],
      type: "array",
    },
    {
      fields: [
        { name: "title", title: "Title", type: "string" },
        {
          name: "products",
          of: [{ to: [{ type: "product" }], type: "reference" }],
          title: "Addons",
          type: "array",
          validation: (Rule) => Rule.max(3),
        },
      ],
      name: "addons",
      type: "object",
    },

    {
      group: "content",
      name: "sections",
      type: "sectionsBody",
    },
  ],
  name: "product",
  options: {
    disableCreation: true,
    localized: false,
  },
  preview: {
    select: {
      title: "internalTitle",
    },
  },
  title: "Product Page",
  type: "document",
});
