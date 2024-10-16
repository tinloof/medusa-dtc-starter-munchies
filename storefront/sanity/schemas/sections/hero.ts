import {defineField} from "sanity";

export default defineField({
  fields: [
    {
      initialValue: "image",
      name: "mediaType",
      options: {
        layout: "dropdown",
        list: [
          {title: "Image", value: "image"},
          {title: "Large Image", value: "largeImage"},
          {title: "Video", value: "video"},
        ],
      },
      title: "Media type",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      hidden: ({parent}) => parent?.mediaType !== "image",
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "cta",
      title: "Call to action",
      type: "cta",
      validation: (Rule) => Rule.required(),
    },
    {
      hidden: ({parent}) => parent?.mediaType !== "image",
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) =>
        Rule.custom((value, {parent}) => {
          const parentType = parent as {mediaType?: string};
          return parentType?.mediaType === "image" && !value
            ? "Required"
            : true;
        }),
    },
    {
      hidden: ({parent}) => parent?.mediaType !== "largeImage",
      name: "largeImage",
      title: "Large Image",
      type: "image",
      validation: (Rule) =>
        Rule.custom((value, {parent}) => {
          const parentType = parent as {mediaType?: string};
          return parentType?.mediaType === "largeImage" && !value
            ? "Required"
            : true;
        }),
    },
    {
      hidden: ({parent}) => parent?.mediaType !== "video",
      name: "video",
      title: "Video",
      type: "video",
      validation: (Rule) =>
        Rule.custom((value, {parent}) => {
          const parentType = parent as {mediaType?: string};
          return parentType?.mediaType === "video" && !value
            ? "Required"
            : true;
        }),
    },
  ],
  name: "section.hero",
  preview: {
    prepare: ({image, title}) => ({
      media: image,
      subtitle: "Hero section",
      title: title,
    }),
    select: {
      image: "image",
      title: "title",
    },
  },
  title: "Hero section",
  type: "object",
});
