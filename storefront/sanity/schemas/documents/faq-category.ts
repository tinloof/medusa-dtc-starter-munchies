import defineSchema from "@/sanity/helpers/define-schema";
import {OlistIcon} from "@sanity/icons";

export const faqCategory = defineSchema({
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
          to: [{type: "faq.entry"}],
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
    localized: true,
  },
  title: "FAQ category",
  type: "document",
});
