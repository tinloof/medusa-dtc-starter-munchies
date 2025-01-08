"use server";

import type {HttpTypes} from "@medusajs/types";

import {sdk} from "@/lib/config";

import {getCacheOptions} from "./cookies";

export const retrieveCollection = async (id: string) => {
  const next = {
    ...(await getCacheOptions("collections")),
  };

  return sdk.client
    .fetch<{collection: HttpTypes.StoreCollection}>(
      `/store/collections/${id}`,
      {
        cache: "force-cache",
        next,
      },
    )
    .then(({collection}) => collection);
};

export const listCollections = async (
  queryParams: Record<string, string> = {},
): Promise<{collections: HttpTypes.StoreCollection[]; count: number}> => {
  const next = {
    ...(await getCacheOptions("collections")),
  };

  queryParams.limit = queryParams.limit || "100";
  queryParams.offset = queryParams.offset || "0";

  return sdk.client
    .fetch<{collections: HttpTypes.StoreCollection[]; count: number}>(
      "/store/collections",
      {
        cache: "force-cache",
        next,
        query: queryParams,
      },
    )
    .then(({collections}) => ({collections, count: collections.length}));
};

export const getCollectionByHandle = async (
  handle: string,
): Promise<HttpTypes.StoreCollection> => {
  const next = {
    ...(await getCacheOptions("collections")),
  };

  return sdk.client
    .fetch<HttpTypes.StoreCollectionListResponse>(`/store/collections`, {
      cache: "force-cache",
      next,
      query: {fields: "*products", handle},
    })
    .then(({collections}) => collections[0]);
};
