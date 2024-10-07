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
      name: "testimonials",
      of: [
        {
          fields: [
            {
              name: "text",
              title: "Text",
              type: "text",
              validation: (Rule) => Rule.required().max(215),
            },
            {
              name: "author",
              title: "Author",
              type: "string",
            },
          ],
          name: "testimonial",
          title: "Testimonial",
          type: "object",
        },
      ],
      title: "Testimonials",
      type: "array",
      validation: (Rule) => Rule.required().min(4).max(10),
    },
  ],
  name: "section.testimonials",
  preview: {
    prepare: ({title}) => ({
      subtitle: "Testimonials section",
      title: title,
    }),
    select: {
      title: "title",
    },
  },
  title: "Testimonials section",
  type: "object",
});
