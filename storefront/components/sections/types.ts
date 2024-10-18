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
  countryCode: string;
  /**
   * Data to be spread on the root HTML element of the block
   * @remarks injected by SectionsRenderer.tsx
   */
  rootHtmlAttributes: {
    "data-section": string;
    id: string;
  };
};

export type SectionProps = NonNullable<
  NonNullable<MODULAR_PAGE_QUERYResult>["sections"]
>[number];

export type ModularPageSection<T extends SectionType> = Omit<
  Extract<SectionProps, {_type: T}>,
  "_type"
> &
  SectionInRenderer;

export type SectionList = {
  [K in SectionType]: ComponentType<ModularPageSection<K>>;
};
