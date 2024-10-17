"use client";

import Icon from "@/components/shared/icon";
import Heading from "@/components/shared/typography/heading";
import {
  Close,
  Content,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import Link from "next/link";
import {useParams} from "next/navigation";
import {useState} from "react";

export type Country = {
  code: string;
  currency: {
    code: string;
    symbol: string;
  };
  name: string;
};

type DialogRootProps = {
  countries: Country[];
};

export default function CountrySelectorDialog({countries}: DialogRootProps) {
  const [open, setOpen] = useState(false);
  const {countryCode = countries[0]?.code} = useParams<{
    countryCode?: string;
  }>();

  const selectedCountry =
    countries.find((country) => country.code === countryCode) || countries[0];

  return (
    <Root onOpenChange={(v) => setOpen(v)} open={open}>
      <Trigger>
        <div className="p-2 text-lg">
          {selectedCountry.code.toUpperCase()} [
          {selectedCountry.currency.symbol}]
        </div>
      </Trigger>
      <Portal>
        <Overlay className="fixed inset-0 bg-transparent" />
        <Content className="data-[state=open]:animate-enterFromRigh fixed right-0 top-0 z-[9999] h-full w-[430px] transition-transform ease-in-out data-[state=closed]:animate-exitToRight">
          <div className="relative flex h-full w-full flex-col border-l border-accent bg-background">
            <div className="flex min-h-[calc(var(--header-height))] items-center justify-start px-4">
              <Title asChild>
                <Heading
                  desktopSize="2xl"
                  font="serif"
                  mobileSize="lg"
                  tag="h2"
                >
                  Select your country
                </Heading>
              </Title>
            </div>
            <Close
              aria-label="Close"
              className="absolute right-[10px] top-[10px]"
            >
              <Icon className="h-9 w-9" name="Close" />
            </Close>
            <div className="flex flex-1 flex-col items-stretch overflow-y-scroll px-4">
              {countries.map((country) => (
                <Link
                  className="px-4 py-[10px]"
                  href={`/${country.code}`}
                  key={country.code}
                >
                  {country.name} [{country.currency.symbol}]
                </Link>
              ))}
            </div>
          </div>
        </Content>
      </Portal>
    </Root>
  );
}
