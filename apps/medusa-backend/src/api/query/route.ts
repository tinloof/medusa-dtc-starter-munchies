import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
	const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

	const { data } = await query.graph({
		entity: "product",
		fields: ["id", "sanity_product.id", "sanity_product.title"],
		pagination: { skip: 0, take: 100 },
	});

	res.json({ data });
};
