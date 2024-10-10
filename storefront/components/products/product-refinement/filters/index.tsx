import {getCategories} from "@/data/medusa/categories";
import {getCollections} from "@/data/medusa/collections";

import Accordion from "./accordion";
import FilterSelect from "./filter-select";
import MobileFilterDropdown from "./mobile";

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
      <div className="hidden lg:flex lg:items-center lg:gap-2">
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
      </div>
      <div className="flex lg:hidden">
        <MobileFilterDropdown>
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
        </MobileFilterDropdown>
      </div>
    </>
  );
}
