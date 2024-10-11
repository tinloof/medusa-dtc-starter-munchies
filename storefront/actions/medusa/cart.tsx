"use server";

import {retrieveCart} from "@/data/medusa/cart";
import client from "@/data/medusa/client";
import {
  getAuthHeaders,
  getCacheTag,
  getCartId,
  setCartId,
} from "@/data/medusa/cookies";
import {getCustomer} from "@/data/medusa/customer";
import {getRegion} from "@/data/medusa/regions";
import medusaError from "@/utils/medusa/error";
import {revalidateTag} from "next/cache";

export async function getOrSetCart(countryCode: string) {
  let cart = await retrieveCart();
  const region = await getRegion(countryCode);
  const customer = await getCustomer();

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  if (!cart) {
    const body = {
      email: customer?.email,
      region_id: region.id,
    };

    const cartResp = await client.store.cart.create(body, {}, getAuthHeaders());
    setCartId(cartResp.cart.id);
    revalidateTag(getCacheTag("carts"));

    cart = await retrieveCart();
  }

  if (cart && cart?.region_id !== region.id) {
    await client.store.cart.update(
      cart.id,
      {region_id: region.id},
      {},
      getAuthHeaders(),
    );
    revalidateTag(getCacheTag("carts"));
  }

  return cart;
}

export async function addToCart({
  countryCode = "us",
  quantity,
  variantId,
}: {
  countryCode?: string;
  quantity: number;
  variantId: string;
}) {
  if (!variantId) {
    throw new Error("Missing variant ID when adding to cart");
  }

  const cart = getCartId();

  if (!cart) {
    throw new Error("Error retrieving or creating cart");
  }

  await client.store.cart
    .createLineItem(
      cart,
      {
        quantity,
        variant_id: variantId,
      },
      {},
      getAuthHeaders(),
    )
    .then(() => {
      revalidateTag(getCacheTag("carts"));
    })
    .catch(medusaError);
}

export async function updateCartQuantity({
  countryCode = "us",
  lineItem,
  quantity,
}: {
  countryCode?: string;
  lineItem: string;
  quantity: number;
}) {
  const cart = await getOrSetCart(countryCode);

  if (!cart) {
    throw new Error("Error retrieving or creating cart");
  }

  if (!(quantity > 0)) {
    await client.store.cart.deleteLineItem(cart.id, lineItem).then(() => {
      revalidateTag(getCacheTag("carts"));
    });
  } else {
    await client.store.cart
      .updateLineItem(
        cart.id,
        lineItem,
        {
          quantity,
        },
        {},
        getAuthHeaders(),
      )
      .then(() => {
        revalidateTag(getCacheTag("carts"));
      });
  }
}

export async function deleteLineItem({
  countryCode = "us",
  lineItem,
}: {
  countryCode?: string;
  lineItem: string;
}) {
  const cart = await getOrSetCart(countryCode);

  if (!cart) {
    throw new Error("Error retrieving or creating cart");
  }

  await client.store.cart.deleteLineItem(cart.id, lineItem).then(() => {
    revalidateTag(getCacheTag("carts"));
  });
}
