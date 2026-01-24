import type { MODULAR_PAGE_QUERY_RESULT } from "@packages/sanity/types";
import type { ComponentType } from "react";

export type SectionType = NonNullable<
  NonNullable<MODULAR_PAGE_QUERY_RESULT>["sections"]
>[number]["_type"];

interface SectionInRenderer {
  _key: string;
  /**
   * Index in the parent array.
   * @remarks injected by SectionsRenderer.tsx
   */
  _sectionIndex?: number;
  /**
   * Sibling sections.
   * @remarks injected by SectionsRenderer.tsx
   */
  _sections?: any[];
  _type: SectionType;
  /**
   * Data to be spread on the root HTML element of the block
   * @remarks injected by SectionsRenderer.tsx
   */
  rootHtmlAttributes: {
    "data-section": string;
    id?: string;
  };
}

export type SectionProps = NonNullable<
  NonNullable<MODULAR_PAGE_QUERY_RESULT>["sections"]
>[number];

export type ModularPageSection<T extends SectionType> = Omit<
  Extract<SectionProps, { _type: T }>,
  "_type"
> &
  SectionInRenderer;

export type SectionList = {
  [K in SectionType]: ComponentType<ModularPageSection<K>>;
};

export interface DeepLinkData {
  /**
   * _key of the target deep-linked block
   */
  blockKey?: string;
  /**
   * name of the schema field that contains this block
   */
  fieldName?: string;
  parentDocumentId?: string;
}
