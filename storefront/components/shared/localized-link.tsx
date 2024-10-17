"use client";
import type {ComponentProps} from "react";

import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";

export default function LocalizedLink({
  href,
  ...props
}: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const countryCode = pathname.split("/")[1];

  return <Link href={`/${countryCode}/${href}`} {...props} />;
}
