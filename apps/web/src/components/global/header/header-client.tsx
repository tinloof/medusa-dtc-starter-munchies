import type { Header as HeaderType } from "sanity.types";
import { LocalizedLink } from "@/components/shared//localized-link";
import { Hamburger } from "./parts/hamburger";
import { Navigation } from "./parts/navigation";

interface HeaderClientProps {
  header: HeaderType;
  cartNode?: React.ReactNode;
  countrySelectorNode?: React.ReactNode;
}

export function HeaderClient({
  header,
  cartNode,
  countrySelectorNode,
}: HeaderClientProps) {
  return (
    <div className="mx-auto flex w-full max-w-max-screen items-center justify-between gap-2xl px-m py-xs lg:px-xl">
      <div className="flex items-center gap-m">
        <div className="flex items-center justify-start gap-s">
          <Hamburger data={header} />
          <LocalizedLink href="/">
            <img
              alt="Mubchies logo"
              className="my-2.25 h-5.5 w-auto lg:my-2.5 lg:h-9"
              height={36}
              loading="eager"
              src="/images/logo.svg"
              width={375}
            />
          </LocalizedLink>
        </div>
        <Navigation data={header} />
      </div>
      <div className="flex items-center gap-s">
        <span className="hidden lg:block" id="country-selector">
          {countrySelectorNode}
        </span>
        {cartNode}
      </div>
    </div>
  );
}
