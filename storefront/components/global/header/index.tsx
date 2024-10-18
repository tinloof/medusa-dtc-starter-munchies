import type {Header} from "@/types/sanity.generated";

import Icon from "@/components/shared/icon";
import LocalizedLink from "@/components/shared/localized-link";
import {Suspense} from "react";

import Cart from "./cart";
import {CountrySelector} from "./country-selector";
import AnnouncementBar from "./parts/announcement-bar";
import BottomBorder from "./parts/bottom-border";
import HamburgerContainer from "./parts/hamburger/container";
import Navigation from "./parts/navigation";

export default function Header(props: {countryCode: string} & Header) {
  return (
    <header className="sticky top-0 z-50 flex w-full flex-col items-center bg-background">
      <AnnouncementBar {...props} />
      <div className="mx-auto flex w-full max-w-max-screen items-center justify-between gap-2xl px-m py-xs lg:px-xl">
        <div className="flex items-center gap-m">
          <div className="flex items-center justify-start gap-s">
            <HamburgerContainer sanityData={props} />
            <LocalizedLink href="/" prefetch>
              <img
                alt="Mubchies logo"
                className="my-[9px] h-[22px] w-fit lg:my-[10px] lg:h-9"
                src="/images/logo.svg"
              />
            </LocalizedLink>
          </div>
          <Suspense>
            <Navigation data={props} />
          </Suspense>
        </div>
        <div className="flex items-center gap-s">
          <span className="hidden lg:block">
            <CountrySelector />
          </span>
          <Suspense
            fallback={
              <div className="relative h-10 w-10 p-2">
                <Icon name="Cart" />
              </div>
            }
          >
            <Cart
              cartAddons={props.cartAddons}
              countryCode={props.countryCode}
            />
          </Suspense>
        </div>
      </div>
      <div className="relative z-30 w-screen" id="navigation-portal" />

      <BottomBorder className="lg:hidden" />
    </header>
  );
}
