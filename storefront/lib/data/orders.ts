"use server";

import type {HttpTypes} from "@medusajs/types";

import {sdk} from "@/lib/config";
import medusaError from "@/lib/util/medusa-error";

import {getAuthHeaders, getCacheOptions} from "./cookies";

export const retrieveOrder = async (id: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  const next = {
    ...(await getCacheOptions("orders")),
  };

  return sdk.client
    .fetch<HttpTypes.StoreOrderResponse>(`/store/orders/${id}`, {
      cache: "force-cache",
      headers,
      method: "GET",
      next,
      query: {
        fields:
          "*payment_collections.payments,*items,*items.metadata,*items.variant,*items.product",
      },
    })
    .then(({order}) => order)
    .catch((err) => medusaError(err));
};

export const listOrders = async (
  limit: number = 10,
  offset: number = 0,
  filters?: Record<string, any>,
) => {
  const headers = {
    ...(await getAuthHeaders()),
  };

  const next = {
    ...(await getCacheOptions("orders")),
  };

  return sdk.client
    .fetch<HttpTypes.StoreOrderListResponse>(`/store/orders`, {
      cache: "force-cache",
      headers,
      method: "GET",
      next,
      query: {
        fields: "*items,+items.metadata,*items.variant,*items.product",
        limit,
        offset,
        order: "-created_at",
        ...filters,
      },
    })
    .then(({orders}) => orders)
    .catch((err) => medusaError(err));
};

export const createTransferRequest = async (
  state: {
    error: null | string;
    order: HttpTypes.StoreOrder | null;
    success: boolean;
  },
  formData: FormData,
): Promise<{
  error: null | string;
  order: HttpTypes.StoreOrder | null;
  success: boolean;
}> => {
  const id = formData.get("order_id") as string;

  if (!id) {
    return {error: "Order ID is required", order: null, success: false};
  }

  const headers = await getAuthHeaders();

  return await sdk.store.order
    .requestTransfer(
      id,
      {},
      {
        fields: "id, email",
      },
      headers,
    )
    .then(({order}) => ({error: null, order, success: true}))
    .catch((err) => ({error: err.message, order: null, success: false}));
};

export const acceptTransferRequest = async (id: string, token: string) => {
  const headers = await getAuthHeaders();

  return await sdk.store.order
    .acceptTransfer(id, {token}, {}, headers)
    .then(({order}) => ({error: null, order, success: true}))
    .catch((err) => ({error: err.message, order: null, success: false}));
};

export const declineTransferRequest = async (id: string, token: string) => {
  const headers = await getAuthHeaders();

  return await sdk.store.order
    .declineTransfer(id, {token}, {}, headers)
    .then(({order}) => ({error: null, order, success: true}))
    .catch((err) => ({error: err.message, order: null, success: false}));
};
