"use server";

import medusaError from "@/utils/medusa/error";

import medusa from "./client";
import { getAuthHeaders, getCacheHeaders } from "./cookies";

export const getOrder = async (id: string) =>
  medusa.store.order
    .retrieve(
      id,
      { fields: "*payment_collections.payments" },
      { ...(await getCacheHeaders("orders")), ...(await getAuthHeaders()) }
    )
    .then(({ order }) => order)
    .catch((err) => medusaError(err));
