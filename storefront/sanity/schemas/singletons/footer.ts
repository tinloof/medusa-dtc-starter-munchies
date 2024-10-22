import type {PortableTextBlock} from "@portabletext/types";

import {EnvelopeIcon, InsertBelowIcon, LinkIcon} from "@sanity/icons";
import {defineType} from "sanity";

type RichText = PortableTextBlock[];
const richTextToPlainText = (richText: RichText) => {
  if (Array.isArray(richText)) {
    return richText
      .map((block) => block.children.map((child) => child.text).join(""))
      .join("\n");
  }
  return "";
};

export default defineType({
  __experimental_formPreviewTitle: false,
  fields: [
    {
      hidden: true,
      name: "title",
      title: "Title",
      type: "string",
    },

    {
      group: "topLinks",
      name: "information",
      of: [
        {
          fields: [
            {
              name: "text",
              type: "ptBody",
            },
          ],
          preview: {
            prepare({title}) {
              return {
                title: richTextToPlainText(title) || "line",
              };
            },
            select: {
              title: "text",
            },
          },
          type: "object",
        },
      ],
      title: "Information",
      type: "array",
    },
    {
      group: "topLinks",
      name: "linkList",
      of: [
        {
          fields: [
            {
              name: "links",
              of: [
                {
                  type: "cta",
                },
              ],
              type: "array",
            },
          ],
          preview: {
            prepare: ({links}) => ({
              title: links
                .map((link: {label: string}) => link.label)
                .join(", "),
            }),
            select: {
              links: "links",
            },
          },
          type: "object",
        },
      ],
      title: "Link list",
      type: "array",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      group: "newsletter",
      name: "copy",
      title: "Newsletter Copy",
      type: "ptBody",
    },
    {
      group: "newsletter",
      name: "signup_success",
      title: "Signup success message",
      type: "ptBody",
    },
    {
      group: "newsletter",
      name: "signup_error",
      title: "Signup error message",
      type: "ptBody",
    },
    {
      group: "newsletter",
      name: "placeholder",
      title: "Input placeholder",
      type: "string",
    },
    {
      group: "newsletter",
      name: "button",
      title: "Newsletter button",
      type: "string",
    },
    {
      group: "newsletter",
      name: "footnote",
      title: "Newsletter footnote",
      type: "ptBody",
    },
    {
      group: "bottomLinks",
      name: "bottomLinks",
      of: [
        {
          type: "cta",
        },
      ],
      title: "Bottom links",
      type: "array",
    },
    {
      group: "bottomLinks",
      name: "socialLinks",
      of: [
        {
          type: "cta",
        },
      ],
      title: "Social links",
      type: "array",
    },
  ],
  groups: [
    {
      icon: EnvelopeIcon,
      name: "newsletter",
      title: "Newsletter",
    },
    {
      default: true,
      icon: LinkIcon,
      name: "topLinks",
      title: "Top links",
    },
    {
      icon: LinkIcon,
      name: "bottomLinks",
      title: "Bottom links",
    },
  ],
  icon: InsertBelowIcon,
  name: "footer",
  options: {
    disableCreation: true,
  },
  preview: {
    prepare: () => ({
      title: "Footer",
    }),
  },
  title: "Footer",
  type: "document",
});
