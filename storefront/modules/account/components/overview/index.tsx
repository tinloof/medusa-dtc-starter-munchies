import type {HttpTypes} from "@medusajs/types";

import {Link} from "@/components/shared/button";
import LocalizedClientLink from "@/components/shared/localized-link";
import Body from "@/components/shared/typography/body";
import Heading from "@/components/shared/typography/heading";
import {formatDate} from "@/lib/util/format-date";
import {convertToLocale} from "@/lib/util/money";
import {Container} from "@medusajs/ui";
import {ChevronDown} from "lucide-react";

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null;
  orders: HttpTypes.StoreOrder[] | null;
};

const Overview = ({customer, orders}: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper">
      <div className="hidden small:block">
        <div className="text-xl-semi mb-4 flex items-center justify-between">
          <Heading
            data-testid="welcome-message"
            desktopSize="2xl"
            font="serif"
            mobileSize="xl"
            tag="h3"
          >
            Bonjour, {customer?.first_name}
          </Heading>
          <Body className="text-small-regular text-ui-fg-base" font="sans">
            Connecté en tant que :{" "}
            <span
              className="font-semibold"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </Body>
        </div>
        <div className="flex flex-col border-t border-accent-40 py-8">
          <div className="col-span-1 row-span-2 flex h-full flex-1 flex-col gap-y-4">
            <div className="mb-6 flex items-start gap-x-16 md:mb-8">
              <div className="flex flex-col gap-y-4">
                <Heading
                  className="text-large-semi"
                  data-testid="welcome-message"
                  desktopSize="base"
                  font="sans"
                  mobileSize="xl"
                  tag="h3"
                >
                  Profil
                </Heading>
                <div className="flex items-end gap-x-2">
                  <Body
                    className="text-3xl-semi leading-none"
                    data-testid="customer-profile-completion"
                    data-value={getProfileCompletion(customer)}
                    desktopSize="8xl"
                    font="sans"
                  >
                    {getProfileCompletion(customer)}%
                  </Body>
                  <Body
                    className="text-base-regular text-ui-fg-subtle uppercase"
                    font="sans"
                  >
                    Completé
                  </Body>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <Heading
                  className="text-large-semi"
                  desktopSize="base"
                  font="sans"
                  mobileSize="xl"
                  tag="h3"
                >
                  Adresses
                </Heading>
                <div className="flex items-end gap-x-2">
                  <Body
                    className="text-3xl-semi leading-none"
                    data-testid="addresses-count"
                    data-value={customer?.addresses?.length || 0}
                    desktopSize="8xl"
                    font="sans"
                  >
                    {customer?.addresses?.length || 0}
                  </Body>
                  <Body
                    className="text-base-regular text-ui-fg-subtle uppercase"
                    font="sans"
                  >
                    Enregistrées
                  </Body>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <Heading
                  className="text-large-semi"
                  desktopSize="lg"
                  font="sans"
                  tag="h3"
                >
                  Commandes récentes
                </Heading>
              </div>
              <ul
                className="flex flex-col gap-y-4"
                data-testid="orders-wrapper"
              >
                {orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li
                        data-testid="order-wrapper"
                        data-value={order.id}
                        key={order.id}
                      >
                        <LocalizedClientLink
                          href={`/account/orders/details/${order.id}`}
                        >
                          <Container className="flex items-center justify-between border-[1.5px] border-accent bg-secondary p-4">
                            <div className="text-small-regular grid flex-1 grid-cols-3 grid-rows-2 gap-x-4">
                              <Body className="font-semibold" font="sans">
                                Date
                              </Body>
                              <Body className="font-semibold" font="sans">
                                Numéro
                              </Body>
                              <Body className="font-semibold" font="sans">
                                Montant total
                              </Body>
                              <span data-testid="order-created-date">
                                {formatDate(order.created_at)}
                              </span>
                              <span
                                data-testid="order-id"
                                data-value={order.display_id}
                              >
                                #{order.display_id}
                              </span>
                              <span data-testid="order-amount">
                                {convertToLocale({
                                  amount: order.total,
                                  currency_code: order.currency_code,
                                })}
                              </span>
                            </div>
                            <button
                              className="flex items-center justify-between"
                              data-testid="open-order-button"
                            >
                              <span className="sr-only">
                                Voir la commande #{order.display_id}
                              </span>
                              <ChevronDown className="-rotate-90" />
                            </button>
                          </Container>
                        </LocalizedClientLink>
                      </li>
                    );
                  })
                ) : (
                  <>
                    <Body
                      data-testid="no-orders-message"
                      desktopSize="xl"
                      font="sans"
                    >
                      Vous n&apos;avez pas encore passé de commande.
                    </Body>
                    <Link href="/products" size="md" variant="outline">
                      Continuer à magasiner
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0;

  if (!customer) {
    return 0;
  }

  if (customer.email) {
    count++;
  }

  if (customer.first_name && customer.last_name) {
    count++;
  }

  if (customer.phone) {
    count++;
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing,
  );

  if (billingAddress) {
    count++;
  }

  return (count / 4) * 100;
};

export default Overview;
