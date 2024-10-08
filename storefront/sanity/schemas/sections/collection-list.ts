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
      of: [{to: [{type: "collection"}, {type: "category"}], type: "reference"}],
      title: "Cards",
      type: "array",
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
