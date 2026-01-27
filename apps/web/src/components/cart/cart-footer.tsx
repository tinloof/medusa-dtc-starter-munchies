import { ButtonLink, Cta } from "@/components/shared/button";
import { Body } from "@/components/shared/typography/body";
import { convertToLocale } from "@/lib/utils/medusa/money";
import { useCart } from "../context/cart";

export function CartFooter() {
  const { cart, isUpdating } = useCart();

  const item_total = cart
    ? convertToLocale({
        amount: cart.item_total,
        currency_code: cart.currency_code,
      })
    : null;

  const cartIsEmpty = cart?.items?.length === 0;

  if (cartIsEmpty) {
    return null;
  }

  return (
    <>
      <div className="h-px w-full bg-accent" />
      <div className="flex w-full flex-col justify-between gap-4 p-s">
        <div className="flex w-full justify-between gap-4">
          <div>
            <Body className="font-semibold" font="sans" mobileSize="base">
              Subtotal
            </Body>
            <Body font="sans" mobileSize="sm">
              Taxes and shipping calculated at checkout
            </Body>
          </div>
          {item_total ? (
            <Body font="sans" mobileSize="base">
              {item_total}
            </Body>
          ) : null}
        </div>
        {cartIsEmpty || isUpdating ? (
          <Cta className="w-full" disabled size="lg" variant="primary">
            Go to checkout
          </Cta>
        ) : (
          <ButtonLink
            className="w-full"
            href="/checkout"
            size="lg"
            variant="primary"
          >
            Go to checkout
          </ButtonLink>
        )}
      </div>
    </>
  );
}
