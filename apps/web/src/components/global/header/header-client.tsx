import type { Header as HeaderType } from "@packages/sanity/types";
import { CountryCodeProvider } from "@/components/context/country-code-context";
import { LocalizedLink } from "@/components/shared//localized-link";
import { Icon } from "@/components/shared/icon";
import type { Country } from "@/lib/medusa/regions";
import { CountrySelectorDialog } from "./country-selector/country-selector-dialog";
import Hamburger from "./parts/hamburger";
import { Navigation } from "./parts/navigation";

interface HeaderClientProps {
  countryCode: string;
  defaultCountryCode: string;
  header: HeaderType;
  countries: Country[];
  pathname: string;
}

export function HeaderClient({
  countryCode,
  defaultCountryCode,
  header,
  countries,
  pathname,
}: HeaderClientProps) {
  return (
    <CountryCodeProvider
      countryCode={countryCode}
      defaultCountryCode={defaultCountryCode}
      pathname={pathname}
    >
      <div className="mx-auto flex w-full max-w-max-screen items-center justify-between gap-2xl px-m py-xs lg:px-xl">
        <div className="flex items-center gap-m">
          <div className="flex items-center justify-start gap-s">
            <Hamburger countries={countries} data={header} />
            <LocalizedLink href="/">
              <img
                alt="Mubchies logo"
                className="my-2.25 h-5.5 w-fit lg:my-2.5 lg:h-9"
                height={36}
                src="/images/logo.svg"
                width={375}
              />
            </LocalizedLink>
          </div>
          <Navigation data={header} />
        </div>
        <div className="flex items-center gap-s">
          <span className="hidden lg:block">
            <CountrySelectorDialog countries={countries} />
          </span>
          <div className="relative size-10 p-2">
            <Icon loading="eager" name="Cart" />
          </div>
        </div>
      </div>
    </CountryCodeProvider>
  );
}
