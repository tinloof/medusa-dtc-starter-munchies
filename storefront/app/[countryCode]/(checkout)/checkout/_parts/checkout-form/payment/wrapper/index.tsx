"use client";

import type {HttpTypes} from "@medusajs/types";

import {loadStripe} from "@stripe/stripe-js";
import React, {createContext} from "react";

import {isStripe} from "../utils";
import StripeWrapper from "./stripe-wrapper";

type WrapperProps = {
  cart: HttpTypes.StoreCart;
  children: React.ReactNode;
};

export const StripeContext = createContext(false);

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const Wrapper: React.FC<WrapperProps> = ({cart, children}) => {
  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending",
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
          stripeKey={stripeKey}
          stripePromise={stripePromise}
        >
          {children}
        </StripeWrapper>
      </StripeContext.Provider>
    );
  }

  return children;
};

export default Wrapper;
