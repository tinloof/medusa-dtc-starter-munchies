import definePage from "@/sanity/helpers/define-page";

export default definePage({
  __experimental_formPreviewTitle: false,
  fields: [
    {
      group: "content",
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      group: "content",
      name: "sections",
      type: "sectionsBody",
    },
  ],
  name: "home",
  options: {
    disableCreation: true,
  },
  preview: {
    select: {
      title: "title",
    },
  },
  type: "document",
});
