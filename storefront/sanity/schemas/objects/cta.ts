import {defineType} from "sanity";

import {link} from "./link";

export const cta = defineType({
  fields: [
    {
      name: "label",
      title: "Button label",
      type: "string",
    },
    {
      name: "link",
      type: "link",
      validation: (Rule) =>
        Rule.custom((value, {parent}) => {
          if ((parent as any)?.label) {
            return value ? true : "Required";
          }
          return true;
        }),
    },
  ],
  icon: link.icon,
  name: "cta",
  title: "CTA",
  type: "object",
});
