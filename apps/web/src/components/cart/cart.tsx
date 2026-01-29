import type { HttpTypes } from "@medusajs/types";
import { CartProvider } from "../context/cart";
import { CartUI } from "./cart-ui";

interface CartProps {
  cart: HttpTypes.StoreCart | null;
  region?: HttpTypes.StoreRegion | null;
  cartAddons: HttpTypes.StoreProduct[] | null;
  countryCode: string;
}

export function Cart(props: CartProps) {
  return (
    <CartProvider
      addons={props.cartAddons}
      cart={props.cart}
      countryCode={props.countryCode}
      region={props.region}
    >
      <CartUI />
    </CartProvider>
  );
}
