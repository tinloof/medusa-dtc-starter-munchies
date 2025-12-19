import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const eventBus = req.scope.resolve(Modules.EVENT_BUS);
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data } = await query.graph({
    entity: "product",
    fields: ["id"],
    pagination: { skip: 0, take: 1 },
  });

  await eventBus.emit({
    name: "product.created",
    data: { id: data[0].id },
  });

  res.json({ data });
};
