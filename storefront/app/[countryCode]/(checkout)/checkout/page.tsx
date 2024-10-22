import type {PageProps} from "@/types";
import type {HttpTypes} from "@medusajs/types";

import {getCart} from "@/data/medusa/cart";
import {
  listCartPaymentMethods,
  listCartShippingMethods,
} from "@/data/medusa/fullfilment";
import {enrichLineItems} from "@/data/medusa/line-items";
import {redirect} from "next/navigation";

import CartDetails from "./_parts/cart-details";
import CheckoutForm from "./_parts/checkout-form";

export default async function CheckoutPage(props: PageProps<"countryCode">) {
  const params = await props.params;

  const {countryCode} = params;

  const cart = await getCart();

  if (!cart || (cart.items?.length || 0) === 0) {
    return redirect(`/${countryCode}/`);
  }

  if (cart?.items?.length) {
    cart.items = (await enrichLineItems(
      cart.items,
      cart.region_id,
    )) as HttpTypes.StoreCartLineItem[];
  }

  const shippingMethods = (await listCartShippingMethods(cart.id)) || [];
  const paymentMethods = (await listCartPaymentMethods(cart.region_id!)) || [];

  return (
    <section className="mx-auto flex w-full max-w-max-screen flex-col-reverse gap-8 px-4 py-8 md:flex-row md:gap-20 md:px-8 lg:justify-between lg:pb-20 lg:pt-5">
      <CheckoutForm
        cart={cart}
        paymentMethods={paymentMethods}
        shippingMethods={shippingMethods}
      />
      <CartDetails cart={cart} />
    </section>
  );
}
