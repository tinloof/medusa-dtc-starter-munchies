import {defineSection} from "@tinloof/sanity-studio";

export default defineSection({
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
  name: "section.hero",
  options: {
    variants: [
      {
        assetUrl: "/sections/hero.png",
      },
    ],
  },
  title: "Hero section",
  type: "object",
});
