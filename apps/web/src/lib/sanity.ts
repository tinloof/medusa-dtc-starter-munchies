import { createClient } from "@sanity/client";

// Import types to activate module augmentation for automatic type inference
import "@packages/sanity/types";

export function getClient() {
  const client = createClient({
    projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
    dataset: import.meta.env.SANITY_STUDIO_DATASET,
    apiVersion: "2026-01-16",
    token: import.meta.env.SANITY_TOKEN,
    useCdn: true,
  });

  return client;
}
