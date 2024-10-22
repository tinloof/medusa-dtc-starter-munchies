import type {Category} from "@/types/sanity.generated";
import type {StoreProductCategory} from "@medusajs/types";

import {unstable_cache} from "next/cache";

import medusa from "./client";

export const getCategoryByHandle = unstable_cache(
  async function (handle: string[], page: number) {
    const limit = 12;
    const offset = (page - 1) * limit;

    const category = await medusa.store.category
      .list(
        {
          fields: "+sanity_category.*",
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
  },
  ["category"],
  {
    revalidate: 120,
  },
);

export const getCategories = unstable_cache(
  async function () {
    return await medusa.store.category.list(
      {fields: "id,name"},
      {next: {tags: ["categories"]}},
    );
  },
  ["categories"],
  {
    revalidate: 120,
  },
);
