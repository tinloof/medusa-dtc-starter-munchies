import type {HttpTypes} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {convertToLocale} from "@/utils/medusa/money";

import LineItem from "./line-item";

export default function CartDetails({cart}: {cart: HttpTypes.StoreCart}) {
  return (
    <div className="flex h-fit w-full flex-col gap-4 rounded-lg border border-accent p-4 md:max-w-[420px]">
      <Heading desktopSize="xl" font="serif" mobileSize="lg" tag="h3">
        Order details
      </Heading>
      {cart.items?.map((item) => <LineItem key={item.id} {...item} />)}
      <div className="h-px w-full bg-accent" />
      <CheckoutSummary cart={cart} />
    </div>
  );
}

export function CheckoutSummary({cart}: {cart: HttpTypes.StoreCart}) {
  const summaryItems = [
    {amount: cart.subtotal, label: "Subtotal"},
    {amount: cart.tax_total, label: "Taxes"},
    {amount: cart.shipping_total, label: "Shipping"},
  ];

  const total = {amount: cart.total, label: "Total", type: "total"};

  return (
    <>
      {summaryItems.map((item) => (
        <CheckoutSummaryItem
          amount={item.amount}
          currency_code={cart.currency_code}
          key={item.label}
          label={item.label}
        />
      ))}
      <CheckoutTotal {...total} currency_code={cart.currency_code} />
    </>
  );
}

export function CheckoutSummaryItem({
  amount,
  currency_code,
  label,
}: {
  amount: number;
  currency_code: string;
  label: string;
}) {
  const display = convertToLocale({
    amount,
    currency_code: currency_code,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <Body font="sans" mobileSize="lg">
          {label}
        </Body>

        <Body font="sans" mobileSize="lg">
          {display}
        </Body>
      </div>
    </>
  );
}

export function CheckoutTotal({
  amount,
  currency_code,
  label,
}: {
  amount: number;
  currency_code: string;
  label: string;
}) {
  const display = convertToLocale({
    amount,
    currency_code: currency_code,
  });

  return (
    <>
      <div className="h-px w-full bg-accent" />
      <div className="flex items-center justify-between">
        <Heading desktopSize="base" font="sans" mobileSize="base" tag="h3">
          {label}
        </Heading>

        <Heading desktopSize="base" font="sans" mobileSize="base" tag="h3">
          {display}
        </Heading>
      </div>
    </>
  );
}
