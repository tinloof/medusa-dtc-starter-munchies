import type {Header} from "@/types/sanity.generated";

import {getEnrichedCart} from "@/data/medusa/cart";
import {getRegion} from "@/data/medusa/regions";
import {Suspense} from "react";

import CartAddons from "./cart-addons";
import {CartProvider} from "./cart-context";
import CartUI from "./cart-ui";

type Props = Pick<Header, "cartAddons">;

export default async function Cart({
  cartAddons,
  countryCode,
}: {countryCode: string} & Props) {
  const cart = await getEnrichedCart();

  const region = await getRegion(countryCode);

  const addonIds = (cartAddons?.map(({_ref}) => _ref) ?? []).filter(
    (id) => !cart?.items?.map(({product_id}) => product_id)?.includes(id),
  );
  const isEmptyCart = !cart?.items || cart.items.length === 0;
  const addons =
    region && addonIds.length > 0 ? (
      <Suspense>
        <CartAddons
          ids={addonIds}
          isEmptyCart={isEmptyCart}
          region_id={region.id}
        />
      </Suspense>
    ) : null;

  return (
    <CartProvider cart={cart} countryCode={countryCode}>
      <CartUI addons={addons} />
    </CartProvider>
  );
}
