import { PUBLIC_STRIPE_KEY } from "astro:env/client";
import type { HttpTypes } from "@medusajs/types";
import { loadStripe } from "@stripe/stripe-js";
import type React from "react";
import { createContext } from "react";
import { isStripe } from "../utils";
import { StripeWrapper } from "./stripe-wrapper";

interface NewType {
  cart: HttpTypes.StoreCart;
  children: React.ReactNode;
}

type WrapperProps = NewType;

export const StripeContext = createContext(false);

const stripePromise = loadStripe(PUBLIC_STRIPE_KEY);

export const Wrapper: React.FC<WrapperProps> = ({ cart, children }) => {
  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  );

  if (
    isStripe(paymentSession?.provider_id) &&
    paymentSession &&
    stripePromise
  ) {
    return (
      <StripeContext.Provider value={true}>
        <StripeWrapper
          paymentSession={paymentSession}
          stripeKey={PUBLIC_STRIPE_KEY}
          stripePromise={stripePromise}
        >
          {children}
        </StripeWrapper>
      </StripeContext.Provider>
    );
  }

  return children;
};
