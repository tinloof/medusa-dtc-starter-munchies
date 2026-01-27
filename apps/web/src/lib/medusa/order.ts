import type { HttpTypes } from "@medusajs/types";
import medusa from "./client";
import medusaError from "./error";
import { enrichLineItems } from "./line-items";

export async function getOrder(id: string) {
  try {
    const { order } = await medusa.store.order.retrieve(id, {
      fields: "*payment_collections.payments",
    });
    return order;
  } catch (err) {
    return medusaError(err);
  }
}

export async function getEnrichedOrder(id: string) {
  const order = await getOrder(id);

  if (!order) {
    return null;
  }

  if (order?.items?.length) {
    const enrichedItems = await enrichLineItems(
      order?.items,
      order?.region_id ?? ""
    );
    order.items = enrichedItems as HttpTypes.StoreOrderLineItem[];
  }

  return order;
}
