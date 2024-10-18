import { Modules } from "@medusajs/framework/utils";
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ShippingConfirmation from "../../_templates/shipping-confirmation";
import { sendEmail } from "../../lib";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  // @ts-ignore
  const { id }: { id: string } = req.params;

  const orderService = req.scope.resolve(Modules.ORDER);
  const fullfilmentService = req.scope.resolve(Modules.FULFILLMENT);

  const order = await orderService.retrieveOrder(id);

  // TODO: figure out how to pass fulfillments ids here
  // const fullfilment = await fullfilmentService.listFulfillments({ id });

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
