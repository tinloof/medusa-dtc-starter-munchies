"use client";

import type {StoreCart} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";

import PaymentButton from "./payment/button";

export default function Review({
  active,
  cart,
}: {
  active: boolean;
  cart: StoreCart;
}) {
  if (!active) return null;

  return (
    <div className="flex w-full flex-col gap-8 border-t border-accent py-8">
      <Heading desktopSize="xs" font="sans" mobileSize="xs" tag="h6">
        Review
      </Heading>
      <>
        <Body>
          By clicking the ‘Complete order’ button, you confirm that you have
          read, understand, and accept our Terms of Use, Terms of Sale and
          Returns Policy and acknowledge that you have read Medusa Store’s
          Privacy Policy.
        </Body>
        <PaymentButton cart={cart} />
      </>
    </div>
  );
}
