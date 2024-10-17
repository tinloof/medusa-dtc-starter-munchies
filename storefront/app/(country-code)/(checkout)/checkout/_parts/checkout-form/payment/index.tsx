"use client";
import type {StoreCart, StorePaymentProvider} from "@medusajs/types";

import {initiatePaymentSession} from "@/actions/medusa/order";
import {Cta} from "@/components/shared/button";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {Indicator, Item, Root} from "@radix-ui/react-radio-group";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import {useFormState} from "react-dom";

export default function Payment({
  active,
  cart,
  methods,
  setStep,
}: {
  active: boolean;
  cart: StoreCart;
  methods: StorePaymentProvider[];
  setStep: Dispatch<
    SetStateAction<"addresses" | "delivery" | "payment" | "review">
  >;
}) {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending",
  );

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? methods[0].id,
  );

  const [{status}, action] = useFormState(initiatePaymentSession, {
    error: null,
    status: "idle",
  });
  const [pending, startTransition] = useTransition();

  function initiatePayment() {
    startTransition(() => {
      action({
        cart,
        data: {
          context: {},
          provider_id: selectedPaymentMethod,
        },
      });
    });
  }

  useEffect(() => {
    if (status === "success") setStep("review");
  }, [status, setStep]);

  const activeMethod = methods.find(
    ({id}) => id === activeSession?.provider_id,
  );
  const isFilled = !!activeMethod && !active;

  const method = getMethodInfo(activeMethod?.id);

  return (
    <div className="flex w-full flex-col gap-8 border-t border-accent py-8">
      <div className="flex items-center justify-between">
        <Heading desktopSize="xs" font="sans" mobileSize="xs" tag="h6">
          Payment
        </Heading>
        {isFilled && (
          <Cta onClick={() => setStep("payment")} size="sm" variant="outline">
            Edit
          </Cta>
        )}
      </div>
      {isFilled && (
        <div className="flex flex-1 flex-col gap-4">
          <Body className="font-semibold" font="sans">
            Method
          </Body>
          <Body font="sans">{method.name}</Body>
        </div>
      )}
      {active && (
        <Root
          className="flex w-full flex-col gap-4"
          defaultValue={selectedPaymentMethod}
          name="shippingMethodId"
          onValueChange={(v) => setSelectedPaymentMethod(v)}
        >
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
                  <Body font="sans">Test method</Body>
                </div>
              </Item>
            );
          })}
          <Cta
            loading={pending}
            onClick={initiatePayment}
            size="sm"
            type="submit"
          >
            Continue to review
          </Cta>
        </Root>
      )}
    </div>
  );
}

function getMethodInfo(id?: string) {
  switch (id) {
    case "pp_system_default":
      return {
        id,
        name: "Testing method",
      };
    default:
      return {
        id,
        name: "Unknown",
      };
  }
}
