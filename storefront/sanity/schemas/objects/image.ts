import {imageWithAltField} from "@/sanity/shared/image-with-alt-field";
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
