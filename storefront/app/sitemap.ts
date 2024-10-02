import type {SITEMAP_QUERYResult} from "@/types/sanity.generated";
import type {MetadataRoute} from "next";

import config from "@/config";
import {client} from "@/data/sanity/client";
import {SITEMAP_QUERY} from "@/data/sanity/queries";
import {pathToAbsUrl} from "@tinloof/sanity-web";

const sanityClient = client.withConfig({
  perspective: "published",
  stega: false,
  token: config.sanity.token,
  useCdn: false,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publicSanityRoutes =
    await sanityClient.fetch<SITEMAP_QUERYResult | null>(
      SITEMAP_QUERY,
      {},
      {
        next: {
          revalidate: 0,
        },
      },
    );

  return (
    publicSanityRoutes?.map((route) => {
      const url = route.pathname?.current
        ? pathToAbsUrl({
            baseUrl: config.baseUrl,
            path: route.pathname.current,
          }) || ""
        : "";
      return {
        lastModified: route.lastModified || undefined,
        url,
      };
    }) ?? []
  );
}
