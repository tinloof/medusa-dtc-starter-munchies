import {retrieveCart} from "@/actions/medusa/cart";
import {Dialog, OpenDialog, SideDialog} from "@/components/shared/dialog";
import Icon from "@/components/shared/icon";

import {CartProvider} from "./cart-context";
import CartHeading from "./cart-heading";
import LineItem from "./line-item";

export default async function Cart() {
  const cart = await retrieveCart();

  return (
    <Dialog>
      <OpenDialog>
        <Icon name="Cart" />
      </OpenDialog>
      <SideDialog align="left">
        <CartProvider cart={cart}>
          <div className="z-[9999] flex h-full w-full flex-col border-l border-accent bg-background">
            <div className="flex p-4">
              <CartHeading />
            </div>
            <div className="h-px w-full bg-accent" />
            <div className="p-4">
              {cart?.items?.map((item) => {
                return <LineItem key={item.id} {...item} />;
              })}
            </div>
          </div>
        </CartProvider>
      </SideDialog>
    </Dialog>
  );
}
