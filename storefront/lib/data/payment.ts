"use server";

import type {HttpTypes} from "@medusajs/types";

import {sdk} from "@/lib/config";

import {getAuthHeaders, getCacheOptions} from "./cookies";

export const listCartPaymentMethods = async (regionId: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  const next = {
    ...(await getCacheOptions("payment_providers")),
  };

  return sdk.client
    .fetch<HttpTypes.StorePaymentProviderListResponse>(
      `/store/payment-providers`,
      {
        cache: "force-cache",
        headers,
        method: "GET",
        next,
        query: {region_id: regionId},
      },
    )
    .then(({payment_providers}) =>
      payment_providers.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      }),
    )
    .catch(() => {
      return null;
    });
};
