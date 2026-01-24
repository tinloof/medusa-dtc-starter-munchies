import medusa from "./client";

export function getProductsByIds(ids: string[], region_id: string) {
  return medusa.store.product.list({
    id: ids,
    region_id,
  });
}
