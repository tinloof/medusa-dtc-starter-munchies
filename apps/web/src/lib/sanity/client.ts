import { createClient } from "@sanity/client";
import config from "@/config";

export function getClient() {
  const client = createClient({
    projectId: config.sanity.projectId,
    dataset: config.sanity.dataset,
    apiVersion: config.sanity.apiVersion,
    token: config.sanity.token,
    useCdn: true,
  });

  return client;
}
