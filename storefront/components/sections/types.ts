export type SectionInRenderer = {
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
  _type: string;

  localeId: string;

  /**
   * Data to be spread on the root HTML element of the block
   * @remarks injected by SectionsRenderer.tsx
   */
  rootHtmlAttributes: {
    "data-section": string;
    id: string;
  };
};
