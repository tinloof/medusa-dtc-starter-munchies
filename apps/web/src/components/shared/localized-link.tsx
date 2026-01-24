import type { ComponentProps } from "react";
import { getLocalizedHref } from "@/lib/utils/get-localized-href";
import { useCountryCodeContext } from "@/stores/country";

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
