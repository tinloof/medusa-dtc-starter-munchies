"use client";
import Body from "@/components/shared/typography/body";

import {useCart} from "./cart-context";

export default function CartHeading() {
  const {cart} = useCart();

  const count = (cart?.items?.length ?? 0).toString();

  return (
    <Body desktopSize="2xl" font="display" mobileSize="xl">
      My Bag ({count})
    </Body>
  );
}
