import {
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
} from "astro:env/client";
import { createClient } from "@sanity/client";

// Used client-side for live.events() EventSource subscription.
export const liveSanityClient = createClient({
  projectId: PUBLIC_SANITY_STUDIO_PROJECT_ID,
  dataset: PUBLIC_SANITY_STUDIO_DATASET,
  apiVersion: "2026-01-16",
  useCdn: true,
});
