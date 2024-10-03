import {defineField} from "sanity";

export const imageWithAltField = defineField({
  fields: [
    {
      name: "alt",
      title: "Descriptive label for screen readers & SEO",
      type: "string",
    },
  ],
  name: "imageWithAltField",
  options: {
    hotspot: true,
  },
  title: "Image",
  type: "image",
  validation: (Rule) => Rule.required(),
});
