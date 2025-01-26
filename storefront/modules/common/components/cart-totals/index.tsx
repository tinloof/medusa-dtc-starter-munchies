"use client";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {convertToLocale} from "@/lib/util/money";
import React from "react";

import Divider from "../divider";

type CartTotalsProps = {
  totals: {
    currency_code: string;
    discount_subtotal?: null | number;
    gift_card_total?: null | number;
    item_subtotal?: null | number;
    shipping_subtotal?: null | number;
    shipping_total?: null | number;
    tax_total?: null | number;
    total?: null | number;
  };
};

const CartTotals: React.FC<CartTotalsProps> = ({totals}) => {
  const {
    currency_code,
    discount_subtotal,
    gift_card_total,
    item_subtotal,
    shipping_subtotal,
    tax_total,
    total,
  } = totals;

  function convertMoney(amount?: null | number) {
    return convertToLocale({
      amount: amount ?? 0,
      currency_code: currency_code,
    });
  }

  return (
    <div className="flex flex-col gap-s">
      <div className="flex flex-col gap-s">
        <SubLineItem
          title="Sous-total (hors frais de livraison et taxes)"
          value={convertMoney(item_subtotal)}
        />
        {!!discount_subtotal && (
          <SubLineItem
            title="Rabais"
            value={`- ${convertMoney(discount_subtotal)}`}
          />
        )}
        <SubLineItem
          title="Frais de livraison"
          value={convertMoney(shipping_subtotal)}
        />
        <SubLineItem title="Taxes" value={convertMoney(tax_total)} />
        {!!gift_card_total && (
          <SubLineItem
            title="Carte-cadeau"
            value={`- ${convertMoney(gift_card_total)}`}
          />
        )}
      </div>

      <Divider />

      <div className="flex justify-between">
        <Heading desktopSize="base" font="sans" mobileSize="sm" tag="h4">
          Total
        </Heading>
        <Heading desktopSize="base" font="sans" mobileSize="sm" tag="h4">
          {convertMoney(total)}
        </Heading>
      </div>
    </div>
  );
};

export function SubLineItem({title, value}: {title: string; value: string}) {
  return (
    <div className="flex items-center justify-between gap-xl">
      <Body className="mb-[6px] font-semibold" desktopSize="base" font="sans">
        {title}
      </Body>
      <Body className="mb-[6px] font-semibold" desktopSize="base" font="sans">
        {value}
      </Body>
    </div>
  );
}

export function Separator() {
  return <div className="h-px w-full bg-accent" />;
}

export default CartTotals;
