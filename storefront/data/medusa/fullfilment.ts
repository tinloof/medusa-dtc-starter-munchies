import {unstable_cache} from "next/cache";

import medusa from "./client";
import {getCacheHeaders} from "./cookies";

export const listCartShippingMethods = unstable_cache(
  async function (cartId: string) {
    return medusa.store.fulfillment
      .listCartOptions(
        {cart_id: cartId},
        {...(await getCacheHeaders("fulfillment"))},
      )
      .then(({shipping_options}) => shipping_options)
      .catch(() => {
        return null;
      });
  },
  ["fulfillment"],
  {
    revalidate: 120,
  },
);

export const listCartPaymentMethods = unstable_cache(
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
  },
  ["payment_providers"],
  {
    revalidate: 120,
  },
);
