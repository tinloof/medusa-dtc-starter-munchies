import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { useTransition } from "react";
import { Cta } from "@/components/shared/button";

export function ManualPaymentButton({ notReady }: { notReady: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      // track("checkout-completed");

      const res = await actions.order.placeOrder();

      if (!res.error && res.data?.redirect) {
        navigate(res.data.redirect);
      }
    });
  };

  return (
    <Cta
      disabled={notReady}
      loading={isPending}
      onClick={handleClick}
      size="sm"
      type="submit"
    >
      Complete order
    </Cta>
  );
}
