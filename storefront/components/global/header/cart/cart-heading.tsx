"use client";

import Heading from "@/components/shared/typography/heading";

import {useCart} from "./cart-context";
import ProgressBar from "./progress-bar";

export default function CartHeading() {
  const {cart} = useCart();

  const count = (cart?.items?.length ?? 0).toString();

  return (
    <div className="flex flex-col gap-4 p-4">
      <Heading desktopSize="2xl" font="serif" mobileSize="lg" tag="h3">
        My Bag ({count})
      </Heading>
      <ProgressBar />
    </div>
  );
}
