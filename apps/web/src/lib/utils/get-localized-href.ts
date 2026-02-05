interface Options {
  href: string;
  countryCode: string;
  defaultCountryCode: string;
}

export function getLocalizedHref({
  href,
  countryCode,
  defaultCountryCode,
}: Options): string {
  const isDefault = countryCode === defaultCountryCode;
  const isExternalLink = href.startsWith("https://");
  const isDeepLink = href.startsWith("#");

  if (isExternalLink || isDeepLink || isDefault) {
    return href;
  }

  const prefix = href.startsWith("/") ? "" : "/";
  return `/${countryCode}${prefix}${href}`;
}
