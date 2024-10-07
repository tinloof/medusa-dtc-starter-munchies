import definePage from "@/sanity/helpers/define-page";
import {defineField} from "sanity";

export default definePage({
  fields: [
    defineField({
      group: "content",
      name: "specs",
      of: [
        {
          fields: [
            defineField({name: "title", title: "Title", type: "string"}),
            defineField({
              name: "content",
              rows: 3,
              title: "Content",
              type: "text",
            }),
          ],
          name: "spec",
          type: "object",
        },
      ],
      type: "array",
    }),
    defineField({
      fields: [
        {name: "title", title: "Title", type: "string"},
        {
          name: "products",
          of: [{to: [{type: "product"}], type: "reference"}],
          title: "Addons",
          type: "array",
          validation: (Rule) => Rule.max(3),
        },
      ],
      name: "addons",
      type: "object",
    }),

    defineField({
      group: "content",
      name: "sections",
      type: "sectionsBody",
    }),
  ],
  name: "product",
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
  title: "Product Page",
  type: "document",
});
