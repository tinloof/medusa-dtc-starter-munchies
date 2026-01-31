import type { AstroCookies } from "astro";
import type { QueryParams } from "sanity";
import { client } from "./client";

interface SanityFetchParams {
  query: string;
  params?: QueryParams;
  cookies?: AstroCookies;
  perspective?: "published" | "drafts";
}

export function sanityFetch<T>({
  query,
  params = {},
  cookies,
  perspective: _perspective,
}: SanityFetchParams) {
  const isDraftMode = cookies?.get("sanity-draft-mode")?.value === "true";
  const perspective = _perspective ?? (isDraftMode ? "drafts" : "published");
  return client
    .withConfig({
      perspective,
    })
    .fetch<T>(query, params, {
      filterResponse: false,
    });
}
