import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ShippingConfirmation from "../../_templates/shipping-confirmation";
import { sendEmail } from "../../lib";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  // @ts-ignore
  const { id }: { id: string } = req.params;

  const orderService = req.scope.resolve(Modules.ORDER);
  const fullfilmentService = req.scope.resolve(Modules.FULFILLMENT);

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data: fullfilments } = await query.graph({
    entity: "fullfilment",
    fields: ["id", "name"],
  });

  const order = await orderService.retrieveOrder(id);

  if (order)
    try {
      await sendEmail({
        to: order.email,
        subject: "Your order is shipped!",
        react: <ShippingConfirmation />,
      });

      res.json({ message: "Email sent!", order });
    } catch (e) {
      res.json({ message: "Email failed" });
    }
}
