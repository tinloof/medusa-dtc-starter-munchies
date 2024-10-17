"use client";

import Icon from "@/components/shared/icon";
import {
  CloseDialog,
  OpenDialog,
  SideDialog,
} from "@/components/shared/side-dialog";
import Heading from "@/components/shared/typography/heading";
import {Dialog, Title} from "@radix-ui/react-dialog";
import {cx} from "cva";
import Link from "next/link";
import {useParams, usePathname} from "next/navigation";
import {Suspense, useState} from "react";

export type Country = {
  code: string;
  currency: {
    code: string;
    symbol: string;
  };
  name: string;
};

type DialogRootProps = {
  className?: string;
  countries: Country[];
};

export default function CountrySelectorDialog({
  className,
  countries,
}: DialogRootProps) {
  const [open, setOpen] = useState(false);
  const {countryCode = countries[0]?.code} = useParams<{
    countryCode?: string;
  }>();
  const pathname = usePathname();

  const getNewPath = (newCountryCode: string) => {
    const pathParts = pathname.split("/");
    pathParts[1] = newCountryCode;
    return pathParts.join("/");
  };

  const selectedCountry =
    countries.find((country) => country.code === countryCode) || countries[0];

  return (
    <Dialog onOpenChange={(v) => setOpen(v)} open={open}>
      <OpenDialog className={className}>
        <div className={cx("p-2 text-lg", className)}>
          {selectedCountry.code.toUpperCase()} [
          {selectedCountry.currency.symbol}]
        </div>
      </OpenDialog>
      <SideDialog>
        <div className="relative flex h-full w-full flex-col border-l border-accent bg-background">
          <div className="flex h-full w-full flex-col bg-background p-4">
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
              className="absolute right-[10px] top-[10px]"
            >
              <Icon className="h-9 w-9" name="Close" />
            </CloseDialog>
            <div className="flex flex-1 flex-col items-stretch overflow-y-scroll">
              {countries.map((country) => (
                <Suspense key={country.code}>
                  <Link
                    className="px-s py-xs"
                    href={getNewPath(country.code)}
                    onClick={() => setOpen(false)}
                  >
                    {country.name} [{country.currency.symbol}]
                  </Link>
                </Suspense>
              ))}
            </div>
          </div>
        </div>
      </SideDialog>
    </Dialog>
  );
}
