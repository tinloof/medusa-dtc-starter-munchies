import medusa from "./client";

export async function getProductByHandle(handle: string, region_id: string) {
  const { products } = await medusa.store.product.list({
    fields: "*variants.calculated_price,+variants.inventory_quantity",
    handle,
    region_id,
  });
  return products[0];
}

export function getProductsByIds(ids: string[], region_id: string) {
  return medusa.store.product.list({
    id: ids,
    region_id,
  });
}
