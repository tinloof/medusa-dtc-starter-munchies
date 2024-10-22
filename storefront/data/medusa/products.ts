import type {StoreProductParams} from "@medusajs/types";

import {unstable_cache} from "next/cache";

import medusa from "./client";

export const getProductByHandle = unstable_cache(
  async function (handle: string, region_id: string) {
    return medusa.store.product
      .list(
        {
          fields: "*variants.calculated_price,+variants.inventory_quantity",
          handle,
          region_id,
        },
        {next: {tags: ["products"]}},
      )
      .then(({products}) => products[0]);
  },
  ["product"],
  {
    revalidate: 120,
  },
);

export const getProductsByIds = unstable_cache(
  async function (ids: string[], region_id: string) {
    return medusa.store.product.list(
      {
        id: ids,
        region_id,
      },
      {next: {tags: ["products"]}},
    );
  },
  ["products"],
  {
    revalidate: 120,
  },
);

export const getProducts = unstable_cache(
  async function (
    page: number,
    region_id: string,
    query?: Omit<
      StoreProductParams,
      "fields" | "limit" | "offset" | "region_id"
    >,
  ) {
    const limit = 12;
    const offset = (page - 1) * limit;

    const {count, products} = await medusa.store.product.list(
      {
        fields: "+images.*,+variants.*,*variants.calculated_price",
        limit,
        offset,
        region_id,
        ...query,
      },
      {next: {tags: ["products"]}},
    );

    return {
      hasNextPage: count > offset + limit,
      products,
    };
  },
  ["products"],
  {
    revalidate: 120,
  },
);
