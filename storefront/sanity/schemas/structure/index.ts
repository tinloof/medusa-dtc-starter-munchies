import type {
  DefaultDocumentNodeResolver,
  StructureBuilder,
  StructureResolver,
} from "sanity/structure";

import {DashboardIcon} from "@sanity/icons";
import {isDev} from "sanity";

import {SINGLETONS, singleton} from "./singletons";

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S) => {
  return S.document().views([S.view.form()]);
};

const devStructureItems = (S: StructureBuilder) => {
  if (!isDev) {
    return [];
  }
  // These documuments are already available in the pages view.
  // In order to avoid duplication and confusion for content editors, these documents are only available in dev mode.
  return [
    singleton(S, SINGLETONS.home),
    S.documentTypeListItem("modular.page"),
  ];
};

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Structure")
    .items([
      ...devStructureItems(S),
      S.documentTypeListItem("product"),
      S.documentTypeListItem("category"),
      S.documentTypeListItem("collection"),

      S.listItem()
        .title("Layout")
        .icon(DashboardIcon)
        .child(
          S.list()
            .title("Layout")
            .items([
              singleton(S, SINGLETONS.header),
              singleton(S, SINGLETONS.footer),
              singleton(S, SINGLETONS.notFound),
              singleton(S, SINGLETONS.cookieBanner),
              singleton(S, SINGLETONS.dictionary),
            ]),
        ),
      S.listItem()
        .title("Faq")
        .child(
          S.list()
            .id("faq")
            .items([
              singleton(S, SINGLETONS.faq),
              S.documentTypeListItem("faq.category").title("Faq categories"),
              S.documentTypeListItem("faq.entry").title("Faq entries"),
            ]),
        ),
      singleton(S, SINGLETONS.settings),
      // You can update the structure here to add document related to general settings or content other than pages.
      // You can also add documents that needs to have a custom view like a manually ordered list for example.
    ]);

const disabledSingletons = () => {
  if (!isDev) {
    return [
      ...Object.entries(SINGLETONS).map(
        ([
          /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
          key,
          value,
        ]) => value._type,
      ),
    ];
  }

  return [];
};

export const disableCreationDocumentTypes = [
  // Disable singletons document creation only in production
  ...disabledSingletons(),
];
