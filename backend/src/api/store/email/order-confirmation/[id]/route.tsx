import { Modules } from "@medusajs/framework/utils";
import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import OrderConfirmation from "../../_templates/order-confirmation";
import { sendEmail } from "../../lib";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  // @ts-ignore
  const { id }: { id: string } = req.params;

  const orderService = req.scope.resolve(Modules.ORDER);

  const order = await orderService.retrieveOrder(id, {
    relations: [
      "items",
      "shipping_methods",
      "shipping_address",
      "billing_address",
      "summary",
    ],
    select: [
      "email",
      "total",
      "item_subtotal",
      "discount_total",
      "shipping_total",
      "currency_code",
    ],
  });

  try {
    await sendEmail({
      to: order.email,
      subject: "Thank you for your order",
      react: <OrderConfirmation order={order} />,
    });

    res.json({ message: "Email sent!" });
  } catch (e) {
    res.json({ message: "Email failed" });
  }
}
