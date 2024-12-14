
import medusa from "./client";
import { getCacheHeaders } from "./cookies";

export const listCartShippingMethods =
  async function (cartId: string) {
    return medusa.store.fulfillment
      .listCartOptions(
        {cart_id: cartId},
        {...(await getCacheHeaders("fullfillment"))},
      )
      .then(({shipping_options}) => shipping_options)
      .catch((error) => {
        console.error("Shipping options error:", error)
        return null;
      });
  }

export const listCartPaymentMethods =
  async function (regionId: string) {
    return medusa.store.payment
      .listPaymentProviders(
        {region_id: regionId},
        {...(await getCacheHeaders("payment_providers"))},
      )
      .then(({payment_providers}) => payment_providers)
      .catch(() => {
        return null;
      });
  }
