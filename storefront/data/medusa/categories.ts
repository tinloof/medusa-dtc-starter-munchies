import type {Category} from "@/types/sanity.generated";
import type {StoreProductCategory} from "@medusajs/types";

import medusa from "./client";

export async function getCategoryByHandle(handle: string[]) {
  return medusa.store.category
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
}
