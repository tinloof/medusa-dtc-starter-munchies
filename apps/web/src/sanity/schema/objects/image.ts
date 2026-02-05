import { defineField } from "sanity";
import { imageWithAltField } from "@/sanity/helpers/image-with-alt-field";

export const imageBlock = defineField({
  fields: [
    {
      ...imageWithAltField,
      name: "image",
      options: {
        hotspot: true,
      },
    },
    { name: "caption", title: "Caption", type: "string" },
  ],
  name: "imageBlock",
  title: "Image",
  type: "object",
});
