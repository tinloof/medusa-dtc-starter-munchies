import {getCategories} from "@/data/medusa/categories";
import {getCollections} from "@/data/medusa/collections";

import ClearAllButton from "./clear-button";
import FilterSelect from "./filter-select";
import MobileFilterDropdown from "./mobile";
import Accordion from "./mobile/accordion";

export default async function Filters() {
  const {collections} = await getCollections();
  const {product_categories} = await getCategories();

  const collection_options = collections.map(({id, title}) => ({
    label: title,
    value: id,
  }));
  const category_options = product_categories.map(({id, name}) => ({
    label: name,
    value: id,
  }));

  return (
    <>
      <div className="hidden lg:flex lg:items-center lg:gap-s">
        <FilterSelect
          name="collection"
          options={collection_options}
          placeholder="Collections"
        />
        <FilterSelect
          name="category"
          options={category_options}
          placeholder="Categories"
        />
        <ClearAllButton variant="underline" />
      </div>
      <div className="flex lg:hidden">
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
      </div>
    </>
  );
}
