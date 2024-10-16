import type {Header} from "@/types/sanity.generated";

import {CloseDialog, Dialog, SideDialog} from "@/components/shared/dialog";
import Icon from "@/components/shared/icon";
import Body from "@/components/shared/typography/body";
import {fetchCart} from "@/data/medusa/cart";
import {Suspense} from "react";

import CartAddons from "./cart-addons";
import {CartProvider} from "./cart-context";
import CartFooter from "./cart-footer";
import CartHeading from "./cart-heading";
import LineItem from "./line-item";
import OpenCart from "./open-cart-button";

type Props = Pick<Header, "cartAddons">;

export default async function Cart({cartAddons}: Props) {
  const cart = await fetchCart();

  const addonIds = (cartAddons?.map(({_ref}) => _ref) ?? []).filter(
    (id) => !cart?.items?.map(({product_id}) => product_id)?.includes(id),
  );

  return (
    <CartProvider cart={cart}>
      <Dialog>
        <OpenCart />
        <SideDialog align="right">
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
              {!cart?.items || cart.items.length === 0 ? (
                <Body font="sans" mobileSize="base">
                  Your bag is currently empty.
                </Body>
              ) : (
                cart.items.map((item) => <LineItem key={item.id} {...item} />)
              )}
            </div>
            {addonIds.length > 0 && cart?.region_id && (
              <Suspense>
                <CartAddons ids={addonIds} region_id={cart?.region_id} />
              </Suspense>
            )}
            <CartFooter />
          </div>
        </SideDialog>
      </Dialog>
    </CartProvider>
  );
}
