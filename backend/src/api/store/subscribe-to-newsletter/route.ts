import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { CreateCustomer } from "@medusajs/medusa/api/admin/customers/validators";
import subscribeToNewsletterWorkflow, {
  WorkflowInput,
} from "../../../workflows/subscribe-to-newsletter";

export async function POST(
  req: MedusaRequest<WorkflowInput>,
  res: MedusaResponse,
): Promise<void> {
  const input = CreateCustomer.parse(req.body);

  await subscribeToNewsletterWorkflow(req.scope).run({
    input,
  });

  res.sendStatus(200);
}
