import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import config from "@/config";

export const imageBuilder = createImageUrlBuilder({
  dataset: config.sanity.dataset || "",
  projectId: config.sanity.projectId || "",
});

export function getOgImages(image: SanityImageSource) {
  // biome-ignore lint/suspicious/noFocusedTests: biome ignore
  const builder = imageBuilder.image(image).fit("max").auto("format");

  return builder.width(1200).url();
}
