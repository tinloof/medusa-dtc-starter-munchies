import {defineField} from "sanity";

export default defineField({
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "cards",
      of: [
        {
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
          ],
          name: "card",
          title: "Card",
          type: "object",
        },
      ],
      title: "Cards",
      type: "array",
      validation: (Rule) => Rule.required().min(3).max(3),
    },
  ],
  name: "section.assurance",
  preview: {
    prepare: ({title}) => ({
      subtitle: "Assurance section",
      title: title,
    }),
    select: {
      title: "title",
    },
  },
  title: "Assurance section",
  type: "object",
});
