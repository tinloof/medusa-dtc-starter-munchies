import {getCategories} from "@/data/medusa/categories";
import {getCollections} from "@/data/medusa/collections";

import FilterSelect from "./filter-select";

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
    <div className="flex items-center gap-2">
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
  );
}
