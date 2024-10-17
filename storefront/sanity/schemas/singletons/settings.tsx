import {CogIcon} from "@sanity/icons";
import {defineType} from "sanity";

export const settings = defineType({
  __experimental_formPreviewTitle: false,
  fields: [
    {
      hidden: true,
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      description:
        "Will be used as the sharing image of all pages that don't define a custom one in their SEO fields.",
      name: "fallbackOgImage",
      title: "Fallback sharing image",
      type: "ogImage",
      validation: (Rule) => Rule.required(),
    },
  ],
  groups: [
    {
      icon: CogIcon,
      name: "integrations",
      title: "Integrations",
    },
  ],
  icon: CogIcon,
  name: "settings",
  options: {
    disableCreation: true,
  },
  preview: {
    prepare: () => ({
      title: "Settings",
    }),
  },
  title: "Settings",
  type: "document",
});
