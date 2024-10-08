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
      name: "collections",
      of: [{to: [{type: "collection"}], type: "reference"}],
      title: "Collections",
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
