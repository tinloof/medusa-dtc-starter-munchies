"use client";

import type {HttpTypes} from "@medusajs/types";
import type {Stripe, StripeElementsOptions} from "@stripe/stripe-js";

import {Elements} from "@stripe/react-stripe-js";

type StripeWrapperProps = {
  children: React.ReactNode;
  paymentSession: HttpTypes.StorePaymentSession;
  stripeKey?: string;
  stripePromise: Promise<Stripe | null> | null;
};

const StripeWrapper: React.FC<StripeWrapperProps> = ({
  children,
  paymentSession,
  stripeKey,
  stripePromise,
}) => {
  const options: StripeElementsOptions = {
    clientSecret: paymentSession!.data?.client_secret as string | undefined,
  };

  if (!stripeKey) {
    throw new Error(
      "Stripe key is missing. Set NEXT_PUBLIC_STRIPE_KEY environment variable.",
    );
  }

  if (!stripePromise) {
    throw new Error(
      "Stripe promise is missing. Make sure you have provided a valid Stripe key.",
    );
  }

  if (!paymentSession?.data?.client_secret) {
    throw new Error(
      "Stripe client secret is missing. Cannot initialize Stripe.",
    );
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;
