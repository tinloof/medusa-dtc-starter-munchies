"use server";

import type {StoreUpdateCart} from "@medusajs/types";

import {getCart} from "@/data/medusa/cart";
import medusa from "@/data/medusa/client";
import {
  getAuthHeaders,
  getCacheTag,
  getCartId,
  setCartId,
} from "@/data/medusa/cookies";
import {getRegion} from "@/data/medusa/regions";
import medusaError from "@/utils/medusa/error";
import {revalidateTag} from "next/cache";

async function createCart(region_id: string) {
  const body = {
    region_id,
  };

  const cartResp = await medusa.store.cart.create(
    body,
    {
      fields:
        "+items, +region, +items.product.*, +items.variant.image, +items.variant.*, +items.thumbnail, +items.metadata, +promotions.*,",
    },
    await getAuthHeaders(),
  );
  await setCartId(cartResp.cart.id);
  revalidateTag(await getCacheTag("carts"));

  return cartResp.cart;
}

export async function getOrSetCart(countryCode: string) {
  let cart = await getCart();
  const region = await getRegion(countryCode);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  if (!cart) {
    cart = await createCart(region.id);
  }

  const cacheTag = await getCacheTag("carts");

  if (cart && cart?.region_id !== region.id) {
    await medusa.store.cart.update(
      cart.id,
      {region_id: region.id},
      {},
      await getAuthHeaders(),
    );
    revalidateTag(cacheTag);
  }

  return cart;
}

export async function addToCart({
  quantity,
  region_id,
  variantId,
}: {
  quantity: number;
  region_id: string;
  variantId: string;
}) {
  if (!variantId) {
    throw new Error("Missing variant ID when adding to cart");
  }

  let cartId = await getCartId();

  if (!cartId) {
    if (!region_id) throw new Error("Error missing region id");

    cartId = (await createCart(region_id)).id;
  }

  if (!cartId) {
    throw new Error("Error retrieving or creating cart");
  }

  const cacheTag = await getCacheTag("carts");

  await medusa.store.cart
    .createLineItem(
      cartId,
      {
        quantity,
        variant_id: variantId,
      },
      {},
      await getAuthHeaders(),
    )
    .then(() => {
      revalidateTag(cacheTag);
    })
    .catch(medusaError);
}

export async function updateCartQuantity({
  countryCode = "us",
  lineItem,
  quantity,
}: {
  countryCode: string;
  lineItem: string;
  quantity: number;
}) {
  const cart = await getOrSetCart(countryCode);

  if (!cart) {
    throw new Error("Error retrieving or creating cart");
  }

  const cacheTag = await getCacheTag("carts");

  if (!(quantity > 0)) {
    await medusa.store.cart.deleteLineItem(cart.id, lineItem).then(() => {
      revalidateTag(cacheTag);
    });
  } else {
    await medusa.store.cart
      .updateLineItem(
        cart.id,
        lineItem,
        {
          quantity,
        },
        {},
        await getAuthHeaders(),
      )
      .then(() => {
        revalidateTag(cacheTag);
      });
  }
}

export async function updateCart(data: StoreUpdateCart) {
  const cartId = await getCartId();
  if (!cartId) {
    throw new Error(
      "No existing cart found, please create one before updating",
    );
  }

  return medusa.store.cart
    .update(cartId, data, {}, await getAuthHeaders())
    .then(({cart}) => {
      return cart;
    })
    .catch(medusaError);
}
