import {InputWithCharacterCount} from "@/sanity/lib/components/input-with-characters-count";
import {defineField} from "sanity";

export const seo = defineField({
  fields: [
    {
      components: {
        input: InputWithCharacterCount,
      },
      name: "title",
      options: {
        maxLength: 70,
        minLength: 15,
      },
      title: "Title",
      type: "string",
    },
    {
      components: {
        input: InputWithCharacterCount,
      },
      name: "description",
      options: {
        maxLength: 160,
        minLength: 50,
      },
      rows: 2,
      title: "Short description for SEO & social sharing (meta description)",
      type: "text",
    },
    {
      name: "image",
      title: "Social sharing image",
      type: "ogImage",
    },
    {
      description:
        "Use this in case the content of this page is duplicated elsewhere and you'd like to point search engines to that other URL instead",
      name: "canonicalUrl",
      title: "Custom canonical URL",
      type: "url",
    },
  ],
  name: "seo",
  title: "SEO",
  type: "object",
});
