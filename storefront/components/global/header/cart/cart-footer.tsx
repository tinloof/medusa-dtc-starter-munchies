"use client";

import {Cta, Link} from "@/components/shared/button";
import Body from "@/components/shared/typography/body";
import {convertToLocale} from "@/utils/medusa/money";

import {useCart} from "./cart-context";

export default function CartFooter() {
  const {cart, isUpdating} = useCart();

  const subtotal = cart
    ? convertToLocale({
        amount: cart.subtotal,
        currency_code: cart.currency_code,
      })
    : null;

  const cartIsEmpty = cart?.items?.length === 0;

  if (cartIsEmpty) return null;

  return (
    <>
      <div className="h-px w-full bg-accent" />
      <div className="flex w-full flex-col justify-between gap-4 p-s">
        <div className="flex w-full justify-between gap-4">
          <div>
            <Body className="font-semibold" font="sans" mobileSize="base">
              Sous-total
            </Body>
            <Body font="sans" mobileSize="sm">
              Taxes et frais de livraison calculés lors du paiement
            </Body>
          </div>
          {subtotal && (
            <Body font="sans" mobileSize="base">
              {subtotal}
            </Body>
          )}
        </div>
        {!cartIsEmpty && !isUpdating ? (
          <Link className="w-full" href="/checkout" size="lg" variant="primary">
            Aller au paiement
          </Link>
        ) : (
          <Cta
            className="w-full"
            disabled
            loading={isUpdating}
            size="lg"
            variant="primary"
          >
            Aller au paiement
          </Cta>
        )}
      </div>
    </>
  );
}
