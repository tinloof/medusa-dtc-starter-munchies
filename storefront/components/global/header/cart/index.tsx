import {
  CloseDialog,
  Dialog,
  OpenDialog,
  SideDialog,
} from "@/components/shared/dialog";
import Icon from "@/components/shared/icon";
import Body from "@/components/shared/typography/body";
import { fetchCart } from "@/data/medusa/cart";

import { CartProvider } from "./cart-context";
import CartFooter from "./cart-footer";
import CartHeading from "./cart-heading";
import LineItem from "./line-item";

export default async function Cart() {
  const cart = await fetchCart();

  const count = (cart?.items?.length ?? 0).toString();
  return (
    <CartProvider cart={cart}>
      <Dialog>
        <OpenDialog>
          <div className="relative h-10 w-10 p-2">
            <Icon name="Cart" />
            <Body
              className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-background"
              font="sans"
              mobileSize="sm"
            >
              {count}
            </Body>
          </div>
        </OpenDialog>
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
              {cart?.items?.map((item) => {
                return <LineItem key={item.id} {...item} />;
              })}
            </div>
            <div className="h-px w-full bg-accent" />
            <CartFooter />
          </div>
        </SideDialog>
      </Dialog>
    </CartProvider>
  );
}
