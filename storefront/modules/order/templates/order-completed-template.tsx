import type {HttpTypes} from "@medusajs/types";

import Heading from "@/components/shared/typography/heading";
import CartTotals from "@/modules/common/components/cart-totals";
import Divider from "@/modules/common/components/divider";
import Help from "@/modules/order/components/help";
import Items from "@/modules/order/components/items";
import OnboardingCta from "@/modules/order/components/onboarding-cta";
import OrderDetails from "@/modules/order/components/order-details";
import PaymentDetails from "@/modules/order/components/payment-details";
import ShippingDetails from "@/modules/order/components/shipping-details";
import {cookies as nextCookies} from "next/headers";

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder;
};

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies();

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true";

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-2xl px-s py-2xl md:py-8xl">
      <div className="flex flex-col gap-xs">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        {/* <div
        className="flex flex-col gap-xs"
        data-testid="order-complete-container"
      > */}
        <Heading
          // className="text-ui-fg-base mb-4 flex flex-col gap-y-3 text-3xl"
          className="mb-lg"
          desktopSize="2xl"
          font="serif"
          mobileSize="lg"
          tag="h1"
        >
          Merci ! Votre commande a été passée avec succès.
        </Heading>

        <OrderDetails order={order} />
      </div>

      <div className="flex flex-col gap-s">
        <Heading desktopSize="xl" font="serif" mobileSize="lg" tag="h2">
          Sommaire
        </Heading>
        <Items order={order} />
        <Divider />
        <CartTotals totals={order} />
      </div>

      <ShippingDetails order={order} />
      <PaymentDetails order={order} />
      <Help />
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
