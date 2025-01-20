import type {HttpTypes} from "@medusajs/types";

import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {isStripe, paymentInfoMap} from "@/lib/util/constants";
import {formatDate} from "@/lib/util/format-date";
import {convertToLocale} from "@/lib/util/money";
import Divider from "@/modules/common/components/divider";
import {Container} from "@medusajs/ui";

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder;
};

const PaymentDetails = ({order}: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0];

  return (
    <div>
      <Heading desktopSize="xl" font="serif" mobileSize="lg" tag="h2">
        Paiement
      </Heading>
      <div>
        {payment && (
          <div className="flex w-full items-start gap-x-1">
            <div className="flex w-1/3 flex-col">
              <Body className="mb-[6px] font-semibold" font="sans">
                Mode
              </Body>
              <Body data-testid="payment-method" font="sans">
                {paymentInfoMap[payment.provider_id].title}
              </Body>
            </div>
            <div className="flex w-2/3 flex-col">
              <Body className="mb-[6px] font-semibold" font="sans">
                Détails
              </Body>
              <div className="txt-medium text-ui-fg-subtle flex items-center gap-2">
                <Container className="bg-ui-button-neutral-hover flex h-7 w-fit items-center p-2">
                  {paymentInfoMap[payment.provider_id].icon}
                </Container>
                <Body data-testid="payment-amount" font="sans">
                  {isStripe(payment.provider_id) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      })} payé le ${formatDate(
                        payment.created_at ?? "",
                        true,
                      )}`}
                </Body>
              </div>
            </div>
          </div>
        )}
      </div>

      <Divider className="mt-8" />
    </div>
  );
};

export default PaymentDetails;
