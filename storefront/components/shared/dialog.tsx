"use client";

import type {
  DialogCloseProps,
  DialogContentProps,
  DialogProps,
  DialogTriggerProps,
} from "@radix-ui/react-dialog";

import {
  Close,
  Content,
  Overlay,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-dialog";
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
  return <Close {...props} />;
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
      <Overlay className="fixed inset-0 bg-transparent" />
      <Content
        className={cx(
          className,
          "fixed top-0 z-[9999] h-full transition-transform ease-in-out",
          {
            "left-0 data-[state=closed]:animate-exitToLeft data-[state=open]:animate-enterFromLeft":
              align === "left",
            "right-0 data-[state=closed]:animate-exitToRight data-[state=open]:animate-enterFromRight":
              align === "right",
          },
        )}
        style={{...style, width}}
        {...passThrough}
      />
    </Portal>
  );
}
