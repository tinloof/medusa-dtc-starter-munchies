import type {MODULAR_PAGE_QUERYResult} from "@/types/sanity.generated";
import type {ComponentType} from "react";

export type SectionType = NonNullable<
  NonNullable<MODULAR_PAGE_QUERYResult>["sections"]
>[number]["_type"];

type SectionInRenderer = {
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
    id: string;
  };
};

export type ModularPageSection<T extends SectionType> = Extract<
  NonNullable<NonNullable<MODULAR_PAGE_QUERYResult>["sections"]>[number],
  {_type: T}
> &
  SectionInRenderer;

export type SectionList = {
  [K in SectionType]: K extends SectionType
    ? ComponentType<ModularPageSection<K>>
    : never;
};
