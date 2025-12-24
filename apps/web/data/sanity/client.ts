import { initSanity } from "@tinloof/sanity-next";

export const {
  sanityFetch,
  SanityLive,
  client,
  resolveSanityMetadata,
  generateSitemap,
  SanityImage,
} = initSanity({
  client: {
    useCdn: true,
  },
});
