import {defineField} from "sanity";

export default defineField({
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
  name: "section.centeredText",
  title: "Centered text section",
  type: "object",
});
