"use client";

import type { AnchorHTMLAttributes } from "react";
import { useCountryCode, useIsDefaultCountry } from "@/components/context/CountryCodeContext";

interface LocalizedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function LocalizedLink({
  href,
  children,
  ...props
}: LocalizedLinkProps) {
  const countryCode = useCountryCode();
  const isDefault = useIsDefaultCountry();

  const normalizedPath = href.toString();
  const isExternalLink = normalizedPath.startsWith("https://") || normalizedPath.startsWith("http://");
  const isDeepLink = normalizedPath.startsWith("#");

  const localizedHref =
    isExternalLink || isDeepLink || isDefault
      ? href
      : `/${countryCode}${normalizedPath.startsWith("/") ? "" : "/"}${href}`;

  return (
    <a
      href={localizedHref}
      {...(isExternalLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
