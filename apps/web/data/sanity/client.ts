import { createImageUrlBuilder } from "@sanity/image-url";
import { initSanity } from "@tinloof/sanity-next";
import config from "@/config";

export const {
  sanityFetch,
  client,
  resolveSanityMetadata,
  generateSitemap,
  SanityImage,
} = initSanity();

export const imageBuilder = createImageUrlBuilder({
  dataset: config.sanity.dataset || "",
  projectId: config.sanity.projectId || "",
});
