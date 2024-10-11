import type {HttpTypes} from "@medusajs/types";

import {omit} from "lodash";

import {getProductsByIds} from "./products";

export async function enrichLineItems(
  lineItems:
    | HttpTypes.StoreCartLineItem[]
    | HttpTypes.StoreOrderLineItem[]
    | null,
  regionId?: string,
) {
  if (!lineItems) return [];

  // Fetch products by their IDs
  const {products} = await getProductsByIds(
    lineItems.map((lineItem) => lineItem.product_id!),
    regionId!,
  );
  // If there are no line items or products, return an empty array
  if (!lineItems?.length || !products) {
    return [];
  }

  // Enrich line items with product and variant information
  const enrichedItems = lineItems.map((item) => {
    const product = products.find((p: any) => p.id === item.product_id);
    const variant = product?.variants?.find(
      (v: any) => v.id === item.variant_id,
    );

    // If product or variant is not found, return the original item
    if (!product || !variant) {
      return item;
    }

    // If product and variant are found, enrich the item
    return {
      ...item,
      variant: {
        ...variant,
        product: omit(product, "variants"),
      },
    };
  }) as HttpTypes.StoreCartLineItem[];

  return enrichedItems;
}
