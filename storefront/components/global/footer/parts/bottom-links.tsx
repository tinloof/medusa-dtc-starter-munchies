import type {Footer} from "@/types/sanity.generated";

import Link from "next/link";
import React from "react";

export default function BottomLinks({
  bottomLinks,
  socialLinks,
}: NonNullable<Footer>) {
  const currentYear = new Date().getFullYear();
  return (
    <div className="climate-label-xs flex flex-col justify-between gap-lg lg:flex-row lg:items-center">
      <div className="flex flex-col gap-2xl lg:flex-row">
        <p>© {currentYear}</p>
        <div className="flex gap-2xl">
          {bottomLinks?.map((link) => {
            if (!link.link) return null;
            return (
              <Link
                className="whitespace-nowrap"
                href={link.link}
                key={link._key}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2xl">
        {socialLinks?.map((link) => {
          if (!link.link) return null;
          return (
            <Link href={link.link} key={link._key}>
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
