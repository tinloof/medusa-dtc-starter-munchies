import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";
import { pretty, render } from "@react-email/render";
import getShippingConfirmationTemplate from "../emails/templates/shipping-confirmation";

type OrderFulfillmentCreatedData = {
  order_id: string;
  fulfillment_id: string;
  no_notification: boolean;
};

export default async function orderShippedHandler({
  event,
  container,
}: SubscriberArgs<OrderFulfillmentCreatedData>) {
  // Skip sending email if no_notification is true
  if (event.data.no_notification) {
    return;
  }

  try {
    const orderModuleService = container.resolve(Modules.ORDER);
    const notificationModuleService = container.resolve(Modules.NOTIFICATION);

    const order = await orderModuleService.retrieveOrder(event.data.order_id, {
      relations: ["shipping_address", "shipping_methods"],
      select: ["id", "email", "display_id"],
    });

    const html = await pretty(
      await render(getShippingConfirmationTemplate({ order }))
    );

    await notificationModuleService.createNotifications({
      to: order.email ?? "",
      channel: "email",
      content: {
        html,
        subject: "Your order is on its way!",
      },
    });
  } catch (error) {
    console.error("Error sending shipping confirmation email:", error);
  }
}

export const config: SubscriberConfig = {
  event: ["order.fulfillment_created"],
};
