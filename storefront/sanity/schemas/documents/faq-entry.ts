import {HelpCircleIcon} from "@sanity/icons";
import {defineType} from "sanity";

export const faqEntry = defineType({
  description: "Frequently asked questions",
  fields: [
    {
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "answer",
      title: "Answer",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
  ],
  icon: HelpCircleIcon,
  name: "faq.entry",
  options: {
    localized: false,
  },
  preview: {
    prepare({title}) {
      return {
        title: title ? title + " - FAQ" : "FAQ",
      };
    },
    select: {
      title: "question",
    },
  },
  title: "FAQs",
  type: "document",
});
