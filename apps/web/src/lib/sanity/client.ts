import { createClient, type QueryParams } from "@sanity/client";
import config from "@/config";

const client = createClient({
  projectId: config.sanity.projectId,
  dataset: config.sanity.dataset,
  apiVersion: config.sanity.apiVersion,
  token: config.sanity.token,
  useCdn: true,
});

interface SanityFetchParams {
  query: string;
  params?: QueryParams;
}

export function sanityFetch<T>({ query, params = {} }: SanityFetchParams) {
  return client.fetch<T>(query, params, {
    filterResponse: false,
  });
}
