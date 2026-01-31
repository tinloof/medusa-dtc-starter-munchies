import type { QueryParams } from "sanity";
import { getCookies } from "../context";
import { client } from "./client";

interface SanityFetchParams {
  query: string;
  params?: QueryParams;
  perspective?: "published" | "drafts";
}

export function sanityFetch<T>({
  query,
  params = {},
  perspective: _perspective,
}: SanityFetchParams) {
  const cookies = getCookies();
  const isDraftMode = cookies?.get("sanity-draft-mode")?.value === "true";
  const perspective = _perspective ?? (isDraftMode ? "drafts" : "published");
  // useCdn: false bypasses Sanity CDN propagation delay
  // CF edge cache handles caching, so we don't need Sanity's CDN
  return client
    .withConfig({
      useCdn: false,
      perspective,
    })
    .fetch<T>(query, params, {
      filterResponse: false,
    });
}
