import { ActionError, defineAction } from "astro:actions";
import type { FetchError } from "@medusajs/js-sdk";
import type { AstroCookies } from "astro";
import { z } from "astro/zod";
import config from "@/config";
import { getCart, getEnrichedCart } from "@/lib/medusa/cart";
import medusa from "@/lib/medusa/client";
import { getCartId, setCartId } from "@/lib/medusa/cookies";
import { getRegion } from "@/lib/medusa/regions";

async function createCart(cookies: AstroCookies, regionId: string) {
  const body = {
    region_id: regionId,
  };

  const cartResp = await medusa.store.cart.create(body, {
    fields:
      "+items, +region, +items.product.*, +items.variant.image, +items.variant.*, +items.thumbnail, +items.metadata, +promotions.*,",
  });

  setCartId(cookies, cartResp.cart.id);

  return cartResp.cart;
}

async function getOrSetCart(cookies: AstroCookies, countryCode: string) {
  let cart = await getCart(cookies);
  const region = await getRegion(countryCode);

  if (!region) {
    throw new ActionError({
      code: "NOT_FOUND",
      message: `Region not found for country code: ${countryCode}`,
    });
  }

  if (!cart) {
    cart = await createCart(cookies, region.id);
  }

  if (cart && cart?.region_id !== region.id) {
    await medusa.store.cart.update(cart.id, { region_id: region.id });
  }

  return cart;
}

const addToCart = defineAction({
  accept: "json",
  input: z.object({
    quantity: z.number(),
    regionId: z.string(),
    variantId: z.string(),
  }),
  async handler(input, ctx) {
    const lineItemData = {
      quantity: input.quantity,
      variant_id: input.variantId,
    };

    let cartId = getCartId(ctx.cookies);
    if (!cartId) {
      cartId = (await createCart(ctx.cookies, input.regionId)).id;
    }

    try {
      await medusa.store.cart.createLineItem(cartId, lineItemData);
    } catch (error) {
      const fetchError = error as FetchError;
      if (fetchError.status === 404) {
        cartId = (await createCart(ctx.cookies, input.regionId)).id;
        await medusa.store.cart.createLineItem(cartId, lineItemData);
      } else {
        throw new ActionError({
          message: fetchError.message,
          code: "BAD_REQUEST",
        });
      }
    }

    return await getEnrichedCart(ctx.cookies);
  },
});

const updateCartQuantity = defineAction({
  accept: "json",
  input: z.object({
    countryCode: z.string().default(config.defaultCountryCode),
    lineItem: z.string(),
    quantity: z.number(),
  }),
  async handler(input, ctx) {
    const cart = await getOrSetCart(ctx.cookies, input.countryCode);

    if (!cart) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Error retrieving or creating cart",
      });
    }

    if (input.quantity > 0) {
      await medusa.store.cart.updateLineItem(cart.id, input.lineItem, {
        quantity: input.quantity,
      });
    } else {
      await medusa.store.cart.deleteLineItem(cart.id, input.lineItem);
    }

    // Return updated cart so client can sync state
    return await getEnrichedCart(ctx.cookies);
  },
});

export const cart = {
  addToCart,
  updateCartQuantity,
};
