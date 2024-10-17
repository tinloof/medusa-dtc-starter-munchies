"use client";
import type {ComponentProps} from "react";

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function LocalizedLink({
  href,
  ...props
}: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const countryCode =
    segments.length > 0 && segments[0].length === 2 ? segments[0] : "";

  const localizedHref = href.toString().startsWith("/")
    ? `/${countryCode}${href}`
    : countryCode
      ? `/${countryCode}/${href}`
      : `/${href}`;

  return <Link href={localizedHref} {...props} />;
}
