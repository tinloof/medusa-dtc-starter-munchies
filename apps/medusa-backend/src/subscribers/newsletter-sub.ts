import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";
import { Resend } from "resend";

export default async function subscribeNewsletterHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const customerModuleService = container.resolve(Modules.CUSTOMER);

    const customer = await customerModuleService.retrieveCustomer(
      event.data.id,
    );

    // const audiences = await resend.audiences.list();

    // const audienceId = audiences.data?.data?.[0].id;

    // if (!audienceId) throw new Error("No audience found");

    // const { data, error } = await resend.contacts.create({
    //   audienceId,
    //   email: customer.email,
    // });

    // if (error) throw new Error("Error subscribing email");

    const response = await fetch(
      "https://munchies.medusajs.app/store/email/welcome/" + event.data.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": process.env.MEDUSA_PUBLISHABLE_KEY,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export const config: SubscriberConfig = {
  event: ["customer.created", "customer.updated"],
};
