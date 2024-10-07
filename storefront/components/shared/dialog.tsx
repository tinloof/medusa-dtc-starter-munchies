"use client";

import type {
  DialogCloseProps,
  DialogContentProps,
  DialogProps,
  DialogTriggerProps,
} from "@radix-ui/react-dialog";

import {Content, Portal, Root, Trigger} from "@radix-ui/react-dialog";
import {cx} from "cva";

import {useCart} from "../global/header/cart/cart-context";

export function Dialog(props: Omit<DialogProps, "onOpenChange" | "open">) {
  const {cartOpen, setCartOpen} = useCart();
  return (
    <Root onOpenChange={(v) => setCartOpen(v)} open={cartOpen} {...props} />
  );
}

export function OpenDialog(props: DialogTriggerProps) {
  return <Trigger {...props} />;
}

export function CloseDialog(props: DialogCloseProps) {
  return <CloseDialog {...props} />;
}

export function SideDialog({
  align = "left",
  className,
  style,
  width = 430,
  ...passThrough
}: {align?: "left" | "right"; width?: number} & DialogContentProps) {
  return (
    <Portal>
      <Content
        className={cx(
          className,
          "fixed top-0 h-full transform transition-transform ease-in-out",
          {
            "animate-slide-in-from-left left-0": align === "right",
            "animate-slide-in-from-right right-0": align === "left",
          },
        )}
        style={{...style, width}}
        {...passThrough}
      />
    </Portal>
  );
}
