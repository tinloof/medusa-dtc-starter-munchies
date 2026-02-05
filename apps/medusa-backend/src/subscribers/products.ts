import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export default async function productRevalidationHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  try {
    const productService = container.resolve(Modules.PRODUCT);

    const product = await productService.retrieveProduct(event.data.id, {
      withDeleted: true,
    });

    if (product) {
      await fetch("https://munchies.million-tinloof.com/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tags: [`products:${product.handle}`, `products:${event.data.id}`],
        }),
      });
    }
  } catch (error) {
    console.error("Error revalidating product: ", error);
  }
}

export const config: SubscriberConfig = {
  event: ["product.created", "product.updated", "product.deleted"],
};
