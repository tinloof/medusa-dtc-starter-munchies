import {
  parallelize,
  WorkflowResponse,
  createWorkflow as wf,
} from "@medusajs/framework/workflows-sdk";
import { sanityCategorySyncWorkflow } from "./sanity-sync-categories";
import { sanityCollectionSyncWorkflow } from "./sanity-sync-collections";
import { sanityProductSyncWorkflow } from "./sanity-sync-products";

type Input = {
  category_ids?: string[];
  product_ids?: string[];
  collection_ids?: string[];
};

const id = "sanity-full-sync";

export const sanityFullSyncWorkflow = wf(
  { name: id, retentionTime: 10_000 },
  (input: Input) => {
    const [product_total, category_total, collection_total] = parallelize(
      sanityProductSyncWorkflow.runAsStep({
        input: { product_ids: input.product_ids },
      }),
      sanityCategorySyncWorkflow.runAsStep({
        input: { category_ids: input.category_ids },
      }),
      sanityCollectionSyncWorkflow.runAsStep({
        input: { collection_ids: input.collection_ids },
      })
    );
    return new WorkflowResponse({
      product_total,
      category_total,
      collection_total,
    });
  }
);
