import {
  CloseDialog,
  Dialog,
  SideDialog,
} from "@/components/shared/side-dialog";
import { Body } from "@/components/shared/typography/body";
import { Icon } from "@/generated/Icon";
import { CLOSE } from "@/generated/icons";
import { useCart } from "../context/cart";
import { CartAddonsCarousel } from "./cart-addons-carousel";
import { CartFooter } from "./cart-footer";
import { CartHeading } from "./cart-heading";
import { LineItem } from "./line-item";
import { OpenCart } from "./open-cart";

export function CartUI() {
  const { cart, cartAddons, region } = useCart();
  const isEmptyCart = !cart?.items || cart.items.length === 0;

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
            <Icon className="size-9" href={CLOSE} />
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
            {cartAddons && cartAddons?.length > 0 && region && (
              <CartAddonsCarousel
                isEmptyCart={isEmptyCart}
                products={cartAddons}
                regionId={region.id}
              />
            )}
          </div>
          {!isEmptyCart && <CartFooter />}
        </div>
      </SideDialog>
    </Dialog>
  );
}
