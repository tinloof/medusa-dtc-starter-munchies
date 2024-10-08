import {StarIcon} from "@sanity/icons";
import {defineType} from "sanity";

export default defineType({
  fields: [
    {
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
  icon: StarIcon,
  name: "testimonial",
  preview: {
    prepare({title}) {
      return {
        title: title ? title + " - Testimonial" : "Testimonial",
      };
    },
    select: {
      title: "author",
    },
  },
  title: "Testimonial",
  type: "document",
});
