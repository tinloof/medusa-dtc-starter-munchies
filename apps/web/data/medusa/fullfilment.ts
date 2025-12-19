import medusa from "./client";
import { getCacheHeaders } from "./cookies";

export const listCartShippingMethods = async (cartId: string) =>
  medusa.store.fulfillment
    .listCartOptions(
      { cart_id: cartId },
      { ...(await getCacheHeaders("fulfillment")) }
    )
    .then(({ shipping_options }) => shipping_options)
    .catch(() => null);

export const listCartPaymentMethods = async (regionId: string) =>
  medusa.store.payment
    .listPaymentProviders(
      { region_id: regionId },
      { ...(await getCacheHeaders("payment_providers")) }
    )
    .then(({ payment_providers }) => payment_providers)
    .catch(() => null);
