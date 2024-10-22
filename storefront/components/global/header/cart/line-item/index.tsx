"use client";
import type {StoreCartLineItem} from "@medusajs/types";

import Icon from "@/components/shared/icon";
import Body from "@/components/shared/typography/body";
import {convertToLocale} from "@/utils/medusa/money";
import Image from "next/image";

import {isOptimisticItemId, useCart} from "../cart-context";

export default function LineItem(props: StoreCartLineItem) {
  const {cart, handleDeleteItem, handleUpdateCartQuantity} = useCart();

  const item = cart?.items?.find(({id}) => id === props.id);

  if (!((item?.quantity || 0) > 0)) return null;

  const item_price = convertToLocale({
    amount: (item?.unit_price || 0) * (item?.quantity || 1),
    currency_code: (item?.variant?.calculated_price?.currency_code || null)!,
  });

  const isOptimisticLine = isOptimisticItemId(props.id);

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
          <Body className="font-semibold" font="sans" mobileSize="base">
            {item_price}
          </Body>
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex h-10 w-32 items-center justify-center gap-1 overflow-hidden rounded-lg border border-accent">
            <button
              className="group flex h-full w-full flex-1 items-center justify-center hover:bg-secondary active:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isOptimisticLine}
              onClick={() =>
                handleUpdateCartQuantity(props.id, (item?.quantity || 0) - 1)
              }
            >
              <span className="h-[1.5px] w-2 bg-accent transition-all duration-300 group-active:bg-background" />
            </button>
            <Body className="flex-1 text-center" font="sans" mobileSize="base">
              {item?.quantity}
            </Body>
            <button
              className="group relative flex h-full w-full flex-1 items-center justify-center hover:bg-secondary active:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isOptimisticLine}
              onClick={() =>
                handleUpdateCartQuantity(props.id, (item?.quantity || 0) + 1)
              }
            >
              <span className="h-[1.5px] w-2 bg-accent transition-all duration-300 group-active:bg-background" />
              <span className="absolute left-1/2 top-1/2 h-2 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-accent transition-all duration-300 group-active:bg-background" />
            </button>
          </div>
          <button
            className="bg-transparent disabled:pointer-events-none disabled:opacity-50"
            disabled={isOptimisticLine}
            onClick={() => handleDeleteItem(props.id)}
          >
            <Icon className="size-6" name="Trash" />
          </button>
        </div>
      </div>
    </div>
  );
}
