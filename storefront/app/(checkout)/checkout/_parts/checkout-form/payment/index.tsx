"use client";
import type {StoreCart, StorePaymentProvider} from "@medusajs/types";

import {Cta} from "@/components/shared/button";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {Indicator, Item, Root} from "@radix-ui/react-radio-group";

export default function Payment({
  active,
  cart,
  methods,
  setNextStep,
}: {
  active: boolean;
  cart: StoreCart;
  methods: StorePaymentProvider[];
  setNextStep: () => void;
}) {
  return (
    <div className="flex flex-col gap-8 border-t border-accent py-8">
      <form className="flex w-full flex-col gap-8 border-t border-accent py-8">
        <div className="flex items-center justify-between">
          <Heading desktopSize="xs" font="sans" mobileSize="xs" tag="h6">
            Payment
          </Heading>
        </div>
        <Root className="flex w-full flex-col gap-4" name="shippingMethodId">
          {methods.map((item) => {
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
                  <Body font="sans">Hello world</Body>
                </div>
              </Item>
            );
          })}
          <Cta onClick={setNextStep} size="sm" type="submit">
            Continue to review
          </Cta>
        </Root>
      </form>
    </div>
  );
}
