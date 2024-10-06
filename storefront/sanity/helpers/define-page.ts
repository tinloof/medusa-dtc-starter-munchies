import type {DocumentDefinition} from "sanity";

import {ComposeIcon} from "@sanity/icons";
import {definePathname} from "@tinloof/sanity-studio";
import {uniqBy} from "lodash";
import {defineField} from "sanity";

import type {SchemaDefinition} from "./define-schema";

import {seoField} from "../shared/seo-field";
import defineSchema from "./define-schema";

type PageDefinition = {
  options?: {
    disableIndexableStatus?: boolean;
    hidePathnameField?: boolean;
    hideSeo?: boolean;
  } & SchemaDefinition["options"];
} & Omit<DocumentDefinition, "options">;

export default function definePage(schema: PageDefinition) {
  const groups = uniqBy(
    [
      {
        default: true,
        icon: ComposeIcon,
        name: "content",
        title: "Content",
      },
      ...(schema.groups || []),
    ],
    "name",
  );

  return defineSchema({
    ...schema,
    fields: [
      defineField({
        ...definePathname(),
        group: "settings",
        hidden: schema.options?.hidePathnameField,
        readOnly: schema.options?.disableCreation,
      }),
      defineField({
        description:
          "This title is only used internally in Sanity, it won't be displayed on the website.",
        group: "settings",
        hidden: schema.options?.hideInternalTitle,
        name: "internalTitle",
        title: "Internal title",
        type: "string",
      }),
      defineField({
        description:
          "Won't show up in Google if set to false, but accessible through URL.",
        group: "settings",
        hidden: schema.options?.disableIndexableStatus,
        initialValue: true,
        name: "indexable",
        type: "boolean",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        ...seoField,
        group: "settings",
        hidden: schema.options?.hideSeo,
      }),
      ...schema.fields,
    ].filter(Boolean),
    groups,
    options: {
      ...(schema.options ?? {}),
    },
    preview: {
      select: {
        subtitle: "pathname.current",
        title: "internalTitle",
      },
      ...schema.preview,
    },
  });
}
