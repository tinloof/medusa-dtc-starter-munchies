import {imageWithAltField} from "@/sanity/shared/imageWithAltField";
import {defineField} from "sanity";

export const imageBlock = defineField({
  fields: [
    {
      ...imageWithAltField,
      name: "image",
      options: {
        hotspot: true,
      },
    },
    {name: "caption", title: "Caption", type: "string"},
  ],
  name: "imageBlock",
  title: "Image",
  type: "object",
});
