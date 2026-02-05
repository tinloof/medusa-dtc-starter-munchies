import type { HttpTypes } from "@medusajs/types";
import type { AstroCookies } from "astro";
import medusa from "./client";
import { getCartId } from "./cookies";
import { enrichLineItems } from "./line-items";

export async function getCart(cookies: AstroCookies) {
  const cartId = getCartId(cookies);

  if (!cartId) {
    return null;
  }

  return await medusa.store.cart
    .retrieve(cartId, {
      fields:
        "+items, +region, +items.product.*, +items.variant.image, +items.variant.*, +items.thumbnail, +items.metadata, +promotions.*,",
    })
    .then(
      ({ cart }) =>
        cart as {
          promotions?: HttpTypes.StoreCartPromotion[];
        } & HttpTypes.StoreCart
    )
    .catch(() => null);
}

export async function getEnrichedCart(cookies: AstroCookies) {
  const cart = await getCart(cookies);

  if (!cart) {
    return null;
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id);
    cart.items = enrichedItems as HttpTypes.StoreCartLineItem[];
  }

  return cart;
}
