import type { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa";
import { sanityCategorySyncWorkflow } from "../workflows/sanity-sync-categories";

export default async function upsertSanityProduct({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  await sanityCategorySyncWorkflow(container).run({
    input: {
      category_ids: [data.id],
    },
  });
}

export const config: SubscriberConfig = {
  event: ["product-category.created", "product-category.updated"],
};
