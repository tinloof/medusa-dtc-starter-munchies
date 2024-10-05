import type {StructureBuilder} from "sanity/structure";

type Singleton = {
  _type: string;
  icon?: any;
  title: string;
};

export const SINGLETONS: {
  [key: string]: Singleton;
} = {
  footer: {
    _type: "footer",
    title: "Footer",
  },
  home: {
    _type: "home",
    title: "Home",
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
