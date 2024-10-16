"use server";
import type {StoreCart} from "@medusajs/types";

import medusa from "@/data/medusa/client";
import {
  getAuthHeaders,
  getCacheTag,
  getCartId,
  removeCartId,
} from "@/data/medusa/cookies";
import {getCustomer} from "@/data/medusa/customer";
import medusaError from "@/utils/medusa/error";
import {revalidateTag} from "next/cache";
import {redirect} from "next/navigation";

import {updateCart} from "./cart";

export async function placeOrder() {
  const cartId = getCartId();
  if (!cartId) {
    throw new Error("No existing cart found when placing an order");
  }

  try {
    const cartRes = await medusa.store.cart.complete(
      cartId,
      {},
      getAuthHeaders(),
    );
    revalidateTag(getCacheTag("carts"));

    if (cartRes?.type === "order") {
      removeCartId();
      // TODO: make this us the country code
      redirect(`/order/confirmed/${cartRes.order.id}`);
    }

    return cartRes.cart;
  } catch (error) {
    return medusaError(error);
  }
}

export async function initiatePaymentSession(
  cart: StoreCart,
  data: {
    context?: Record<string, unknown>;
    provider_id: string;
  },
) {
  return medusa.store.payment
    .initiatePaymentSession(cart, data, {}, getAuthHeaders())
    .then((resp) => {
      revalidateTag(getCacheTag("carts"));
      return resp;
    })
    .catch(medusaError);
}

type ActionState =
  | {error: null; status: "idle" | "success"}
  | {error: string; status: "error"};

export async function setCheckoutAddresses(
  currentState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    if (!formData) {
      throw new Error("No form data found when setting addresses");
    }

    const cartId = getCartId();
    const customer = await getCustomer();

    if (!cartId) {
      throw new Error("No existing cart found when setting addresses");
    }

    const data = {
      customer_id: customer?.id,
      email: customer?.email || formData.get("email"),
      shipping_address: {
        address_1: formData.get("shipping_address.address_1"),
        address_2: "",
        city: formData.get("shipping_address.city"),
        company: formData.get("shipping_address.company"),
        country_code: formData.get("shipping_address.country_code"),
        first_name: formData.get("shipping_address.first_name"),
        last_name: formData.get("shipping_address.last_name"),
        phone: formData.get("billing_address.phone"),
        postal_code: formData.get("shipping_address.postal_code"),
        province: formData.get("shipping_address.province"),
      },
    } as any;

    if (formData.get("billing_address.address_1")) {
      data.billing_address = {
        address_1: formData.get("billing_address.address_1"),
        address_2: "",
        city: formData.get("billing_address.city"),
        company: formData.get("billing_address.company"),
        country_code: formData.get("billing_address.country_code"),
        first_name: formData.get("billing_address.first_name"),
        last_name: formData.get("billing_address.last_name"),
        phone: formData.get("billing_address.phone"),
        postal_code: formData.get("billing_address.postal_code"),
        province: formData.get("billing_address.province"),
      };
    }

    const cart = await updateCart(data);

    console.log(cart.shipping_address);

    return {error: null, status: "success"};
  } catch (e: any) {
    return {error: e.message, status: "error"};
  }
}

export async function testingFunc(_, formdata: FormData) {
  const data = formdata.get("hey");

  console.log({data});
  return null;
}

export async function setShippingMethod(
  _: ActionState,
  formdata: FormData,
): Promise<ActionState> {
  const cartId = getCartId();

  if (!cartId) return {error: "No cart id", status: "error"};

  const shippingMethodId = formdata.get("shippingMethodId");

  return await medusa.store.cart
    .addShippingMethod(
      cartId,
      {option_id: shippingMethodId as string},
      {},
      getAuthHeaders(),
    )
    .then(() => {
      revalidateTag(getCacheTag("carts"));
      return {error: null, status: "success"} as const;
    })
    .catch((e) => ({error: e.message, status: "error"}));
}
