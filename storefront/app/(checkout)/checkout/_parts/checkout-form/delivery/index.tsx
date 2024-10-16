"use client";
import type {StoreCart, StoreCartShippingOption} from "@medusajs/types";

import {setShippingMethod} from "@/actions/medusa/order";
import {Cta} from "@/components/shared/button";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {convertToLocale} from "@/utils/medusa/money";
import {Indicator, Item, Root} from "@radix-ui/react-radio-group";
import {useEffect} from "react";
import {useFormState} from "react-dom";

export default function Delivery({
  active,
  cart,
  currency_code,
  methods,
  setNextStep,
}: {
  active: boolean;
  cart: StoreCart;
  currency_code: string;
  methods: StoreCartShippingOption[];
  setNextStep: () => void;
}) {
  const [{status}, action] = useFormState(setShippingMethod, {
    error: null,
    status: "idle",
  });

  const isFilled = !active && (cart.shipping_methods?.length || 0) > 0;

  useEffect(() => {
    if (status === "success") setNextStep();
  }, [status, setNextStep]);

  return (
    <div className="flex w-full flex-col gap-8 border-t border-accent py-8">
      <div className="flex items-center justify-between">
        <Heading desktopSize="xs" font="sans" mobileSize="xs" tag="h6">
          Delivery
        </Heading>
        {isFilled && (
          <Cta size="sm" variant="outline">
            Edit
          </Cta>
        )}
      </div>
      {active && (
        <form action={action} className="flex w-full flex-col gap-4">
          <Root
            className="flex w-full flex-col gap-4"
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
          <Cta size="sm" type="submit">
            Continue to payment
          </Cta>
        </form>
      )}
    </div>
  );
}
