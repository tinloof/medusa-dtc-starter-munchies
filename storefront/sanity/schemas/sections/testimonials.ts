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
      of: [{to: [{type: "testimonial"}], type: "reference"}],
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
