"use client";

import {Cta} from "@/components/shared/button";
import Body from "@/components/shared/typography/body";

import {useCart} from "./cart-context";

export default function CartFooter() {
  const {cart} = useCart();

  return (
    <div className="flex w-full flex-col justify-between gap-4 p-s">
      <div className="flex w-full justify-between gap-4">
        <div>
          <Body className="font-semibold" font="sans" mobileSize="base">
            Subtotal
          </Body>
          <Body font="sans" mobileSize="sm">
            Taxes and shipping calculated at checkout
          </Body>
        </div>
        <Body font="sans" mobileSize="base">
          ${cart?.total}
        </Body>
      </div>
      <Cta className="w-full" size="lg" variant="primary">
        Go to checkout
      </Cta>
    </div>
  );
}
