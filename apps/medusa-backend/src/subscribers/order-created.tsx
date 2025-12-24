import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";
import { pretty, render } from "@react-email/render";
import getOrderConfirmationTemplate from "../emails/templates/order-confirmation";

export default async function orderCreatedHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  try {
    const orderModuleService = container.resolve(Modules.ORDER);
    const notificationModuleService = container.resolve(Modules.NOTIFICATION);

    const order = await orderModuleService.retrieveOrder(event.data.id, {
      relations: [
        "items",
        "shipping_methods",
        "shipping_address",
        "billing_address",
      ],
      select: [
        "id",
        "email",
        "display_id",
        "total",
        "item_subtotal",
        "discount_total",
        "shipping_total",
        "tax_total",
        "currency_code",
        "created_at",
      ],
    });

    const html = await pretty(
      await render(getOrderConfirmationTemplate({ order }))
    );

    await notificationModuleService.createNotifications({
      to: order.email ?? "",
      channel: "email",
      content: {
        html,
        subject: "Thank you for your order!",
      },
    });
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }
}

export const config: SubscriberConfig = {
  event: ["order.placed"],
};
