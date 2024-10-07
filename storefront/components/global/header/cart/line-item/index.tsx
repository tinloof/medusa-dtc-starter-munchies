"use client";
import type {StoreCartLineItem} from "@medusajs/types";

import Icon from "@/components/shared/icon";
import Body from "@/components/shared/typography/body";

import {useCart} from "../cart-context";

export default function LineItem(props: StoreCartLineItem) {
  const {cart, handleDeleteItem, handleUpdateCartQuantity} = useCart();

  const item = cart?.items?.find(({id}) => id === props.id);

  if (!((item?.quantity || 0) > 0)) return null;

  return (
    <div className="flex items-center space-x-4">
      <img
        alt={props.title}
        className="h-16 w-16 rounded-[0.5rem] border border-accent object-cover"
        src={props.product?.thumbnail || ""}
      />
      <div className="flex flex-grow flex-col gap-2">
        <div>
          <Body font="sans">{props.product?.title}</Body>
          <Body desktopSize="sm" font="sans">
            {props.title}
          </Body>
        </div>
        <div className="flex w-[110px] items-center justify-between space-x-2 rounded-[0.5rem] border border-accent px-[11px] py-[9px]">
          <button
            className="flex size-4 items-center justify-center"
            onClick={() => handleUpdateCartQuantity(props.id, -1)}
          >
            -
          </button>
          <Body font="sans">{item?.quantity}</Body>
          <button
            className="flex size-4 items-center justify-center"
            onClick={() => handleUpdateCartQuantity(props.id, 1)}
          >
            +
          </button>
        </div>
      </div>
      <Icon name="Trash" onClick={() => handleDeleteItem(props.id)} />
    </div>
  );
}
