import {defineField} from "sanity";

export default defineField({
  fields: [
    {
      name: "text",
      of: [{type: "string"}],
      title: "Text",
      type: "array",
      validation: (Rule) => Rule.required(),
    },
  ],
  name: "section.marquee",
  preview: {
    prepare: ({text}) => ({
      subtitle: "Marquee section",
      title: text.join(", "),
    }),
    select: {
      text: "text",
    },
  },
  title: "Marquee section",
  type: "object",
});
