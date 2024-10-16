import {InfoOutlineIcon, InsertAboveIcon} from "@sanity/icons";
import {defineField, defineType} from "sanity";

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
            },
            {
              name: "cards",
              of: [
                {
                  fields: [
                    {
                      name: "image",
                      title: "Image",
                      type: "image",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "title",
                      title: "Title",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "cta",
                      title: "CTA",
                      type: "cta",
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  type: "object",
                },
              ],
              title: "Cards",
              type: "array",
              validation: (Rule) =>
                Rule.custom((cards, context) => {
                  const cardsArray = cards as any[];
                  const columns = (context.parent as {columns?: any[]})
                    ?.columns;
                  if (!columns) return true;
                  const maxProducts = columns.length === 3 ? 2 : 3;
                  if (cardsArray && cardsArray.length > maxProducts) {
                    return `Maximum ${maxProducts} product cards allowed for ${columns.length} columns`;
                  }
                  return true;
                })
                  .required()
                  .min(2),
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
    defineField({
      group: "cart",
      name: "cartAddons",
      of: [{to: [{type: "product"}], type: "reference"}],
      title: "Addons",
      type: "array",
      validation: (Rule) => Rule.max(3),
    }),
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
    {name: "cart", title: "Cart"},
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
