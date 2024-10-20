import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { CreateCustomer } from "@medusajs/medusa/api/admin/customers/validators";
import subscribeToNewsletterWorkflow, {
    WorkflowInput,
} from "src/workflows/subscribe-to-newsletter";

export async function POST(
  req: MedusaRequest<WorkflowInput>,
  res: MedusaResponse,
): Promise<void> {

  // @ts-ignore
  const input = CreateCustomer.parse(req.body);

  const { result: id } = await subscribeToNewsletterWorkflow(req.scope).run({
    input,
  });

  res.sendStatus(200);
}
