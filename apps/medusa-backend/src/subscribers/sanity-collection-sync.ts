import type { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
import { sanityCollectionSyncWorkflow } from "../workflows/sanity-sync-collections";

export default async function upsertSanityProduct({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  await sanityCollectionSyncWorkflow(container).run({
    input: {
      collection_ids: [data.id],
    },
  });
}

export const config: SubscriberConfig = {
  event: ["product-collection.created", "product-collection.updated"],
};
