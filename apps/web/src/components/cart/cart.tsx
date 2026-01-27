import type { HttpTypes } from "@medusajs/types";
import { CartProvider } from "../context/cart";
import { CartUI } from "./cart-ui";

interface CartProps {
  cart: HttpTypes.StoreCart | null;
  addonsNode?: React.ReactNode;
  countryCode: string;
}

export function Cart(props: CartProps) {
  return (
    <CartProvider cart={props.cart} countryCode={props.countryCode}>
      <CartUI />
    </CartProvider>
  );
}
