"use client";
import type {StoreCartLineItem} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import {convertToLocale} from "@/utils/medusa/money";
import Image from "next/image";

export default function LineItem(props: StoreCartLineItem) {
  const item = props;

  if (!((item?.quantity || 0) > 0)) return null;

  const unit_price = convertToLocale({
    amount: item?.unit_price || 0,
    currency_code: (item?.variant?.calculated_price?.currency_code || null)!,
  });

  const item_price = convertToLocale({
    amount: (item?.unit_price || 0) * (item?.quantity || 1),
    currency_code: (item?.variant?.calculated_price?.currency_code || null)!,
  });

  return (
    <div className="flex items-start justify-between gap-2 space-x-4">
      <Image
        alt={props.title}
        className="h-[100px] w-[100px] rounded-lg border-[1.5px] border-accent object-cover"
        height={100}
        src={props.product?.thumbnail || ""}
        width={100}
      />
      <div className="flex w-full flex-col items-start justify-start gap-4">
        <div className="flex w-full justify-between gap-3">
          <div>
            <Body className="leading-[130%]" font="sans" mobileSize="lg">
              {props.product?.title}
            </Body>
            <Body className="mt-1" font="sans" mobileSize="sm">
              {props.title}
            </Body>
          </div>
          <div className="flex min-w-[100px] flex-col items-end">
            <Body
              className="font-semibold opacity-80"
              font="sans"
              mobileSize="base"
            >
              {item.quantity} x {unit_price}
            </Body>
            <Body className="font-semibold" font="sans" mobileSize="base">
              {item_price}
            </Body>
          </div>
        </div>
      </div>
    </div>
  );
}
