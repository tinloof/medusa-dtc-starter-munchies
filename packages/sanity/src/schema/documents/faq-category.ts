import { OlistIcon } from "@sanity/icons";
import { contentSchemaGroup } from "@tinloof/sanity-studio";
import { defineType } from "sanity";

export const faqCategory = defineType({
  groups: [contentSchemaGroup],
  fields: [
    {
      group: "content",
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      group: "content",
      name: "slug",
      options: {
        source: "title",
      },
      title: "Category's URL-friendly path",
      type: "slug",
    },
    {
      group: "content",
      name: "questions",
      of: [
        {
          name: "question",
          title: "Question",
          to: [{ type: "faq.entry" }],
          type: "reference",
          validation: (Rule) => Rule.required(),
        },
      ],
      title: "Questions",
      type: "array",
      validation: (Rule) => Rule.required(),
    },
  ],
  icon: OlistIcon,
  name: "faq.category",
  options: {
    disableCreation: true,
    structureGroup: "FAQ",
    structureOptions: {
      title: "FAQ categories",
    },
  },
  title: "FAQ category",
  type: "document",
});
