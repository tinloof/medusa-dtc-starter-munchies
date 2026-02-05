import { withCache } from "@/lib/with-cache";
import medusa from "./client";

const BASE_TAG = "products";

export const getProductByHandle = withCache(
  async (handle: string, region_id: string) => {
    const { products } = await medusa.store.product.list({
      fields: "*variants.calculated_price,+variants.inventory_quantity",
      handle,
      region_id,
    });
    return products[0];
  },
  (handle) => [BASE_TAG, `${BASE_TAG}:${handle}`]
);

export const getProductsByIds = withCache(
  (ids: string[], region_id: string) => {
    return medusa.store.product.list({
      id: ids,
      region_id,
    });
  },
  (ids) => [BASE_TAG, ...ids.map((id) => `${BASE_TAG}:${id}`)]
);
