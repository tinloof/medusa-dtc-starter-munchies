import { Suspense } from "react";
import { getFacetedFilters } from "@/data/medusa/facets";
import EmptyDropdown from "../empty-dropdown";
import ClearAllButton from "./clear-button";
import FilterSelect from "./filter-select";
import MobileFilterDropdown from "./mobile";
import Accordion from "./mobile/accordion";

type FiltersProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function Filters(props: FiltersProps) {
  const collectionsParams =
    typeof props.searchParams.collection === "string"
      ? props.searchParams.collection?.split(",")
      : [];
  const categoriesParams =
    typeof props.searchParams.category === "string"
      ? props.searchParams.category.split(",")
      : [];

  const facetedFilters = await getFacetedFilters({
    collections: collectionsParams,
    categories: categoriesParams,
  });

  const collection_options = facetedFilters
    .filter(
      (f) =>
        f.facet_name === "collection_id" &&
        (f.count > 0 || collectionsParams.includes(f.facet_value))
    )
    .map((f) => ({
      label: f.title,
      value: f.facet_value,
    }));

  const category_options = facetedFilters
    .filter(
      (f) =>
        f.facet_name === "category_id" &&
        (f.count > 0 || categoriesParams.includes(f.facet_value))
    )
    .map((f) => ({
      label: f.title,
      value: f.facet_value,
    }));

  return (
    <>
      <div className="hidden lg:flex lg:items-center lg:gap-s">
        <Suspense fallback={<EmptyDropdown placeholder="Collections" />}>
          <FilterSelect
            name="collection"
            options={collection_options}
            placeholder="Collections"
          />
        </Suspense>
        <Suspense fallback={<EmptyDropdown placeholder="Categories" />}>
          <FilterSelect
            name="category"
            options={category_options}
            placeholder="Categories"
          />
        </Suspense>
        <ClearAllButton variant="underline" />
      </div>
      <div className="flex lg:hidden">
        <Suspense fallback={<EmptyDropdown placeholder="Filter" />}>
          <MobileFilterDropdown>
            <div className="flex flex-col gap-xs p-xs">
              <Accordion
                heading="Collections"
                name="collection"
                options={collection_options}
              />
              <Accordion
                heading="Categories"
                name="categroy"
                options={category_options}
              />
            </div>
          </MobileFilterDropdown>
        </Suspense>
      </div>
    </>
  );
}
