"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import config from "@/config";

import { useCountryCode } from "../context/country-code-context";

export default function LocalizedLink({
  href,
  ...passThroughProps
}: ComponentProps<typeof Link>) {
  const countryCode = useCountryCode();

  const isDefault = countryCode === config.defaultCountryCode;

  const normalizedPath = href.toString();
  const isExternalLink = normalizedPath.startsWith("https://");
  const isDeepLink = normalizedPath.startsWith("#");
  const localizedHref =
    isExternalLink || isDeepLink || isDefault
      ? href
      : `/${countryCode}${normalizedPath.startsWith("/") ? "" : "/"}${href}`;

  return <Link href={localizedHref} {...passThroughProps} />;
}
