import definePage from "@/sanity/helpers/definePage";

export const blogIndex = definePage({
  __experimental_formPreviewTitle: false,
  fields: [
    {
      description:
        "Will only show in the collection's index. Filtered and paginated views won't render this title.",
      group: "content",
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      description:
        "Required. these will show on the collections index when no tags are selected.",
      group: "content",
      name: "featuredPosts",
      of: [{to: [{type: "blog.post"}], type: "reference"}],
      title: "Default Featured posts",
      type: "array",
      validation: (Rule) => Rule.unique().min(1).max(2),
    },
  ],
  name: "blogIndex",
  options: {
    disableCreation: true,
  },
  preview: {
    select: {
      title: "title",
    },
  },
  title: "Blog Index",
  type: "document",
});
