import {defineField} from "sanity";

export const ogImage = defineField({
  description:
    "Highly encouraged for increasing conversion rates for links to this page shared in social media.",
  name: "ogImage",
  options: {
    hotspot: true,
  },
  title: "Social sharing image",
  type: "image",
});
