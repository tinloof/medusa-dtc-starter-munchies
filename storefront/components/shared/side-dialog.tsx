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

export function SideDialog({style, ...passThrough}: DialogContentProps) {
  return (
    <Portal>
      <Overlay className="fixed inset-0 bg-transparent" />
      <Content
        className="fixed top-0 z-[9999] h-full w-[430px] max-w-full transition-transform ease-in-out data-[state=closed]:animate-exitToRight data-[state=open]:animate-enterFromRight lg:right-0"
        style={{...style}}
        {...passThrough}
      />
    </Portal>
  );
}