import type {HttpTypes} from "@medusajs/types";

import Heading from "@/components/shared/typography/heading";
import {retrieveCart} from "@/data/medusa/cart";
import {enrichLineItems} from "@/data/medusa/line-items";
import {notFound} from "next/navigation";

import LineItem from "./_parts/line-item";

export default async function CheckoutPage() {
  const cart = await retrieveCart();
  if (!cart) {
    return notFound();
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id);
    cart.items = enrichedItems as HttpTypes.StoreCartLineItem[];
  }

  return (
    <body>
      <section className="flex flex-col-reverse gap-8 px-4 py-8 md:flex-row md:gap-5 md:px-8 lg:justify-between lg:pb-20 lg:pt-5">
        <div className="w-full"></div>
        <div className="flex w-full flex-col gap-4 rounded-lg border border-accent p-4 md:max-w-[420px]">
          <Heading desktopSize="xl" font="serif" mobileSize="lg" tag="h3">
            Order details
          </Heading>
          {cart.items?.map((item) => {
            return <LineItem key={item.id} {...item} />;
          })}
        </div>
      </section>
    </body>
  );
}
