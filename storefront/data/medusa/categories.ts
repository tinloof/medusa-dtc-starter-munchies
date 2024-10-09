import type {Category} from "@/types/sanity.generated";
import type {StoreProductCategory} from "@medusajs/types";

import medusa from "./client";

export async function getCategoryByHandle(handle: string[], page: number) {
  const limit = 12;
  const offset = (page - 1) * limit;

  const category = await medusa.store.category
    .list(
      {
        fields: "+sanity_category.*",
        // @ts-expect-error Type error
        handle: handle[handle.length - 1],
      },
      {next: {tags: ["category"]}},
    )
    .then(
      ({product_categories}) =>
        product_categories[0] as {
          sanity_category: Category;
        } & StoreProductCategory,
    );

  const {count, products} = await medusa.store.product.list(
    {
      category_id: category.id,
      fields: "+images.*,+variants.*",
      limit,
      offset,
    },
    {next: {tags: ["products"]}},
  );

  return {
    category,
    hasNextPage: count > offset + limit,
    products,
  };
}
