import type {Header} from "@/types/sanity.generated";

import Icon from "@/components/shared/icon";
import Link from "next/link";
import {Suspense} from "react";

import Cart from "./cart";
import Hamburger from "./hamburger";
import AnnouncementBar from "./parts/announcement-bar";
import Navigation from "./parts/navigation";

export default function Header(props: Header) {
  return (
    <header className="sticky top-0 z-50 flex w-full flex-col items-center border-b border-accent bg-background">
      <AnnouncementBar {...props} />
      <div className="relative mx-auto flex w-full max-w-max-screen items-center justify-between gap-2xl px-m py-xs lg:px-xl">
        <div className="flex items-center gap-m">
          <div className="flex items-center justify-start gap-s">
            <Hamburger data={props} />
            <Link href="/" prefetch>
              <img
                alt="Mubchies logo"
                className="my-[9px] h-[22px] w-fit lg:my-[10px] lg:h-9"
                src="/images/logo.svg"
              />
            </Link>
          </div>
          <Suspense>
            <Navigation data={props} />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <div className="relative h-10 w-10 p-2">
              <Icon name="Cart" />
            </div>
          }
        >
          <Cart cartAddons={props.cartAddons} />
        </Suspense>
        <div
          className="absolute left-1/2 top-[56px] z-30 mx-auto w-screen max-w-max-screen -translate-x-1/2"
          id="navigation-portal"
        />
      </div>
    </header>
  );
}
