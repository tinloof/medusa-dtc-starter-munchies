import medusa from "./client";

export async function getProductByHandle(handle: string, region_id: string) {
  return medusa.store.product
    .list(
      {
        fields:
          "*variants.calculated_price,+variants.inventory_quantity,sanity_product.*",
        handle,
        region_id,
      },
      {next: {tags: ["products"]}},
    )
    .then(({products}) => products[0]);
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
