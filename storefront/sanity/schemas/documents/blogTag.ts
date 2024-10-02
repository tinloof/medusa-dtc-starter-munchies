import {isUnique} from "@/sanity/lib/utils";
import {TagIcon} from "@sanity/icons";
import {defineType} from "sanity";

export const blogTag = defineType({
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      options: {
        isUnique,
        source: "title",
      },
      title: "Tag's URL-friendly path",
      type: "slug",
    },
    {
      description:
        "Required. these will show on the collections index when this tag is selected.",
      name: "featuredPosts",
      of: [{to: [{type: "blog.post"}], type: "reference", weak: true}],
      title: "Featured posts",
      type: "array",
      validation: (Rule) => Rule.unique().min(1).max(2),
    },
  ],
  icon: TagIcon,
  name: "blog.tag",
  options: {
    localized: false,
  },
  preview: {
    prepare({title}) {
      return {
        title,
      };
    },
    select: {
      title: "title",
    },
  },
  title: "Blog tag",
  type: "document",
});
