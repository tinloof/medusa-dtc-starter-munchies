import definePage from "@/sanity/helpers/define-page";

export default definePage({
  fields: [
    {
      group: "content",
      name: "sections",
      type: "sectionsBody",
    },
  ],
  name: "category",
  options: {
    disableCreation: true,
    hideInternalTitle: true,
    hideSeo: true,
    localized: false,
  },
  preview: {
    select: {
      title: "title",
    },
  },
  title: "Category Page",
  type: "document",
});
