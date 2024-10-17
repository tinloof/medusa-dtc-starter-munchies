import type {StructureBuilder} from "sanity/structure";

type Singleton = {
  _type: string;
  icon?: any;
  title: string;
};

export const SINGLETONS: {
  [key: string]: Singleton;
} = {
  cookieBanner: {
    _type: "cookie.banner",
    title: "Cookie Banner",
  },
  dictionary: {
    _type: "dictionary",
    title: "Dictionary",
  },
  faq: {
    _type: "faq.index",
    title: "FAQ",
  },
  footer: {
    _type: "footer",
    title: "Footer",
  },
  header: {
    _type: "header",
    title: "Header",
  },
  home: {
    _type: "home",
    title: "Home",
  },
  notFound: {
    _type: "not.found",
    title: "Not Found",
  },
  settings: {
    _type: "settings",
    title: "Settings",
  },
} as const;

export const singletonsTypes = new Set(
  Object.values(SINGLETONS).map((singleton) => singleton._type),
);

// Defines actions that should be available for singleton documents
export const singletonActions = new Set([
  "publish",
  "discardChanges",
  "restore",
]);

export const singleton = (S: StructureBuilder, singleton: Singleton) =>
  S.documentTypeListItem(singleton._type).child(
    S.document()
      .title(singleton.title)
      .schemaType(singleton._type)
      .views([S.view.form()]),
  );
