import { createClient } from "@sanity/client";
import { PUBLIC_SANITY_STUDIO_PROJECT_ID, PUBLIC_SANITY_STUDIO_DATASET, SANITY_TOKEN } from 'astro:env/server'

export function getClient() {
  const client = createClient({
    projectId: PUBLIC_SANITY_STUDIO_PROJECT_ID,
    dataset: PUBLIC_SANITY_STUDIO_DATASET,
    apiVersion: "2026-01-16",
    token: SANITY_TOKEN,
    useCdn: true,
  });

  return client;
}
