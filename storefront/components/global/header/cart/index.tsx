import {CloseDialog, Dialog, SideDialog} from "@/components/shared/dialog";
import Icon from "@/components/shared/icon";
import Body from "@/components/shared/typography/body";
import {fetchCart} from "@/data/medusa/cart";

import {CartProvider} from "./cart-context";
import CartFooter from "./cart-footer";
import CartHeading from "./cart-heading";
import LineItem from "./line-item";
import OpenCart from "./open-cart-button";

export default async function Cart() {
  const cart = await fetchCart();

  return (
    <CartProvider cart={cart}>
      <Dialog>
        <OpenCart />
        <SideDialog align="left">
          <div className="relative flex h-full w-full flex-col border-l border-accent bg-background">
            <CartHeading />
            <div className="h-px w-full bg-accent" />
            <CloseDialog
              aria-label="Close"
              className="absolute right-[10px] top-[10px]"
            >
              <Icon className="h-9 w-9" name="Close" />
            </CloseDialog>
            <div className="flex flex-1 flex-col gap-4 overflow-y-scroll p-4">
              {cart?.items?.length === 0 ? (
                <Body font="sans" mobileSize="base">
                  Your bag is currently empty.
                </Body>
              ) : (
                cart?.items?.map((item) => <LineItem key={item.id} {...item} />)
              )}
            </div>
            <div className="h-px w-full bg-accent" />
            <CartFooter />
          </div>
        </SideDialog>
      </Dialog>
    </CartProvider>
  );
}
