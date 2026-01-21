"use client";

import { Title } from "@radix-ui/react-dialog";
import { cx } from "class-variance-authority";
import { useState } from "react";

import {
  CloseDialog,
  Dialog,
  OpenDialog,
  SideDialog,
} from "@/components/shared/SideDialog";
import Body from "@/components/shared/typography/Body";
import Heading from "@/components/shared/typography/Heading";
import { useCountryCode, useDefaultCountryCode } from "@/components/context/CountryCodeContext";

// Supported country codes for path detection
const SUPPORTED_COUNTRY_CODES = [
  "us", "dk", "fr", "de", "es", "jp", "gb", "ca",
  "ar", "za", "mx", "my", "au", "nz", "dz", "br"
];

export type Country = {
  code: string;
  currency: {
    code: string;
    symbol: string;
  };
  name: string;
};

interface CountrySelectorDialogProps {
  className?: string;
  countries: Country[];
}

export default function CountrySelectorDialog({
  className,
  countries,
}: CountrySelectorDialogProps) {
  const [open, setOpen] = useState(false);
  const countryCode = useCountryCode();
  const defaultCountryCode = useDefaultCountryCode();

  const getNewPath = (newCountryCode: string) => {
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "/";
    const pathParts = pathname.split("/").filter(Boolean);

    const isDefault = newCountryCode === defaultCountryCode;
    const currentIsDefault = countryCode === defaultCountryCode;

    // Check if first part is a supported country code
    const firstPartIsCountry =
      pathParts[0] && SUPPORTED_COUNTRY_CODES.includes(pathParts[0].toLowerCase());

    if (isDefault && firstPartIsCountry) {
      // Remove country code from path (switching to default)
      pathParts.shift();
    } else if (!isDefault && currentIsDefault && !firstPartIsCountry) {
      // Add country code to path (switching from default to non-default)
      pathParts.unshift(newCountryCode);
    } else if (!isDefault && firstPartIsCountry) {
      // Replace country code
      pathParts[0] = newCountryCode;
    } else if (!isDefault && !firstPartIsCountry) {
      // Add country code (no existing country code in path)
      pathParts.unshift(newCountryCode);
    }

    const path = "/" + pathParts.join("/");
    return path;
  };

  const selectedCountry =
    countries.find((country) => country?.code === countryCode) ||
    countries[0];

  if (!selectedCountry) {
    return null;
  }

  return (
    <Dialog onOpenChange={(v) => setOpen(v)} open={open}>
      <OpenDialog className={className}>
        <Body
          className={cx(
            "overflow-hidden whitespace-nowrap rounded-lg border-[1.5px] border-accent p-2 lg:border-none cursor-pointer",
            className
          )}
          font="sans"
          mobileSize="lg"
        >
          {selectedCountry.code?.toUpperCase()} [{selectedCountry.currency.symbol}]
        </Body>
      </OpenDialog>
      <SideDialog>
        <div className="relative flex h-full w-full flex-col border-accent border-l bg-background">
          <div className="flex h-full w-full flex-col bg-background p-s pr-xs">
            <Title asChild>
              <Heading
                className="py-4"
                desktopSize="lg"
                font="serif"
                mobileSize="base"
                tag="h2"
              >
                Select your country
              </Heading>
            </Title>
            <CloseDialog
              aria-label="Close"
              className="absolute top-2.5 right-2.5"
            >
              <CloseIcon />
            </CloseDialog>
            <div className="flex flex-1 flex-col items-stretch overflow-y-auto">
              {countries.map((country) => (
                <a
                  className="whitespace-nowrap rounded px-s py-xs hover:bg-secondary"
                  href={getNewPath(country?.code)}
                  key={country?.code}
                  onClick={() => setOpen(false)}
                >
                  {country.name} [{country.currency.symbol}]
                </a>
              ))}
            </div>
          </div>
        </div>
      </SideDialog>
    </Dialog>
  );
}

function CloseIcon() {
  return (
    <svg
      className="h-9 w-9"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 10L26 26M10 26L26 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
