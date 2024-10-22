"use server";

import medusaError from "@/utils/medusa/error";
import {unstable_cache} from "next/cache";

import medusa from "./client";
import {getAuthHeaders, getCacheHeaders} from "./cookies";

export const getOrder = unstable_cache(
  async function (id: string) {
    return medusa.store.order
      .retrieve(
        id,
        {fields: "*payment_collections.payments"},
        {...(await getCacheHeaders("orders")), ...(await getAuthHeaders())},
      )
      .then(({order}) => order)
      .catch((err) => medusaError(err));
  },
  ["order"],
  {
    revalidate: 120,
  },
);
