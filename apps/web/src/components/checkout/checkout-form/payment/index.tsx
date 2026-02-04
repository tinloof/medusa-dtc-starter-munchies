import { actions } from "astro:actions";
import type { StoreCart, StorePaymentProvider } from "@medusajs/types";
import { Indicator, Item, Root } from "@radix-ui/react-radio-group";
import { CardElement } from "@stripe/react-stripe-js";
import type { StripeCardElementOptions } from "@stripe/stripe-js";
import {
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
  useTransition,
} from "react";
import { Cta } from "@/components/shared/button";
import { Body } from "@/components/shared/typography/body";
import { Heading } from "@/components/shared/typography/heading";
import { PaymentButton } from "./button";
import { isStripe as isStripeFunc } from "./utils";
import { StripeContext } from "./wrapper";

export function Payment({
  active,
  cart,
  methods,
  setCart,
  setStep,
}: {
  active: boolean;
  cart: StoreCart;
  methods: StorePaymentProvider[];
  setCart: Dispatch<SetStateAction<StoreCart>>;
  setStep: Dispatch<
    SetStateAction<"addresses" | "delivery" | "payment" | "review">
  >;
}) {
  const [error, setError] = useState<null | string>(null);
  const [cardComplete, setCardComplete] = useState(false);

  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  );

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? methods[0].id
  );

  const isStripe = isStripeFunc(selectedPaymentMethod);
  const stripeReady = useContext(StripeContext);

  const [isPending, startTransition] = useTransition();

  function initiatePayment() {
    startTransition(async () => {
      const { error, data } = await actions.order.initiatePaymentSession({
        cart,
        data: {
          provider_id: selectedPaymentMethod,
        },
      });
      if (!error && data.cart && data.status === "success") {
        setCart(data.cart);
        if (selectedPaymentMethod === "pp_system_default") {
          setStep("review");
        }
      }
    });
  }

  const activeMethod = methods.find(
    ({ id }) => id === activeSession?.provider_id
  );
  const isFilled = !!activeMethod && !active;

  const method = getMethodInfo(activeMethod?.id);

  return (
    <div className="flex w-full flex-col gap-8 border-accent border-t py-8">
      <div className="flex items-center justify-between">
        <Heading desktopSize="xs" font="sans" mobileSize="xs" tag="h6">
          Payment
        </Heading>
        {isFilled ? (
          <Cta onClick={() => setStep("payment")} size="sm" variant="outline">
            Edit
          </Cta>
        ) : null}
      </div>
      {isFilled ? (
        <div className="flex flex-1 flex-col gap-4">
          <Body className="font-semibold" font="sans">
            Method
          </Body>
          <Body font="sans">{method.name}</Body>
        </div>
      ) : null}
      {active ? (
        <Root
          className="flex w-full flex-col gap-4"
          defaultValue={selectedPaymentMethod}
          name="shippingMethodId"
          onValueChange={(v) => setSelectedPaymentMethod(v)}
        >
          {methods.map((item) => (
            <Item
              className="flex w-full items-center justify-between gap-2.5 rounded-lg border-[1.5px] border-accent px-[32px] py-4.75 data-[state=checked]:bg-accent data-[state=checked]:text-background"
              key={item.id}
              value={item.id}
            >
              <div className="size-4 rounded-full border border-accent">
                <Indicator id={item.id}>
                  <div className="size-4 rounded-full border-4 border-background" />
                </Indicator>
              </div>
              <div className="flex w-full items-center justify-between">
                <Body font="sans">{getMethodInfo(item.id).name}</Body>
              </div>
            </Item>
          ))}
          {isStripe && stripeReady ? (
            <div className="mt-5 flex flex-col gap-2 transition-all duration-150 ease-in-out">
              <Body font="sans">Enter your card details:</Body>

              <CardElement
                onChange={(e) => {
                  setError(e.error?.message || null);
                  setCardComplete(e.complete);
                }}
                options={stripeCardElementOptions}
              />
              {error ? <Body font="sans">{error}</Body> : null}
            </div>
          ) : null}

          {isStripe && stripeReady ? (
            <PaymentButton cart={cart} disabled={!cardComplete} />
          ) : (
            <Cta
              loading={isPending}
              onClick={initiatePayment}
              size="sm"
              type="submit"
            >
              {isStripe ? "Add card details" : "Continue to review"}
            </Cta>
          )}
        </Root>
      ) : null}
    </div>
  );
}

const stripeCardElementOptions: StripeCardElementOptions = {
  classes: {
    base: "pt-3 pb-1 block w-full h-11 px-4 text-accent mt-0 bg-background border-2 rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-accent transition-all duration-300 ease-in-out",
  },
  style: {
    base: {
      "::placeholder": {
        color: "rgb(107 114 128)",
      },
      color: "#424270",
      fontFamily: "Inter, sans-serif",
    },
  },
};

function getMethodInfo(id?: string) {
  switch (id) {
    case "pp_system_default":
      return {
        id,
        name: "Testing method",
      };
    case "pp_stripe_stripe":
      return {
        id,
        name: "Stripe",
      };
    default:
      return {
        id,
        name: "Unknown",
      };
  }
}
