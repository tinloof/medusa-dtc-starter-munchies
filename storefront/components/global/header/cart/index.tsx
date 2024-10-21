import type {Header} from "@/types/sanity.generated";

import Icon from "@/components/shared/icon";
import {CloseDialog, Dialog, SideDialog} from "@/components/shared/side-dialog";
import Body from "@/components/shared/typography/body";
import {fetchCart} from "@/data/medusa/cart";
import {getRegion} from "@/data/medusa/regions";
import {Suspense} from "react";

import CartAddons from "./cart-addons";
import {CartProvider} from "./cart-context";
import CartFooter from "./cart-footer";
import CartHeading from "./cart-heading";
import LineItem from "./line-item";
import OpenCart from "./open-cart-button";

type Props = Pick<Header, "cartAddons">;

export default async function Cart({
  cartAddons,
  countryCode,
}: {countryCode: string} & Props) {
  const cart = await fetchCart();

  const region = await getRegion(countryCode);

  const addonIds = (cartAddons?.map(({_ref}) => _ref) ?? []).filter(
    (id) => !cart?.items?.map(({product_id}) => product_id)?.includes(id),
  );
  const isEmptyCart = !cart?.items || cart.items.length === 0;
  return (
    <CartProvider cart={cart}>
      <Dialog>
        <OpenCart />
        <SideDialog>
          <div className="relative flex h-full w-full flex-col border-l border-accent bg-background">
            <CartHeading />
            <div className="h-px w-full bg-accent" />
            <CloseDialog
              aria-label="Close"
              className="absolute right-[10px] top-[10px]"
            >
              <Icon className="h-9 w-9" name="Close" />
            </CloseDialog>
            <div className="flex flex-1 flex-col justify-between overflow-y-scroll">
              <div className="flex flex-col gap-4 p-4">
                {isEmptyCart ? (
                  <Body font="sans" mobileSize="base">
                    Your bag is currently empty.
                  </Body>
                ) : (
                  cart.items?.map((item) => (
                    <LineItem key={item.id} {...item} />
                  ))
                )}
              </div>
              {region && addonIds.length > 0 && (
                <Suspense>
                  <CartAddons
                    ids={addonIds}
                    isEmptyCart={isEmptyCart}
                    region_id={region.id}
                  />
                </Suspense>
              )}
            </div>
            {!isEmptyCart && <CartFooter />}
          </div>
        </SideDialog>
      </Dialog>
    </CartProvider>
  );
}
