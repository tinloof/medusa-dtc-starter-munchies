import Bancontact from "@/modules/common/icons/bancontact";
import Ideal from "@/modules/common/icons/ideal";
import PayPal from "@/modules/common/icons/paypal";
import {CreditCard} from "@medusajs/icons";
import React from "react";

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  {icon: React.JSX.Element; title: string}
> = {
  // Add more payment providers here
  pp_paypal_paypal: {
    icon: <PayPal />,
    title: "PayPal",
  },
  pp_stripe_stripe: {
    icon: <CreditCard />,
    title: "Credit card",
  },
  "pp_stripe-bancontact_stripe": {
    icon: <Bancontact />,
    title: "Bancontact",
  },
  "pp_stripe-ideal_stripe": {
    icon: <Ideal />,
    title: "iDeal",
  },
  pp_system_default: {
    icon: <CreditCard />,
    title: "Manual Payment",
  },
};

// This only checks if it is native stripe for card payments, it ignores the other stripe-based providers
export const isStripe = (providerId?: string) => {
  return providerId?.startsWith("pp_stripe_");
};
export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal");
};
export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default");
};

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
];
