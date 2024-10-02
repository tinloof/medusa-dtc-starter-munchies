import {defineField} from "sanity";

export const seoField = defineField({
  group: "settings",
  name: "seo",
  options: {collapsed: false, collapsible: true},
  title: "SEO & social",
  type: "seo",
});
