import {placeOrder} from "@/actions/medusa/order";
import {Cta} from "@/components/shared/button";
import {track} from "@vercel/analytics";
import {useTransition} from "react";

export default function ManualPaymentButton({notReady}: {notReady: boolean}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      track("checkout-completed");

      placeOrder();
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
