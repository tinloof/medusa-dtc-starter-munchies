import { createClient } from "@sanity/client";

// Import types to activate module augmentation for automatic type inference
import "@packages/sanity/types";

export function getClient(env: Env) {
  const client = createClient({
    projectId: env.SANITY_STUDIO_PROJECT_ID,
    dataset: env.SANITY_STUDIO_DATASET,
    apiVersion: "2026-01-16",
    token: env.SANITY_TOKEN,
    useCdn: true,
  });

  return client;
}
