"use client";

import Link from "next/link";
import {useParams} from "next/navigation";
import React from "react";

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  [x: string]: any;
  children?: React.ReactNode;
  className?: string;
  href: string;
  onClick?: () => void;
  passHref?: true;
}) => {
  const {countryCode} = useParams();

  return (
    <Link href={`/${countryCode}${href}`} {...props}>
      {children}
    </Link>
  );
};

export default LocalizedClientLink;
