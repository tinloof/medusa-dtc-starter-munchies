"use client";

import type {HttpTypes} from "@medusajs/types";

import LocalizedClientLink from "@/components/shared/localized-link";
import Body from "@/components/shared/typography/body";
import {signout} from "@/lib/data/customer";
import {ArrowRightOnRectangle, ChevronDown} from "@medusajs/icons";
import {clx} from "@medusajs/ui";
import {MapPin, Package, UserRound} from "lucide-react";
import {useParams, usePathname} from "next/navigation";

export const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null;
}) => {
  const route = usePathname();
  const {countryCode} = useParams() as {countryCode: string};

  const handleLogout = async () => {
    await signout(countryCode);
  };

  return (
    <div>
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            className="text-small-regular flex items-center gap-x-2 py-2"
            data-testid="account-main-link"
            href="/account"
          >
            <>
              <ChevronDown className="rotate-90 transform" />
              <span>Mon compte</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="text-xl-semi mb-4 px-8">
              Bonjour {customer?.first_name}
            </div>
            <div className="text-base-regular">
              <ul>
                <li>
                  <LocalizedClientLink
                    className="flex items-center justify-between border-b border-accent-40 px-8 py-4"
                    data-testid="profile-link"
                    href="/account/profile"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <UserRound size={20} />
                        <span>Profil</span>
                      </div>
                      <ChevronDown className="-rotate-90 transform" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="flex items-center justify-between border-b border-accent-40 px-8 py-4"
                    data-testid="addresses-link"
                    href="/account/addresses"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <MapPin size={20} />
                        <span>Adresses</span>
                      </div>
                      <ChevronDown className="-rotate-90 transform" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="flex items-center justify-between border-b border-accent-40 px-8 py-4"
                    data-testid="orders-link"
                    href="/account/orders"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package size={20} />
                      <span>Commandes</span>
                    </div>
                    <ChevronDown className="-rotate-90 transform" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    className="flex w-full items-center justify-between border-b border-accent-40 px-8 py-4"
                    data-testid="logout-button"
                    onClick={handleLogout}
                    type="button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>Se déconnecter</span>
                    </div>
                    <ChevronDown className="-rotate-90 transform" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden small:block" data-testid="account-nav">
        <div>
          <div className="pb-4">
            <Body className="text-base-semi" desktopSize="2xl" font="sans">
              Mon compte
            </Body>
          </div>
          <div className="text-base-regular">
            <ul className="mb-0 flex flex-col items-start justify-start gap-y-4">
              <li>
                <AccountNavLink
                  data-testid="overview-link"
                  href="/account"
                  route={route!}
                >
                  Aperçu
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  data-testid="profile-link"
                  href="/account/profile"
                  route={route!}
                >
                  Profil
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  data-testid="addresses-link"
                  href="/account/addresses"
                  route={route!}
                >
                  Adresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  data-testid="orders-link"
                  href="/account/orders"
                  route={route!}
                >
                  Commandes
                </AccountNavLink>
              </li>
              <li className="text-grey-700">
                <button
                  data-testid="logout-button"
                  onClick={handleLogout}
                  type="button"
                >
                  Se déconnecter
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

type AccountNavLinkProps = {
  children: React.ReactNode;
  "data-testid"?: string;
  href: string;
  route: string;
};

const AccountNavLink = ({
  children,
  "data-testid": dataTestId,
  href,
  route,
}: AccountNavLinkProps) => {
  const {countryCode}: {countryCode: string} = useParams();

  const active = route.split(countryCode)[1] === href;
  return (
    <LocalizedClientLink
      className={clx("text-ui-fg-subtle hover:text-ui-fg-base", {
        "text-ui-fg-base font-semibold": active,
      })}
      data-testid={dataTestId}
      href={href}
    >
      {children}
    </LocalizedClientLink>
  );
};
