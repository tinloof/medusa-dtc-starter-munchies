"use client";
import type {ComponentProps} from "react";

import config from "@/config";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function LocalizedLink({
  href,
  ...props
}: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const countryCode = pathname.split("/")[1] || "";

  const localizedHref = href.toString().startsWith("/")
    ? `${config.baseUrl}/${countryCode}${href}`
    : `${config.baseUrl}/${countryCode}/${href}`;

  return <Link href={localizedHref} {...props} />;
}
