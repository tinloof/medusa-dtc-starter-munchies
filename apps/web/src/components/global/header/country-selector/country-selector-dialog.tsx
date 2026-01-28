import { Dialog, Title } from "@radix-ui/react-dialog";
import { cx } from "class-variance-authority";
import { useState } from "react";
import {
  CloseDialog,
  OpenDialog,
  SideDialog,
} from "@/components/shared/side-dialog";
import { Body } from "@/components/shared/typography/body";
import { Heading } from "@/components/shared/typography/heading";
import { Icon } from "@/generated/Icon";
import { CLOSE } from "@/generated/icons";
import type { Country } from "@/lib/medusa/regions";
import { useCountryCodeContext } from "@/stores/country";

interface DialogRootProps {
  className?: string;
  countries: Country[];
}

export function CountrySelectorDialog({
  className,
  countries,
}: DialogRootProps) {
  const [open, setOpen] = useState(false);

  const { countryCode, defaultCountryCode, pathname } = useCountryCodeContext();

  const getNewPath = (newCountryCode: string) => {
    const pathParts = pathname.split("/");

    const isDefault = newCountryCode === defaultCountryCode;
    const currentIsDefault = countryCode === defaultCountryCode;

    if (isDefault && !currentIsDefault) {
      pathParts.splice(1, 1);
    } else if (!isDefault && currentIsDefault) {
      pathParts.splice(1, 0, newCountryCode);
    } else if (!isDefault) {
      pathParts[1] = newCountryCode;
    }

    const path = pathParts.join("/");

    return path.startsWith("/") ? path : `/${path}`;
  };

  const selectedCountry =
    countries.find((country) => country?.code === countryCode) || countries[0];

  return (
    <Dialog onOpenChange={(v) => setOpen(v)} open={open}>
      <OpenDialog className={className}>
        <Body
          className={cx(
            "overflow-hidden whitespace-nowrap rounded-lg border-[1.5px] border-accent p-2 lg:border-none",
            className
          )}
          font="sans"
          mobileSize="lg"
        >
          {selectedCountry.code?.toUpperCase()} [
          {selectedCountry.currency.symbol}]
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
              <Icon className="size-9" href={CLOSE} />
            </CloseDialog>
            <div className="flex flex-1 flex-col items-stretch overflow-y-auto">
              {countries.map((country) => (
                <a
                  className="whitespace-nowrap rounded px-s py-xs hover:bg-secondary"
                  href={getNewPath(country?.code)}
                  key={country.code}
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
