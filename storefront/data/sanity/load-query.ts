import type {ROUTE_QUERYResult} from "@/types/sanity.generated";
import type {UnfilteredResponseQueryOptions} from "@sanity/client";
import type {QueryParams} from "next-sanity";

import config from "@/config";
import {client} from "@/data/sanity/client";
import {draftMode} from "next/headers";
import "server-only";

import {ROUTE_QUERY} from "./queries";

const DEFAULT_PARAMS = {} as QueryParams;

export async function loadQuery<QueryResponse>({
  params = DEFAULT_PARAMS,
  query,
}: {
  params?: QueryParams;
  query: string;
}): Promise<QueryResponse> {
  const isDraftMode = (await draftMode()).isEnabled;
  const token = config.sanity.token;

  if (isDraftMode && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required in Draft Mode.",
    );
  }

  const perspective = isDraftMode ? "previewDrafts" : "published";

  const options = {
    filterResponse: false,
    next: {
      revalidate: process.env.NODE_ENV === "production" ? 120 : 0,
    },
    perspective,
    resultSourceMap: isDraftMode ? "withKeyArraySelector" : false,
    token: isDraftMode ? token : undefined,
    useCdn: false,
  } satisfies UnfilteredResponseQueryOptions;
  const result = await client.fetch<QueryResponse>(query, params, {
    ...options,
    stega: isDraftMode,
  } as UnfilteredResponseQueryOptions);
  return result.result;
}

// Loader for routes
export function loadRoute(pathname: string) {
  return loadQuery<ROUTE_QUERYResult>({
    params: {pathname},
    query: ROUTE_QUERY,
  });
}
