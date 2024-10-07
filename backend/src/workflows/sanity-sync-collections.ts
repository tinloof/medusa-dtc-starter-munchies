import { isDefined, Modules, promiseAll } from "@medusajs/framework/utils";
import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { FilterableProductProps } from "@medusajs/types";
import SanityModuleService from "../modules/sanity/service";

const step = createStep;
const wf = createWorkflow;

type Input = {
  collection_ids?: string[];
};

const syncStep = step(
  { name: "syncStep", async: true },
  async (input: Input, { container }) => {
    const productModule = container.resolve(Modules.PRODUCT);
    const sanityModule: SanityModuleService = container.resolve("sanity");

    let total = 0;

    const batchSize = 200;
    let hasMore = true;
    let offset = 0;
    let filter: FilterableProductProps = {};
    if (isDefined(input.collection_ids)) {
      filter.id = input.collection_ids;
    }

    while (hasMore) {
      const [collections, count] =
        await productModule.listAndCountProductCollections(filter, {
          select: ["id", "handle", "title"],
          skip: offset,
          take: batchSize,
          order: { id: "ASC" },
        });

      await promiseAll(
        collections.map((prod) => {
          return sanityModule.upsertSyncDocument("collection", prod);
        }),
      );

      offset += batchSize;
      hasMore = offset < count;
      total += collections.length;
    }

    return new StepResponse({ total });
  },
);

const id = "sanity-collection-sync";

export const sanityCollectionSyncWorkflow = wf(
  { name: id, retentionTime: 10000 },
  function (input: Input) {
    const result = syncStep(input);

    return new WorkflowResponse(result);
  },
);
