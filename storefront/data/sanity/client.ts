import type {ClientPerspective} from "@sanity/client";

import config from "@/config";
import {createClient} from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";

const clientConfig = {
  apiVersion: config.sanity.apiVersion,
  dataset: config.sanity.dataset,
  perspective: "published" as ClientPerspective,
  projectId: config.sanity.projectId,
  useCdn: process.env.NODE_ENV === "production",
};

export const client = createClient({
  ...clientConfig,
  stega: {
    studioUrl: config.sanity.studioUrl,
  },
});

export const imageBuilder = createImageUrlBuilder({
  dataset: clientConfig.dataset || "",
  projectId: clientConfig.projectId || "",
});
