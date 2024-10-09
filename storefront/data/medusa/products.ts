import type {Product} from "@/types/sanity.generated";
import type {StoreProduct, StoreProductParams} from "@medusajs/types";

import medusa from "./client";

export async function getProductByHandle(handle: string, region_id: string) {
  return medusa.store.product
    .list(
      {
        fields:
          "*variants.calculated_price,+variants.inventory_quantity,+sanity_product.*",
        handle,
        region_id,
      },
      {next: {tags: ["products"]}},
    )
    .then(
      ({products}) =>
        products[0] as {
          sanity_product: Product;
        } & StoreProduct,
    );
}

export async function getProductsByIds(ids: string[], region_id: string) {
  return medusa.store.product.list(
    {
      id: ids,
      region_id,
    },
    {next: {tags: ["products"]}},
  );
}

export async function getProducts(
  page: number,
  region_id: string,
  query?: Omit<StoreProductParams, "fields" | "limit" | "offset" | "region_id">,
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
}
