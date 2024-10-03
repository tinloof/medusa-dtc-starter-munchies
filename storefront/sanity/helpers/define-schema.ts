import type {DocumentDefinition, SortOrdering} from "sanity";

import {CogIcon, ComposeIcon} from "@sanity/icons";
import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import {uniqBy} from "lodash";

export type SchemaDefinition = {
  options?: {
    disableCreation?: boolean;
    hideInternalTitle?: boolean;
    localized?: boolean;
    orderable?: boolean;
  };
} & Omit<DocumentDefinition, "options">;

export default function defineSchema(schema: SchemaDefinition) {
  const groups = uniqBy(
    [
      {
        default: schema?.groups?.some((group) => group.default) ? false : true,
        icon: ComposeIcon,
        name: "content",
        title: "Content",
      },
      {
        icon: CogIcon,
        name: "settings",
        title: "Settings",
      },
      ...(schema.groups || []),
    ].filter(Boolean),
    "name",
  );

  return {
    ...schema,
    fields: uniqBy(
      [
        ...(schema.options?.orderable
          ? [orderRankField({type: schema.name})]
          : []),
        ...schema.fields,
      ].filter(Boolean),
      "name",
    ),
    groups,
    orderings: schema.options?.orderable
      ? [...(schema.orderings || []), orderRankOrdering as SortOrdering]
      : schema.orderings,
  };
}
