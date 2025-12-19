import type { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
import { sanityProductSyncWorkflow } from "../workflows/sanity-sync-products";

export default async function upsertSanityProduct({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  await sanityProductSyncWorkflow(container).run({
    input: {
      product_ids: [data.id],
    },
  });
}

export const config: SubscriberConfig = {
  event: ["product.created", "product.updated"],
};
