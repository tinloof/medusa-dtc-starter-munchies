import definePage from "@/sanity/helpers/define-page";

export default definePage({
  fields: [
    {
      group: "content",
      name: "specs",
      of: [
        {
          fields: [
            {name: "title", title: "Title", type: "string"},
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
