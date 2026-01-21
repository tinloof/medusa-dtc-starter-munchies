"use client";

import type { Header } from "@packages/sanity/types";
import { CountryCodeProvider } from "@/components/context/CountryCodeContext";
import AnnouncementBar from "./AnnouncementBar";
import HamburgerMenu from "./HamburgerMenu";
import Navigation from "./Navigation";
import CountrySelectorDialog, { type Country } from "./CountrySelectorDialog";

interface HeaderClientProps {
  header: Header;
  countries: Country[];
  countryCode: string;
  defaultCountryCode: string;
}

export default function HeaderClient({
  header,
  countries,
  countryCode,
  defaultCountryCode,
}: HeaderClientProps) {
  return (
    <CountryCodeProvider countryCode={countryCode} defaultCountryCode={defaultCountryCode}>
      {/* Announcement Bar */}
      <AnnouncementBar
        showAnnouncement={header.showAnnouncement}
        announcementText={header.announcementText}
      />

      <div className="mx-auto flex w-full max-w-max-screen items-center justify-between gap-2xl px-m py-xs lg:px-xl">
        <div className="flex items-center gap-m">
          <div className="flex items-center justify-start gap-s">
            {/* Mobile Hamburger Menu */}
            <HamburgerMenu
              navigation={header.navigation}
              countries={countries}
            />

            <a href={countryCode === defaultCountryCode ? "/" : `/${countryCode}`}>
              <img
                alt="Munchies logo"
                className="my-2.25 h-5.5 w-fit lg:my-2.5 lg:h-9"
                height={36}
                src="/images/logo.svg"
                width={375}
              />
            </a>
          </div>

          {/* Desktop Navigation with Mega Menu */}
          <Navigation data={header} />
        </div>

        <div className="flex items-center gap-s">
          {/* Country Selector - Desktop only */}
          {countries.length > 0 && (
            <div className="hidden lg:block">
              <CountrySelectorDialog countries={countries} />
            </div>
          )}

          {/* Cart icon placeholder - no functionality for Phase 1 */}
          <div className="relative h-10 w-10 p-2">
            <img src="/icons/cart.svg" alt="Shopping Cart" className="h-6 w-6" />
          </div>
        </div>
      </div>
    </CountryCodeProvider>
  );
}
