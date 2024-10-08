import {InfoOutlineIcon, InsertAboveIcon} from "@sanity/icons";
import {defineType} from "sanity";

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
      group: "announcement",
      name: "showAnnouncement",
      title: "Show announcement bar",
      type: "boolean",
    },
    {
      group: "announcement",
      name: "announcementText",
      title: "Announcement bar text",
      type: "lightPtBody",
    },
    {
      group: "navigation",
      name: "navigation",
      of: [
        {
          fields: [
            {
              name: "cta",
              title: "CTA",
              type: "cta",
            },
          ],
          name: "link",
          preview: {
            select: {
              title: "cta.label",
            },
          },
          type: "object",
        },
        {
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "columns",
              of: [
                {
                  fields: [
                    {
                      name: "title",
                      title: "Title",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "links",
                      of: [
                        {
                          name: "link",
                          title: "Link",
                          type: "cta",
                        },
                      ],
                      title: "Links",
                      type: "array",
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: "title",
                    },
                  },
                  type: "object",
                },
              ],
              type: "array",
              validation: (Rule) => Rule.required().min(2).max(3),
            },
            {
              description:
                "If you have 3 columns, you can only show 2 products in the dropdown.",
              name: "products",
              of: [{to: [{type: "product"}], type: "reference"}],
              title: "Products",
              type: "array",
              validation: (Rule) => Rule.required().min(2).max(3),
            },
          ],
          name: "dropdown",
          title: "Dropdown",
          type: "object",
        },
      ],
      title: "Navigation",
      type: "array",
    },
  ],
  groups: [
    {
      icon: InfoOutlineIcon,
      name: "announcement",
      title: "Announcement bar",
    },
    {
      icon: InsertAboveIcon,
      name: "navigation",
      title: "Navigation",
    },
  ],
  icon: InsertAboveIcon,
  name: "header",
  options: {
    disableCreation: true,
  },
  preview: {
    prepare: () => ({
      title: "Header",
    }),
  },
  title: "Header",
  type: "document",
});
