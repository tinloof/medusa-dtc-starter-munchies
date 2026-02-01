import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";
import { pretty, render } from "@react-email/render";
import getWelcomeTemplate from "../emails/templates/welcome";

export default async function subscribeNewsletterHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  try {
    const customerModuleService = container.resolve(Modules.CUSTOMER);
    const productService = container.resolve(Modules.PRODUCT);
    const notificationModuleService = container.resolve(Modules.NOTIFICATION);

    const customer = await customerModuleService.retrieveCustomer(
      event.data.id
    );

    const products = await productService.listProducts({}, { take: 2 });

    const html = await pretty(await render(getWelcomeTemplate({ products })));

    await notificationModuleService.createNotifications({
      to: customer.email,
      channel: "email",
      content: {
        html,
        subject: "Welcome to our newsletter!",
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

export const config: SubscriberConfig = {
  event: ["customer.created", "customer.updated"],
};
