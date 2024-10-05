import {LinkIcon} from "@sanity/icons";
import {defineType} from "sanity";

export const link = defineType({
  description: "e.g. https://example.com or /products/product-variant",
  icon: LinkIcon,
  name: "link",
  title: "Link",
  type: "string",
  validation: (Rule) => Rule.required(),
});
