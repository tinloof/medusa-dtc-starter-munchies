import definePage from "@/sanity/helpers/definePage";
import {imageWithAltField} from "@/sanity/shared/imageWithAltField";
import {BillIcon, TagIcon} from "@sanity/icons";
import {defineField} from "sanity";

export const blogPost = definePage({
  fields: [
    defineField({
      group: "content",
      name: "title",
      title: "Article headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...imageWithAltField,
      description: "Appears in the article's card in the blog",
      group: "content",
      name: "featuredImage",
      options: {
        hotspot: true,
      },
      title: "Featured image",
      validation: undefined,
    }),
    defineField({
      description:
        "Highly recommended to tag the article for search amd filtering purposes.",
      group: "tagging",
      name: "tags",
      of: [
        {
          to: [
            {
              type: "blog.tag",
            },
          ],
          type: "reference",
          weak: true,
        },
      ],
      title: "Article tag",
      type: "array",
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      group: "content",
      name: "body",
      title: "Content",
      type: "ptBody",
      validation: (Rule) => Rule.required(),
    }),
  ],
  groups: [
    {
      icon: TagIcon,
      name: "tagging",
      title: "Classification",
    },
  ],
  icon: BillIcon,
  name: "blog.post",
  preview: {
    select: {
      title: "title",
    },
  },
  title: "Blog Post",
  type: "document",
});
