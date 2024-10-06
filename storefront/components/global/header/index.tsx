import {retrieveCart} from "@/actions/medusa/cart";

export default async function Header() {
  const cart = await retrieveCart();

  return <header>Cart total : {cart?.total}</header>;
}
