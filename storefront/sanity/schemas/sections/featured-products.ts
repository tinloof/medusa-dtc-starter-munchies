import {defineField} from "sanity";

export default defineField({
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "products",
      of: [{to: [{type: "product"}], type: "reference"}],
      title: "Products",
      type: "array",
    },
    {
      name: "cta",
      title: "CTA",
      type: "cta",
    },
  ],
  name: "section.featuredProducts",
  preview: {
    prepare: ({title}) => ({
      subtitle: "Featured products section",
      title: title,
    }),
    select: {
      title: "title",
    },
  },
  title: "Featured products section",
  type: "object",
});
