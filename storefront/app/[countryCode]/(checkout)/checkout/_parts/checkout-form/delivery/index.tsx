"use client";
import type { StoreCart, StoreCartShippingOption } from "@medusajs/types";
import type { Dispatch, SetStateAction } from "react";

import { setShippingMethod } from "@/actions/medusa/order";
import { Cta } from "@/components/shared/button";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import { useResetableActionState } from "@/hooks/use-resetable-action-state";
import { convertToLocale } from "@/utils/medusa/money";
import { Indicator, Item, Root } from "@radix-ui/react-radio-group";
import { useEffect, useTransition } from "react";
import { useFormStatus } from "react-dom";

export default function Delivery({
  active,
  cart,
  currency_code,
  methods,
  setStep,
}: {
  active: boolean;
  cart: StoreCart;
  currency_code: string;
  methods: StoreCartShippingOption[];
  setStep: Dispatch<
    SetStateAction<"addresses" | "delivery" | "payment" | "review">
  >;
}) {
  const [, startTransition] = useTransition();

  const [{status}, action, , reset] = useResetableActionState(
    setShippingMethod,
    {
      error: null,
      status: "idle",
    },
  );

  const cartShippingMethod = cart.shipping_methods?.[0];

  const activeShippingMethod = methods.find(
    ({id}) => id === cartShippingMethod?.shipping_option_id,
  );

  const isFilled = !active && !!activeShippingMethod;

  const activeShippingMethodPrice = convertToLocale({
    amount: activeShippingMethod?.amount || 0,
    currency_code,
  });

  useEffect(() => {
    if (status === "success") {
      setStep("payment");
      startTransition(() => reset());
    }
  }, [status, setStep, reset]);

  return (
    <div className="flex w-full flex-col gap-8 border-t border-accent py-8">
      <div className="flex items-center justify-between">
        <Heading desktopSize="xs" font="sans" mobileSize="xs" tag="h6">
          Delivery
        </Heading>
        {isFilled && (
          <Cta onClick={() => setStep("delivery")} size="sm" variant="outline">
            Edit
          </Cta>
        )}
      </div>
      {isFilled && (
        <div className="flex flex-1 flex-col gap-4">
          <Body className="font-semibold" font="sans">
            Method
          </Body>
          <Body font="sans">
            {activeShippingMethod.name} ({activeShippingMethodPrice})
          </Body>
        </div>
      )}
      {active && (
        <form action={action} className="flex w-full flex-col gap-4">
          <Root
            className="flex w-full flex-col gap-4"
            defaultValue={cartShippingMethod?.shipping_option_id}
            name="shippingMethodId"
            required
          >
            {methods.map((item) => {
              const price = convertToLocale({
                amount: item.amount,
                currency_code,
              });

              return (
                <Item
                  className="flex w-full items-center justify-between gap-[10px] rounded-lg border-[1.5px] border-accent px-[32px] py-[19px] data-[state=checked]:bg-accent data-[state=checked]:text-background"
                  key={item.id}
                  value={item.id}
                >
                  <div className="size-4 rounded-full border border-accent">
                    <Indicator id={item.id}>
                      <div className="size-4 rounded-full border-[4px] border-background" />
                    </Indicator>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <Body font="sans">{item.name}</Body>
                    <Body font="sans">{price}</Body>
                  </div>
                </Item>
              );
            })}
          </Root>
          <SubmitButton />
        </form>
      )}
    </div>
  );
}

function SubmitButton() {
  const {pending} = useFormStatus();
  return (
    <Cta loading={pending} size="sm" type="submit">
      Continue to payment
    </Cta>
  );
}
