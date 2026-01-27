import { useCallback, useRef } from "react";
import { Icon } from "@/components/shared/icon";
import {
  CloseDialog,
  Dialog,
  SideDialog,
} from "@/components/shared/side-dialog";
import { Body } from "@/components/shared/typography/body";
import { useCart } from "../context/cart";
import { CartFooter } from "./cart-footer";
import { CartHeading } from "./cart-heading";
import { LineItem } from "./line-item";
import { OpenCart } from "./open-cart";

export function CartUI() {
  const { cart } = useCart();
  const originalParentRef = useRef<HTMLElement>(null);
  const isEmptyCart = !cart?.items || cart.items.length === 0;

  const handleAddonsMount = useCallback((node: HTMLDivElement | null) => {
    const el = document.getElementById("cart-addons");
    if (!el) {
      return;
    }

    if (node) {
      originalParentRef.current = el.parentElement;
      el.classList.remove("hidden");
      node.appendChild(el);
    } else if (originalParentRef.current) {
      originalParentRef.current.appendChild(el);
      el.classList.add("hidden");
    }
  }, []);

  return (
    <Dialog>
      <OpenCart />
      <SideDialog>
        <div className="relative flex h-full w-full flex-col border-accent border-l bg-background">
          <CartHeading />
          <div className="h-px w-full bg-accent" />
          <CloseDialog
            aria-label="Close"
            className="absolute top-2.5 right-2.5"
          >
            <Icon className="h-9 w-9" name="Close" />
          </CloseDialog>
          <div className="flex flex-1 flex-col justify-between overflow-y-auto">
            <div className="flex flex-col gap-4 p-4">
              {isEmptyCart ? (
                <Body font="sans" mobileSize="base">
                  Your bag is currently empty.
                </Body>
              ) : (
                [...(cart.items ?? [])]
                  .sort((a, b) => {
                    const dateA = a.created_at
                      ? new Date(a.created_at).getTime()
                      : 0;
                    const dateB = b.created_at
                      ? new Date(b.created_at).getTime()
                      : 0;
                    return dateB - dateA;
                  })
                  .map((item) => <LineItem key={item.id} {...item} />)
              )}
            </div>
            <div ref={handleAddonsMount} />
          </div>
          {!isEmptyCart && <CartFooter />}
        </div>
      </SideDialog>
    </Dialog>
  );
}
