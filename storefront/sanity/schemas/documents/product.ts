import definePage from "@/sanity/helpers/define-page";
import {LuShirt} from "react-icons/lu";

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
        {name: "internalTitle", title: "Title", type: "string"},
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
      title: "internalTitle",
      createdAt: "_createdAt",
      updatedAt: "_updatedAt",
    },
    prepare(selection) {
      const {title, createdAt, updatedAt} = selection;
      return {
        title: title,
        subtitle: createdAt === updatedAt
          ? `created ${new Date(createdAt).toLocaleDateString()}`
          : `updated ${new Date(updatedAt).toLocaleDateString()}`,
        media: LuShirt,
      };
    },
  },
  title: "Product Page",
  type: "document",
});
