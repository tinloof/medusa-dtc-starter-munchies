"use server";

import medusaError from "@/utils/medusa/error";
import {cache} from "react";

import medusa from "./client";
import {getAuthHeaders, getCacheHeaders} from "./cookies";

export const retrieveOrder = cache(async function (id: string) {
  return medusa.store.order
    .retrieve(
      id,
      {fields: "*payment_collections.payments"},
      {...(await getCacheHeaders("orders")), ...(await getAuthHeaders())},
    )
    .then(({order}) => order)
    .catch((err) => medusaError(err));
});
