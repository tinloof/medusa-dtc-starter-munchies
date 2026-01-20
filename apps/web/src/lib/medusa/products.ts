import medusa from "./client";

export async function getProductsByIds(ids: string[], regionId: string) {
  return medusa.store.product.list({
    id: ids,
    region_id: regionId,
    fields: "*variants.calculated_price,+variants.inventory_quantity",
  });
}

export async function getProductByHandle(handle: string, regionId: string) {
  const { products } = await medusa.store.product.list({
    fields: "*variants.calculated_price,+variants.inventory_quantity",
    handle,
    region_id: regionId,
  });
  return products[0];
}
