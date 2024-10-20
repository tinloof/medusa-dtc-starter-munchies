import { Modules } from "@medusajs/framework/utils";
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import Welcome from "../../_templates/welcome";
import { sendEmail } from "../../lib";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  // @ts-ignore
  const { id }: { id: string } = req.params;

  const customerService = req.scope.resolve(Modules.CUSTOMER);

  const customer = await customerService.retrieveCustomer(id);

  try {
    await sendEmail({
      to: customer.email,
      subject: "Welcome to our newsletter!",
      react: <Welcome />,
    });

    res.json({ message: "Email sent!", customer });
  } catch (e) {
    res.json({ message: "Email failed" });
  }
}
