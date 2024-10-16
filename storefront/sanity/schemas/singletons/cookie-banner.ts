import {defineType} from "sanity";

export const cookieBanner = defineType({
  description: "Only relevant if you're storing user cookies",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "rejectButton",
      title: "Reject cookies button",
      type: "string",
    },
    {
      name: "acceptButton",
      title: "Accept cookies button",
      type: "string",
    },
  ],
  name: "cookie.banner",
  options: {
    disableCreation: true,
  },
  preview: {
    select: {
      title: "title",
    },
  },
  title: "Cookie banner",
  type: "document",
});
