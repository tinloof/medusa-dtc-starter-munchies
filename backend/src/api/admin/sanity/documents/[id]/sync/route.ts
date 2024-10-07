import { MedusaRequest } from "@medusajs/framework";
import { sanityProductSyncWorkflow } from "../../../../../../workflows/sanity-sync-products";

export const POST = async (req: MedusaRequest, res) => {
  const { transaction } = await sanityProductSyncWorkflow(req.scope).run({
    input: { product_ids: [(req as any).params.id] },
  });

  res.json({ transaction_id: transaction.transactionId });
};
