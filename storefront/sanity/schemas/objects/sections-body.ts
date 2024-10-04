import {defineType} from "sanity";

import sections from "../sections";

// Differs from ptBody in that it specializes in adding & reordering sections.
export const sectionsBody = defineType({
  name: "sectionsBody",
  of: sections.map((section) => ({
    type: section.name,
  })),
  options: {
    insertMenu: {
      views: [
        {
          name: "grid",
          previewImageUrl: (type) => `/sections/${type}.png`,
        },
      ],
    },
  },
  title: "Sections content",
  type: "array",
});
