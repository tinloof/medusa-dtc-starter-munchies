import definePage from "@/sanity/helpers/define-page";

export const faqIndex = definePage({
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
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      fields: [
        {
          name: "searchPlaceholder",
          title: "Search placeholder",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "searchNoResults",
          title: "Search no results",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
      group: "content",
      name: "textTranslations",
      title: "Text translations",
      type: "object",
      validation: (Rule) => Rule.required(),
    },
    {
      group: "content",
      name: "category",
      of: [
        {
          name: "title",
          title: "Category title",
          to: [{type: "faq.category"}],
          type: "reference",
          validation: (Rule) => Rule.required(),
        },
      ],
      title: "Category",
      type: "array",
      validation: (Rule) => Rule.required(),
    },
  ],
  name: "faq.index",
  options: {
    disableCreation: true,
  },
  preview: {
    select: {
      title: "title",
    },
  },
  title: "Faq Index",
  type: "document",
});
