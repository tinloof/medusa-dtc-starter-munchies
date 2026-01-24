import type { ComponentProps } from "react";
import { useCountryCodeContext } from "@/components/context/country-code-context";
import { getLocalizedHref } from "@/lib/get-localized-href";

export function LocalizedLink({
  href = "",
  ...passThroughProps
}: ComponentProps<"a">) {
  const { countryCode, defaultCountryCode } = useCountryCodeContext();

  const localizedHref = getLocalizedHref({
    href: href.toString(),
    countryCode,
    defaultCountryCode,
  });

  return <a href={localizedHref} {...passThroughProps} />;
}
