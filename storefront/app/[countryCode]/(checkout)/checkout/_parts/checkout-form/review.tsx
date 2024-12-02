"use client";

import type {StoreCart} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";

import PaymentButton from "./payment/button";

export default function Review({
  active,
  cart,
}: {
  active: boolean;
  cart: StoreCart;
}) {
  if (!active) return null;

  return (
    <div className="flex w-full flex-col gap-8 border-t border-accent py-8">
      <Heading desktopSize="xs" font="sans" mobileSize="xs" tag="h6">
        Révision
      </Heading>
      <>
        <Body>
          En cliquant sur le bouton « Finaliser la commande », vous confirmez
          que vous avez lu, compris et accepté nos Conditions
          d&apos;utilisation, nos Conditions de vente et notre Politique de
          retour, et reconnaissez avoir pris connaissance de la Politique de
          confidentialité de Lakikabio.
        </Body>
        <PaymentButton cart={cart} />
      </>
    </div>
  );
}
