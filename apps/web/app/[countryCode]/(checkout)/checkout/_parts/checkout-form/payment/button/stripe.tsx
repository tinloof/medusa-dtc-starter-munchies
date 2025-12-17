import type { StoreCart } from "@medusajs/types";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { track } from "@vercel/analytics";
import { useState, useTransition } from "react";
import { placeOrder } from "@/actions/medusa/order";
import { Cta } from "@/components/shared/button";
import Body from "@/components/shared/typography/body";

export default function StripePaymentButton({
	cart,
	notReady,
}: {
	cart: StoreCart;
	notReady: boolean;
}) {
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const [isPending, startTransition] = useTransition();

	const onPaymentCompleted = async () => {
		startTransition(async () => {
			try {
				await placeOrder();
				track("checkout-completed");
			} catch (err: any) {
				// Redirect errors should be re-thrown to allow Next.js to handle them
				if (err?.digest?.startsWith("NEXT_REDIRECT")) {
					throw err;
				}

				setErrorMessage(err.message);
			}
		});
	};

	const stripe = useStripe();
	const elements = useElements();
	const card = elements?.getElement("card");

	const session = cart.payment_collection?.payment_sessions?.find(
		(s) => s.status === "pending",
	);

	const disabled = !!(!stripe || !elements);

	const handlePayment = () => {
		startTransition(async () => {
			if (!stripe || !elements || !card || !cart) {
				return;
			}

			try {
				const { error, paymentIntent } = await stripe.confirmCardPayment(
					session?.data.client_secret as string,
					{
						payment_method: {
							billing_details: {
								address: {
									city: cart.billing_address?.city ?? undefined,
									country: cart.billing_address?.country_code ?? undefined,
									line1: cart.billing_address?.address_1 ?? undefined,
									line2: cart.billing_address?.address_2 ?? undefined,
									postal_code: cart.billing_address?.postal_code ?? undefined,
									state: cart.billing_address?.province ?? undefined,
								},
								email: cart.email,
								name:
									cart.billing_address?.first_name +
									" " +
									cart.billing_address?.last_name,
								phone: cart.billing_address?.phone ?? undefined,
							},
							card: card,
						},
					},
				);

				if (error) {
					const pi = error.payment_intent;

					if (
						(pi && pi.status === "requires_capture") ||
						(pi && pi.status === "succeeded")
					) {
						await onPaymentCompleted();
					}

					setErrorMessage(error.message || null);
					return;
				}

				if (
					(paymentIntent && paymentIntent.status === "requires_capture") ||
					paymentIntent.status === "succeeded"
				) {
					await onPaymentCompleted();
				}
			} catch (err: any) {
				setErrorMessage(err.message);
			}
		});
	};

	return (
		<>
			<Cta
				className="w-full"
				disabled={disabled || notReady}
				loading={isPending}
				onClick={handlePayment}
				size="sm"
			>
				Complete order
			</Cta>
			<Body font="sans">{errorMessage}</Body>
		</>
	);
}
