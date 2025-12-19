import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import config from "@/config";
import { client } from "@/data/sanity/client";
import "server-only";

export async function sanityFetch<QueryResponse>({
  params = {},
  query,
}: {
  params?: Promise<QueryParams> | QueryParams;
  query: string;
}): Promise<QueryResponse> {
  const isDraftMode = (await draftMode()).isEnabled;

  const perspective = isDraftMode ? "drafts" : "published";

  const token = config.sanity.token;

  const stega =
    perspective === "drafts" || process.env.VERCEL_ENV === "preview";

  if (perspective === "drafts") {
    return client.fetch(query, await params, {
      // And we can't cache the responses as it would slow down the live preview experience
      next: { revalidate: 0 },
      perspective: "drafts",
      stega,
      // The token is required to fetch draft content
      token,
      // The `drafts` perspective isn't available on the API CDN
      useCdn: false,
    });
  }

  return client.fetch(query, await params, {
    // When using the `published` perspective we use time-based revalidation to match the time-to-live on Sanity's API CDN (60 seconds)
    next: { revalidate: 120 },
    perspective: "published",
    stega,
    // Only enable Stega in production if it's a Vercel Preview Deployment, as the Vercel Toolbar supports Visual Editing
    // The `published` perspective is available on the API CDN
    useCdn: true,
  });
}
