import type { HttpTypes } from "@medusajs/types";
import { isManual, isStripe } from "../utils";
import { ManualPaymentButton } from "./manual";
import { StripePaymentButton } from "./stripe";

interface Props {
  cart: HttpTypes.StoreCart;
  disabled?: boolean;
}
export function PaymentButton({ cart, disabled }: Props) {
  const paymentSession = cart.payment_collection?.payment_sessions?.[0];

  const notReady = !(cart?.shipping_address && cart?.email) || disabled;

  if (isStripe(paymentSession?.provider_id)) {
    return <StripePaymentButton cart={cart} notReady={Boolean(notReady)} />;
  }

  if (isManual(paymentSession?.provider_id)) {
    return <ManualPaymentButton notReady={Boolean(notReady)} />;
  }
}
