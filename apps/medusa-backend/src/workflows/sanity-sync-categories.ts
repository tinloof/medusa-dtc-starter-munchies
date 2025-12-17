import { isDefined, Modules, promiseAll } from "@medusajs/framework/utils";
import {
	createStep,
	createWorkflow,
	StepResponse,
	WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import type { FilterableProductCategoryProps } from "@medusajs/types";
import type SanityModuleService from "../modules/sanity/service";

const step = createStep;
const wf = createWorkflow;

type Input = {
	category_ids?: string[];
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
		const filter: FilterableProductCategoryProps = {};
		if (isDefined(input.category_ids)) {
			filter.id = input.category_ids;
		}

		while (hasMore) {
			const [categories, count] =
				await productModule.listAndCountProductCategories(filter, {
					select: [
						"id",
						"name",
						"handle",
						"parent_category_id",
						"category_children.id",
					],
					relations: ["category_children"],
					skip: offset,
					take: batchSize,
					order: { id: "ASC" },
				});

			await promiseAll(
				categories.map((prod) => {
					return sanityModule.upsertSyncDocument("category", prod);
				}),
			);

			offset += batchSize;
			hasMore = offset < count;
			total += categories.length;
		}

		return new StepResponse({ total });
	},
);

const id = "sanity-category-sync";

export const sanityCategorySyncWorkflow = wf(
	{ name: id, retentionTime: 10000 },
	(input: Input) => {
		const result = syncStep(input);

		return new WorkflowResponse(result);
	},
);
