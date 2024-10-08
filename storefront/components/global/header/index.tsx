import type {Header} from "@/types/sanity.generated";

import {Suspense} from "react";

import Cart from "./cart";
import AnnouncementBar from "./parts/announcement-bar";
import Navigation from "./parts/navigation";

export default async function Header(props: Header) {
  return (
    <header className="sticky top-0 z-50 flex w-full flex-col items-center bg-background">
      <AnnouncementBar {...props} />
      <div className="relative mx-auto flex w-full max-w-max-screen items-center justify-between gap-2xl px-m py-xs lg:px-xl">
        <div className="flex items-center gap-m">
          <img
            alt="Mubchies logo"
            className="my-[9px] h-[22px] w-fit lg:my-[10px] lg:h-9"
            src="/images/logo.svg"
          />
          <Suspense>
            <Navigation data={props} />
          </Suspense>
        </div>
        <div>
          <Cart />
        </div>
      </div>
    </header>
  );
}
