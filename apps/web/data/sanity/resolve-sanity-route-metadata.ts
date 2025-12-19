import type { Seo, Slug } from "@packages/sanity/types";
import type { SanityImageSource } from "@sanity/image-url";
import { pathToAbsUrl } from "@tinloof/sanity-web";
import type { ResolvingMetadata } from "next";
import config from "@/config";

import { imageBuilder } from "./client";

export function getOgImages(image: SanityImageSource) {
  // biome-ignore lint/suspicious/noFocusedTests: biome ignore
  const builder = imageBuilder.image(image).fit("max").auto("format");

  return [
    {
      url: builder.width(1200).url(),
      width: 1200,
    },
  ];
}

export async function resolveSanityRouteMetadata(
  {
    indexable,
    pathname,
    seo,
  }: {
    indexable?: boolean;
    pathname?: Slug | null | string;
    seo?: Seo;
  },
  parentPromise: ResolvingMetadata
) {
  if (!seo) {
    return { title: config.siteName };
  }

  let path = "";

  if (pathname && typeof pathname !== "string" && pathname.current) {
    path = pathname?.current;
  } else if (pathname && typeof pathname === "string") {
    path = pathname;
  }

  const parent = await parentPromise;
  const title = seo?.title || config.siteName;
  const canonicalUrl =
    seo?.canonicalUrl || pathToAbsUrl({ baseUrl: config.baseUrl, path });
  const ogImages = seo?.image
    ? getOgImages(seo.image)
    : parent.openGraph?.images;

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description: seo?.description || "",
    openGraph: {
      images: ogImages,
      title,
      url: canonicalUrl,
    },
    robots: indexable ? undefined : "noindex nofollow",
    title,
  };
}
