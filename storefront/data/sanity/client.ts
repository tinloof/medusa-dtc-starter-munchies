import type {ClientPerspective} from "next-sanity";

import config from "@/config";
import createImageUrlBuilder from "@sanity/image-url";
import {createClient} from "next-sanity";

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
