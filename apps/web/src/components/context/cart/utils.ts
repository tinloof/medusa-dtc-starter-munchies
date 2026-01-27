import type { HttpTypes } from "@medusajs/types";

const OPTIMISTIC_ITEM_ID_PREFIX = "__optimistic__";

export function generateOptimisticItemId(variantId: string) {
  return `${OPTIMISTIC_ITEM_ID_PREFIX}-${variantId}`;
}

export function isOptimisticItemId(id: string) {
  return id.startsWith(OPTIMISTIC_ITEM_ID_PREFIX);
}

export function calculateCartTotal(cartItems: HttpTypes.StoreCartLineItem[]) {
  return (
    cartItems.reduce((acc, item) => acc + item.unit_price * item.quantity, 0) ||
    0
  );
}
