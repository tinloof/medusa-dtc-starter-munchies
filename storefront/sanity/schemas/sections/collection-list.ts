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
      name: "cards",
      of: [
        {
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "cta",
              title: "Call to action",
              type: "cta",
              validation: (Rule) => Rule.required(),
            },
          ],
          name: "collectionCard",
          preview: {
            select: {
              title: "cta.label",
            },
          },
          title: "Collection Card",
          type: "object",
        },
      ],
      title: "Cards",
      type: "array",
      validation: (Rule) => Rule.required().min(3).max(3),
    },
  ],
  name: "section.collectionList",
  preview: {
    prepare: ({title}) => ({
      subtitle: "Collection list section",
      title: title,
    }),
    select: {
      title: "title",
    },
  },
  title: "Collection list section",
  type: "object",
});
